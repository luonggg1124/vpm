<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonnelResource extends JsonResource
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
            'email' => $this->email,
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'done_count' => $this->done_count,
            'pending_count' => $this->pending_count,
            'overdue_count' => $this->overdue_count,
            'pausing_count' => $this->pausing_count,
            'sum_count' =>  $this->sum_count
        ];
    }
}
