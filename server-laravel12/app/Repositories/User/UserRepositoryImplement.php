<?php

namespace App\Repositories\User;

use App\Enum\ProjectStatus;
use App\Enum\TaskStatus;
use App\Models\User;
use App\Repositories\BaseRepositoryImplement;
use Illuminate\Database\Eloquent\Builder;

class UserRepositoryImplement extends BaseRepositoryImplement implements UserRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
    public function findByEmail(string $email): User|null
    {
        return $this->model->where('email', $email)->first();
    }
    public function personnel(
        $name = "",
        $email = "",
        $projectName = ""
    ): Builder {
        return $this->model->withCount(['projects' => function ($q) use ($projectName) {
            $q->whereIn('status', [ProjectStatus::DEVELOPING, ProjectStatus::PAUSING])
                ->when($projectName, function ($q) use ($projectName) {
                    $q->where('name', 'ILIKE', "%$projectName%");
                });
        }])->with(['projects' => function ($q) use ($projectName) {
            $q->whereIn('status', [ProjectStatus::DEVELOPING, ProjectStatus::PAUSING])
                ->when($projectName, function ($q) use ($projectName) {
                    $q->where('name', 'ILIKE', "%$projectName%");
                })
                ->withCount([
                    'tasks as sum_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id');
                    },
                    'tasks as done_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::DONE);
                    },
                    'tasks as pending_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::PENDING);
                    },
                    'tasks as pausing_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::PAUSING);
                    },
                    'tasks as overdue_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::OVERDUE);
                    },
                ])->orderByDesc('sum_task_count');;
        }])->when($name, function ($q) use ($name) {
            $q->where('name', 'ILIKE', "%$name%");
        })->when($email, function ($q) use ($email) {
            $q->where('email', 'ILIKE', "%$email%");
        })->orderByDesc('projects_count');
    }
    public function personnelByProject(
        $name = "",
        $email = "",
        $projectName = ""
    ): Builder {
        return $this->model->withCount(['projects' => function ($q) use ($projectName) {
            $q->whereIn('status', [ProjectStatus::DEVELOPING, ProjectStatus::PAUSING])
                ->when($projectName, function ($q) use ($projectName) {
                    $q->where('name', 'ILIKE', "%$projectName%");
                });
        }])->with(['projects' => function ($q) use ($projectName) {
            $q->whereIn('status', [ProjectStatus::DEVELOPING, ProjectStatus::PAUSING])
                ->when($projectName, function ($q) use ($projectName) {
                    $q->where('name', 'ILIKE', "%$projectName%");
                })
                ->withCount([
                    'tasks as sum_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id');
                    },
                    'tasks as done_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::DONE);
                    },
                    'tasks as pending_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::PENDING);
                    },
                    'tasks as pausing_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::PAUSING);
                    },
                    'tasks as overdue_task_count' => function ($q) {
                        $q->whereColumn('tasks.designated_personnel_id', 'table_project_personnel.personnel_id')
                            ->where('tasks.status', TaskStatus::OVERDUE);
                    },
                ])->orderByDesc('sum_task_count');;
        }])->when($name, function ($q) use ($name) {
            $q->where('name', 'ILIKE', "%$name%");
        })->when($email, function ($q) use ($email) {
            $q->where('email', 'ILIKE', "%$email%");
        })->orderByDesc('projects_count');
    }
}
