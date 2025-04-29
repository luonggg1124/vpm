<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\User\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    public function __construct(private UserService $userService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        try {
            return response()->json([
                ...$this->userService->all(array_map('intval', explode(',', $request->query('target', 1))))
            ]);
        } catch (\Throwable $th) {
            Log::error(
                message: __CLASS__ . '@' . __FUNCTION__,
                context: [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            );
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function personnel()
    {

        try {
            return response()->json([
                ...$this->userService->personnel()
            ]);
        } catch (\Throwable $th) {
            Log::error(
                message: __CLASS__ . '@' . __FUNCTION__,
                context: [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            );
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
