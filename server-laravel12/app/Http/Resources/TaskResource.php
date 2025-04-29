<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'uuid' => $this->uuid,
            'project' => new ProjectResource($this->whenLoaded('project')),
            'status' => $this->status,
            'feature' => $this->feature,
            'designated_personnel' => new UserResource($this->whenLoaded('designated_personnel')),
            'designating_personnel' => new UserResource($this->whenLoaded('designating_personnel')),
            'status_changed_at' => $this->status_changed_at,
            'ended_at' => $this->ended_at,
            'created_at' => $this->created_at,
            'priority' => $this->priority
        ]; 
    }
}
