<?php

namespace App\Repositories\Task;

use App\Models\Task;
use App\Repositories\BaseRepositoryImplement;
use Illuminate\Database\Eloquent\Builder;

class TaskRepositoryImplement extends BaseRepositoryImplement implements TaskRepository
{
    public function __construct(Task $model)
    {
        parent::__construct($model);
    }
    public function filter(
        $name = null,
        $uuid = null,
        $status = null,
        $designated_personnel = null,
        $designating_personnel = null
    ): Builder {
        return $this->model->when($name, function ($q) use ($name) {
            $q->where('name', 'LIKE', "%$name%");
        })->when($uuid, function ($q) use ($uuid) {
            $q->where('uuid', 'LIKE', "%$uuid%");
        })->when($status, function ($q) use ($status) {
            $q->where('status', '=', $status);
        })->when($designated_personnel, function ($q) use ($designated_personnel) {
            $q->whereHas('designated_personnel', function ($q)use ($designated_personnel){
                $q->where('name','LIKE', "%$designated_personnel%");
            });
        })->when($designating_personnel, function ($q) use ($designating_personnel) {
            $q->whereHas('designating_personnel', function ($q)use ($designating_personnel){
                $q->where('name','LIKE', "%$designating_personnel%");
            });
        });
    }
}
