<?php

namespace App\Services\User;

use App\Http\Resources\PersonnelResource;
use App\Http\Resources\UserPersonnelResource;
use App\Http\Resources\UserResource;
use App\Repositories\User\UserRepository;
use App\Traits\CanLoadRelationships;
use App\Traits\Pagination;



class UserServiceImplement  implements UserService
{
    use Pagination, CanLoadRelationships;
    public function __construct(protected UserRepository $userRepository) {}
    public function all(array $targetId)
    {
        $perPage = request()->query('per_page');
        $placeholders = implode(', ', array_fill(0, count($targetId), '?'));
        if ($perPage) {
            $user = $this->userRepository->query()->orderByRaw("
            CASE 
                WHEN id = ANY (ARRAY[$placeholders]::int[]) 
                THEN array_position(ARRAY[$placeholders]::int[], id) 
                ELSE 999999 
            END
        ", [...$targetId, ...$targetId])
                ->orderBy('id')->paginate(is_numeric($perPage) ? $perPage : 10);

            return [
                'pagination' => $this->paginate($user),
                'data' => UserResource::collection($user->items())
            ];
        } else {

            $user = $this->userRepository->query()->orderByRaw("
            CASE 
                WHEN id = ANY (ARRAY[$placeholders]::int[]) 
                THEN array_position(ARRAY[$placeholders]::int[], id) 
                ELSE 999999 
            END
        ", [...$targetId, ...$targetId])
                ->orderBy('id')->get();

            return [
                'data' => UserResource::collection($user)
            ];
        }
    }
    public function personnel()
    {
        $perPage = request()->query('per_page');
        $name = request()->query('name');
        $email = request()->query('email');
        $projectName = request()->query('project_name');
        if ($perPage) {
            $personnel = $this->userRepository->personnel(name: $name, email: $email, projectName: $projectName)->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($personnel),
                'data' => UserPersonnelResource::collection($personnel->items())
            ];
        } else {
            return [
                'data' => UserPersonnelResource::collection($this->userRepository->personnel(name: $name, email: $email, projectName: $projectName)->get())
            ];
        }
    }
}
