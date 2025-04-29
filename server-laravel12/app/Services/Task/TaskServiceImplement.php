<?php

namespace App\Services\Task;

use App\Http\Resources\TaskResource;
use App\Repositories\Task\TaskRepository;
use App\Traits\CanLoadRelationships;
use App\Traits\Pagination;
use ErrorException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskServiceImplement  implements TaskService
{
    use Pagination, CanLoadRelationships;
    protected array $relations = ['designated_personnel', 'designating_personnel','project'];
    public function __construct(protected TaskRepository $taskRepository) {}

    public function all(): array
    {
        $name = request()->query('name');
        $uuid = request()->query('uuid');
        $status = request()->query('status');
        $designated_personnel = request()->query('designated_personnel');
        $designating_personnel = request()->query('designating_personnel');
        $paginate = request()->query('paginate');
        $perPage = request()->query('per_page');
        if ($paginate) {
            $task = $this->loadRelationships($this->taskRepository->filter($name, $uuid, $status, $designated_personnel, $designating_personnel))->orderByDesc('tasks.updated_at')->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($task),
                'data' => TaskResource::collection($task->items())
            ];
        } else {
            $task = $this->loadRelationships($this->taskRepository->filter($name, $uuid, $status, $designated_personnel, $designating_personnel))->orderByDesc('tasks.updated_at')->get();
            return [
                'data' => TaskResource::collection($task)
            ];
        }
    }
    public function create(array $data)
    {

        $data['designating_personnel_id'] = auth()->user()->id;
        $data['status_changed_at'] = now();
        $task = $this->taskRepository->create($data);
        if (!$task) throw new ErrorException('Không thể tạo task');
        return new TaskResource($this->loadRelationships($task));
    }
    public function find(int $id): TaskResource
    {
        $task = $this->taskRepository->find($id);
        if (!$task) throw new ModelNotFoundException('Không tìm thấy dự án');
        return new TaskResource($this->loadRelationships($task));
    }
    public function update(int $id, array $data): TaskResource  
    {
        $task = $this->taskRepository->update($id, $data);
        if (!$task) throw new ModelNotFoundException('Không tìm thấy dự án');
        return new TaskResource($this->loadRelationships($task));
    }
    public function delete(int|string $id): void
    {
        $delete = $this->taskRepository->delete($id);
        if (!$delete) {
            throw new ErrorException('Không thể xóa nhiệm vụ');
        }
    }
}
