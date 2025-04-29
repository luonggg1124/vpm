<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\AuthService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function register(RegisterRequest $request)
    {
        try {
            //code...
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            $login = $this->authService->login($data);
            return $this->respondWithToken($login['token'], $login['user']);
        } catch (\Throwable $th) {
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'errors' => [
                        'email' => 'Không tìm thấy email'
                    ]
                ], 404);
            }
            if ($th instanceof UnauthorizedException) {
                return response()->json([
                    'errors' => [
                        'password' => 'Sai mật khẩu'
                    ]

                ], 401);
            }
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function logout()
    {
        try {
            $this->authService->logout();
            return response()->json([
                'message' => 'Đăng xuất thành công'
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function refresh(Request $request)
    {
          try {
            $newToken = auth('api')->refresh();
            $user = auth('api')->user();
            return $this->respondWithToken($newToken, $user);
        } catch (\Throwable $th) {
            Log::error(
                message: __CLASS__ . '@' . __FUNCTION__,
                context: [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            );
            return response()->json([
                'error' => __('Lỗi nội bộ máy chủ')
            ], 500);
        }
    }
    protected function respondWithToken($token,  $user): Response|JsonResponse
    {
        return response()->json([

            'token' => $token,
            'expires_in' => auth()->factory()->getTTL(),
            'user' => $user,
            'token_type' => 'bearer',

        ], 201);
    }
}
