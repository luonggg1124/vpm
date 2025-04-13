<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepository;

interface UserRepository extends BaseRepository
{
    public function findByEmail(string $email):User|null;
}
