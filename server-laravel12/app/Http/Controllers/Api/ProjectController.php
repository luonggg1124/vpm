<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\CreateProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Requests\Project\UpdateStatusRequest;
use App\Services\Project\ProjectService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class ProjectController extends Controller
{
    public function __construct(private ProjectService $projectService) {}

    public function initiation()
    {
        try {
            return response()->json([
                ...$this->projectService->initiation()
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
    public function projects()
    {
        try {
            return response()->json([
                ...$this->projectService->projects()
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
    public function approve()
    {
        try {
            return response()->json([
                ...$this->projectService->approve()
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
    public function projectQuantity()
    {
        try {
            return response()->json([
                ...$this->projectService->projectQuantity()
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
    public function tasks(int|string $id)
    {
        try {
            return response()->json([
                ...$this->projectService->tasks($id)
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
    public function docs(int|string $id)
    {
        try {
            return response()->json([
                ...$this->projectService->docs($id)
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
    public function sendForReview(int|string $id)
    {
        try {
            return response()->json([
                ...$this->projectService->sendForReview($id)
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
    public function create(CreateProjectRequest $request)
    {
        try {

            return response()->json([
                'data' => $this->projectService->create($request->validated())
            ]);
        } catch (\Throwable $th) {
            if ($th instanceof Exception) {
                return response()->json([
                    'error' => $th->getMessage()
                ], 500);
            }
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function update(int $id, UpdateProjectRequest $request)
    {
        try {
            return response()->json([
                'data' => $this->projectService->update($id, $request->validated())
            ]);
        } catch (\Throwable $th) {
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => 'Không tìm thấy dự án'
                ], 404);
            }
            if ($th instanceof Exception) {
                return response()->json([
                    'error' => $th->getMessage()
                ], 500);
            }
            return response()->json([
                'error' => 'Lỗi nội bộ máy chủ'
            ], 500);
        }
    }
    public function updateStatus(int $projectId, UpdateStatusRequest $request)
    {
        try {
            $record = $this->projectService->updateStatus($projectId, $request->validated());
            return response()->json([
                'data' => $record
            ]);
        } catch (\Throwable $th) {
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => 'Không tìm thấy dự án'
                ], 404);
            }
            if ($th instanceof BadRequestException) {
                return response()->json([
                    'error' => $th->getMessage()
                ], 400);
            }
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
    public function find(int $id)
    {
        try {
            return response()->json([
                'data' => $this->projectService->find($id)
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
    public function personnel(int $projectId)
    {
        try {
            return response()->json([
                ...$this->projectService->personnel($projectId)
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
    public function delete(Request $request)
    {

        if (!$request->projects || !is_array($request->projects)) {
            return response()->json([
                'error' => 'Không tìm thấy trường danh sách mã dự án'
            ], 404);
        }
        try {
            $this->projectService->delete($request->get('projects', []));
            return response()->json([
                'message' => 'Đã xóa dự án'
            ], 204);
        } catch (\Throwable $th) {
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => 'Không tìm thấy dự án'
                ], 404);
            }
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
    public function lock(int $id)
    {


        try {
            $project = $this->projectService->lock($id);
            return response()->json([
                'message' =>  $project->is_lock ? 'Đã khóa dự án' : 'Đã mở khóa dự án',
                'data' => $project
            ], 201);
        } catch (\Throwable $th) {
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => 'Không tìm thấy dự án'
                ], 404);
            }
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
