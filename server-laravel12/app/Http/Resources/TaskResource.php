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
            'project' => new ProjectResource($this->whenLoaded($this->project)),
            'status' => $this->status,
            'feature' => $this->feature,
            'designated_personnel' => new UserResource($this->whenLoaded('designated_personnel')),
        ];
    }
}
