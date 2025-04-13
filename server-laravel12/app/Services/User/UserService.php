<?php

namespace App\Services\User;


interface UserService 
{
    public function all(int|string $targetId);

}
