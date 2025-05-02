<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'name' => $this->name,
            'started_at' => $this->started_at,
            'ended_at' => $this->ended_at,
            'status' => $this->status,
            'pm' =>  UserResource::collection($this->whenLoaded('pm')),
            'pa' => new UserResource($this->whenLoaded('pa')),
            'personnel' => UserResource::collection($this->whenLoaded('personnel')),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'is_lock' => $this->is_lock,
            'personnel_count' => $this->personnel_count,
            'tasks_done_count' => $this->tasks_done_count,
            'tasks_pending_count' => $this->tasks_pending_count,
            'tasks_overdue_count' => $this->tasks_overdue_count,
            'priority' => $this->priority,
            'logs' => ProjectLogResource::collection($this->whenLoaded('logs')),
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
