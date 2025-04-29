<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Services\Task\TaskService;
use ErrorException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function __construct(private TaskService $taskService) {}
    public function index()
    {
        try {
            return response()->json([
                ...$this->taskService->all()
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
                'error' => "Lỗi nội nội bộ máy chủ"
            ], 500);
        }
    }
    public function show(int $id)
    {
        try {
            return response()->json([
                'data' => $this->taskService->find($id)
            ]);
        } catch (\Throwable $th) {
            Log::error(
                message: __CLASS__ . '@' . __FUNCTION__,
                context: [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            );
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => 'Không tìm thấy dự án'
                ], 404);
            }
           
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function create(CreateTaskRequest $request)
    {
        try {
            return response()->json([
                'data' => $this->taskService->create($request->validated())
            ]);
        } catch (\Throwable $th) {
            Log::error(
                message: __CLASS__ . '@' . __FUNCTION__,
                context: [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            );
            if ($th instanceof ErrorException) {
                return response()->json([
                    'error' => $th->getMessage()
                ], 500);
            }
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function update(int $id,UpdateTaskRequest $request)
    {
        try {
            return response()->json([
                'data' => $this->taskService->update($id,$request->validated())
            ]);
        } catch (\Throwable $th) {
            Log::error(
                message: __CLASS__ . '@' . __FUNCTION__,
                context: [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            );
            if ($th instanceof ErrorException) {
                return response()->json([
                    'error' => $th->getMessage()
                ], 500);
            }
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function destroy(int|string $id)
    {
        try {
            $this->taskService->delete($id);
            return response()->json([], 203);
        } catch (\Throwable $th) {
            Log::error(
                message: __CLASS__ . '@' . __FUNCTION__,
                context: [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            );
            if ($th instanceof ErrorException) {
                return response()->json([
                    'error' => $th->getMessage()
                ], 500);
            }
            return response()->json([
                'error' => "Lỗi nội nội bộ máy chủ"
            ], 500);
        }
    }
}
