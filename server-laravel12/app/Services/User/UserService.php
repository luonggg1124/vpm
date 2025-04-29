<?php

namespace App\Services\User;


interface UserService 
{
    public function all(array $targetId);
    public function personnel();

}
