<?php

namespace App\Services\Task;

use App\Http\Resources\TaskResource;
use App\Repositories\Task\TaskRepository;
use App\Traits\CanLoadRelationships;
use App\Traits\Pagination;
use ErrorException;



class TaskServiceImplement  implements TaskService
{
    use Pagination, CanLoadRelationships;
    protected array $relations = ['designated_personnel'];
    public function __construct(protected TaskRepository $taskRepository) {}

    public function all():array
    {
        $name = request()->query('name');
        $uuid = request()->query('uuid');
        $status = request()->query('status');
        $paginate = request()->query('paginate');
        $perPage = request()->query('per_page');
        if ($paginate) {
            $task = $this->loadRelationships($this->taskRepository->filter($name, $uuid, $status))->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($task),
                'data' => TaskResource::collection($task->items())
            ];
        } else {
            $task = $this->loadRelationships($this->taskRepository->filter($name, $uuid, $status))->get();
            return [
                'data' => TaskResource::collection($task)
            ];
        }
    }
    public function delete(int|string $id): void
    {
        $delete = $this->taskRepository->delete($id);
        if (!$delete) {
            throw new ErrorException('Không thể xóa nhiệm vụ');
        }
    }
}
