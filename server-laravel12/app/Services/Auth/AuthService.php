<?php

namespace App\Services\Auth;

use App\Http\Resources\UserResource;



interface AuthService 
{
    public function register();
    public function login(array $data):array;
    public function logout():void;
    public function me():UserResource;
}
