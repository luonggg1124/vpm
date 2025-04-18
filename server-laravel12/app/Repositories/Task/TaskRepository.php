<?php

namespace App\Repositories\Task;

use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

interface TaskRepository extends BaseRepository
{
    public function filter(
        $name = null,
        $uuid = null,
        $status = null,
        $designated_personnel = null,
        $designating_personnel = null
    ): Builder;
}
