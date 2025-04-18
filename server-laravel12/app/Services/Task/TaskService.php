<?php

namespace App\Services\Task;


interface TaskService 
{
    public function all():array;
    public function create(array $data);
    public function delete(int|string $id):void;

}
