<?php

namespace App\Repositories\Project;

use App\Enum\TaskStatus;
use App\Models\Project;
use App\Repositories\BaseRepositoryImplement;
use Illuminate\Database\Eloquent\Builder;

class ProjectRepositoryImplement extends BaseRepositoryImplement implements ProjectRepository
{
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }
    public function filter(
        $start_date = null,
        $end_date = null,
        $name = null,
        $uuid = null,
        $status = null
    ): Builder {
        return $this->model->withCount('personnel')->withCount([
            'tasks as tasks_done_count' => fn($q) => $q->where('status', TaskStatus::DONE->value),
            'tasks as tasks_pending_count' => fn($q) => $q->where('status', TaskStatus::PENDING->value),
            'tasks as tasks_overdue_count' => fn($q) => $q->where('status', TaskStatus::OVERDUE->value),
        ])->when($start_date, function ($q) use ($start_date) {
            $q->where('started_at', '>=', $start_date);
        })->when($end_date, function ($q) use ($end_date) {
            $q->where('ended_at', '<=', $end_date);
        })->when($name, function ($q) use ($name) {
            $q->where('name', 'LIKE', "%$name%");
        })->when($uuid, function ($q) use ($uuid) {
            $q->where('uuid', 'LIKE', "%$uuid%");
        })->when($status, function ($q) use ($status) {
            $q->where('status', '=', $status);
        });
    }
    public function projectQuantity(): array
    {

        return [
            'sum' => $this->model->count(),
            'waitings' => $this->query()->where('status', 'WAITING')->count(),
            'refuse' =>  $this->query()->where('status', 'REFUSE')->count(),
            'developing' => $this->query()->where('status', 'DEVELOPING')->count(),
            'pausing' => $this->query()->where('status', 'PAUSING')->count(),
            'done' => $this->query()->where('status', 'DONE')->count(),
            'failed' => $this->query()->where('status', 'FAILED')->count(),
            'close' => $this->query()->where('status', 'CLOSE')->count(),
        ];
    }
}
