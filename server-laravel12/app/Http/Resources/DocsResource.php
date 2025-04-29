<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocsResource extends JsonResource
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
            'title' => $this->title,
            'project' => new ProjectResource($this->whenLoaded('project')),
            'uuid' => $this->uuid,
            'file' => $this->file,
            'added_at' => $this->added_at,
        ];
    }
}
