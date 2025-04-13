<?php

namespace App\Repositories\Task;

use App\Models\Task;
use App\Repositories\BaseRepositoryImplement;

class TaskRepositoryImplement extends BaseRepositoryImplement implements TaskRepository
{
    public function __construct(Task $model)
    {
        parent::__construct($model);

    }

}
