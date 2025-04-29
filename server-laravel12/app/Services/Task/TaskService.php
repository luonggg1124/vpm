<?php

namespace App\Services\Task;

use App\Http\Resources\TaskResource;

interface TaskService 
{
    public function all():array;
    public function create(array $data);
    public function find(int $id): TaskResource;
    public function update(int $id,array $data): TaskResource;
    public function delete(int|string $id):void;

}
