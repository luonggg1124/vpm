<?php

namespace App\Services\Project;

use App\Enum\ProjectLogAction;
use App\Enum\ProjectStatus;
use App\Enum\TaskStatus;
use App\Http\Resources\PersonnelResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Traits\Pagination;
use App\Traits\CanLoadRelationships;

use App\Repositories\Project\ProjectRepository;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;


class ProjectServiceImplement implements ProjectService
{
    use Pagination, CanLoadRelationships;
    protected array $relations = ['pm', 'pa', 'tasks', 'personnel'];
    public function __construct(protected ProjectRepository $projectRepository) {}
    public function initiation()
    {

        $name = request()->query('name');
        $uuid = request()->query('uuid');
        $status = request()->query('status');
        $start_date = request()->query('start_date');
        $end_date = request()->query('end_date');
        $paginate = request()->query('paginate');
        $perPage = request()->query('per_page');
        if ($paginate) {
            $projects = $this->loadRelationships($this->projectRepository->filter(
                start_date: $start_date,
                end_date: $end_date,
                name: $name,
                uuid: $uuid,
                status: $status
            )->whereNotIn('status', [
                ProjectStatus::FAILED->value,
                ProjectStatus::REFUSE->value,
                ProjectStatus::WAITING->value,
                ProjectStatus::DONE->value,
            ]))->orderByDesc('updated_at')->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($projects),
                'data' =>  ProjectResource::collection($projects->items())
            ];
        } else {
            $projects = $this->loadRelationships($this->projectRepository->filter(
                start_date: $start_date,
                end_date: $end_date,
                name: $name,
                uuid: $uuid,
                status: $status
            )->whereNotIn('status', [
                ProjectStatus::FAILED->value,
                ProjectStatus::REFUSE->value,
                ProjectStatus::WAITING->value,
                ProjectStatus::DONE->value,
            ]))->orderByDesc('updated_at')->get();
            return [
                'data' => ProjectResource::collection($projects)
            ];
        }
    }
    public function projects()
    {
        $perPage = request()->query('per_page');
        $name = request()->query('name');
        $uuid = request()->query('uuid');
        $status = request()->query('status');
        $start_date = request()->query('start_date');
        $end_date = request()->query('end_date');
        $paginate = request()->query('paginate');

        if ($paginate) {
            $projects = $this->loadRelationships($this->projectRepository->filter(
                start_date: $start_date,
                end_date: $end_date,
                name: $name,
                uuid: $uuid,
                status: $status
            )->whereIn('status', [
                ProjectStatus::FAILED->value,
                ProjectStatus::CLOSE->value,
                ProjectStatus::DONE->value,
            ]))->orderByDesc('updated_at')->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($projects),
                'data' =>  ProjectResource::collection($projects->items())
            ];
        } else {
            $projects = $this->loadRelationships($this->projectRepository->filter(
                start_date: $start_date,
                end_date: $end_date,
                name: $name,
                uuid: $uuid,
                status: $status
            )->whereIn('status', [
                ProjectStatus::FAILED->value,
                ProjectStatus::CLOSE->value,
                ProjectStatus::DONE->value,
            ]))->orderByDesc('updated_at')->get();
            return [
                'data' => ProjectResource::collection($projects)
            ];
        }
    }
    public function approve()
    {
        $perPage = request()->query('per_page');
        $name = request()->query('name');
        $uuid = request()->query('uuid');
        $status = request()->query('status');
        $start_date = request()->query('start_date');
        $end_date = request()->query('end_date');
        $paginate = request()->query('paginate');

        if ($paginate) {
            $projects = $this->loadRelationships($this->projectRepository->filter(
                start_date: $start_date,
                end_date: $end_date,
                name: $name,
                uuid: $uuid,
                status: $status
            )->whereIn('status', [
                ProjectStatus::REFUSE->value,
                ProjectStatus::WAITING->value,
            ]))->orderBy('updated_at','asc')->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($projects),
                'data' =>  ProjectResource::collection($projects->items())
            ];
        } else {
            $projects = $this->loadRelationships($this->projectRepository->filter(
                start_date: $start_date,
                end_date: $end_date,
                name: $name,
                uuid: $uuid,
                status: $status
            )->whereIn('status', [
                ProjectStatus::REFUSE->value,
                ProjectStatus::WAITING->value,
            ]))->orderBy('updated_at','asc')->get();
            return [
                'data' => ProjectResource::collection($projects)
            ];
        }
    }
    public function projectQuantity()
    {
        return $this->projectRepository->projectQuantity();
    }

    public function create(array $data)
    {
        $project = $this->projectRepository->create($data);
        if (!$project) {
            throw new Exception("Không thể tạo dự án");
        }
        $project->personnel()->attach($data['personnel']);
        return new ProjectResource($project);
    }
    public function update(int $id, array $data)
    {
        $project = $this->projectRepository->update($id, $data);
        if (!$project) {
            throw new ModelNotFoundException('Không tìm thấy dự án');
        }
        $project->personnel()->sync($data['personnel']);
        return new ProjectResource($project);
    }
    public function find(int $id): ProjectResource
    {
        $project = $this->projectRepository->find($id);
        if (!$project) throw new ModelNotFoundException('Không tìm thấy dự án');
        return new ProjectResource($this->loadRelationships($project));
    }
    public function personnel(int $projectId)
    {
        $project = $this->projectRepository->find($projectId);
        if (!$project) throw new ModelNotFoundException('Không tìm thấy dự án');
        $paginate = request()->query('paginate');
        $perPage = request()->query('per_page');

        if ($paginate) {
            $personnel = $project->personnel()->withCount([
                'tasks as done_count' => fn($q) => $q->where('status', TaskStatus::DONE)->where('project_id', $project->id),
                'tasks as pending_count' => fn($q) => $q->where('status', TaskStatus::PENDING)->where('project_id', $project->id),
                'tasks as overdue_count' => fn($q) => $q->where('status', TaskStatus::OVERDUE)->where('project_id', $project->id),
                'tasks as pausing_count' => fn($q) => $q->where('status', TaskStatus::PAUSING)->where('project_id', $project->id),
                'tasks as sum_count' => fn($q) => $q->where('project_id', $project->id),
            ])->orderByDesc('sum_count')->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' =>  $this->paginate($personnel),
                'data' => PersonnelResource::collection($personnel->items())
            ];
        } else {
            $personnel = $project->personnel()->withCount([
                'tasks as done_count' => fn($q) => $q->where('status', TaskStatus::DONE)->where('project_id', $project->id),
                'tasks as pending_count' => fn($q) => $q->where('status', TaskStatus::PENDING)->where('project_id', $project->id),
                'tasks as overdue_count' => fn($q) => $q->where('status', TaskStatus::OVERDUE)->where('project_id', $project->id),
                'tasks as pausing_count' => fn($q) => $q->where('status', TaskStatus::PAUSING)->where('project_id', $project->id),
                'tasks as sum_count' => fn($q) => $q->where('project_id', $project->id),
            ])->get();
            return [

                'data' => PersonnelResource::collection($personnel)
            ];
        }
    }
    public function updateStatus(int $projectId, array $data)
    {

        $project = $this->projectRepository->find($projectId);
        if (!$project) throw new ModelNotFoundException("Không tìm thấy dự án");
        $oldStatus = $project->status;
        $project->pa_id = $data['pa_id'];
        $project->status = $data['status'];
        if ($project && $data['ended_at'] <= $project->started_at) {
            throw new BadRequestException("Ngày kết thúc không hợp lệ");
        }
        $project->ended_at = $data['ended_at'];

        $project->save();
        $project->logs()->create([
            'user_id' => auth()->user()->id,
            'description' => $data['description'],
            'meta' => json_encode([
                'action' => ProjectLogAction::UPDATE_STATUS,
                'project_name' => $project->name,
                'old_status' => $oldStatus,
                'new_status' => $project->status
            ])
        ]);
        return new ProjectResource($project);
    }
    public function tasks(int|string $id)
    {
        $project = $this->projectRepository->find($id);
        if (!$project) throw new ModelNotFoundException('Không tìm thấy dự án');
        $paginate = request()->query('paginate');
        $perPage = request()->query('per_page');
        $name = request()->query('name');
        $uuid = request()->query('uuid');
        $status = request()->query('status');
        if ($paginate) {
            $tasks = $project->tasks()->with(['designated_personnel'])->when($name, function ($q) use ($name) {
                $q->where('name', '%like%', $name);
            })->when($uuid, function ($q) use ($uuid) {
                $q->where('uuid', '%like%', $uuid);
            })->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($tasks),
                'data' => TaskResource::collection($tasks->items())
            ];
        } else {
            return [
                'data'  => TaskResource::collection($project->tasks()->with(['designated_personnel'])->when($name, function ($q) use ($name) {
                    $q->where('name', '%like%', $name);
                })->when($uuid, function ($q) use ($uuid) {
                    $q->where('uuid', '%like%', $uuid);
                })->when($status, function ($q) use ($status) {
                    $q->where('status', $status);
                })->get())
            ];
        }
    }
    public function delete(array $projects)
    {
        $this->projectRepository->query()->whereIn('id', $projects)->delete();
    }
    public function lock(int $id)
    {
        $project = $this->projectRepository->find($id);
        if (!$project) throw new ModelNotFoundException("Không tìm thấy project");
        if (!$project->is_lock) {
            $project->is_lock = true;
            $project->save();
        } else {
            $project->is_lock = false;
            $project->save();
        }
        return new ProjectResource($project);
    }
}
