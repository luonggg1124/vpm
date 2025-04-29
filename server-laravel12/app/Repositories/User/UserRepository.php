<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

interface UserRepository extends BaseRepository
{
    public function findByEmail(string $email):User|null;
    public function personnel(
        $name = "",
        $email = "",
        $projectName = ""
    ):Builder;
}
