<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepositoryImplement;

class UserRepositoryImplement extends BaseRepositoryImplement implements UserRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
    public function findByEmail(string $email): User|null
    {
        return $this->model->where('email', $email)->first();
    }
}
