<?php

namespace App\Services\Auth;

use App\Http\Resources\UserResource;
use App\Repositories\User\UserRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;

class AuthServiceImplement  implements AuthService
{
    public function __construct(protected UserRepository $userRepository) {}
    public function register(){

    }
    public function login(array $data) :array{
        $user = $this->userRepository->findByEmail($data['email']);
        if(!$user) throw new ModelNotFoundException('Tài khoản không tồn tại');
        if(!Hash::check($data['password'],$user->password)) throw new UnauthorizedException('Mật khẩu không đúng');
        $accessToken = auth()->login($user);
        return [
            'token' =>$accessToken,
            'user' => new UserResource($user)
        ];
    }
    public function logout():void{
        auth()->logout();
    }
    public function me():UserResource{
        $user = $this->userRepository->find(request()->user()->id);
        return new UserResource( $user->with(['title','position','department']));
    }
    
}
