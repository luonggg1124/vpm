<?php

namespace App\Services\Project;

use App\Http\Resources\ProjectResource;

interface ProjectService 
{
    public function initiation();
    public function projectQuantity();
    public function projects();
    public function approve();
    public function sendForReview(int|string $id);
    public function tasks(int|string $id);
    public function docs(int|string $id);
    public function find(int $id):ProjectResource;
    public function update(int $id,array $data);
    public function personnel(int $projectId);
    public function updateStatus(int $projectId,array $data);
    public function lock(int $id);
    public function delete(array $projects);
    public function create(array $data);
}
