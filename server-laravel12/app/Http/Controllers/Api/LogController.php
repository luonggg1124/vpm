<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Log\LogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogController extends Controller
{
    public function __construct(private LogService $logService){}

    public function index()
    {
        try {
            return response()->json([
                ...$this->logService->all()
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
}
