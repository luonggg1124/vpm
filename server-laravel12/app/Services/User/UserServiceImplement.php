<?php

namespace App\Services\User;

use App\Http\Resources\UserResource;
use App\Repositories\User\UserRepository;
use App\Traits\Pagination;



class UserServiceImplement  implements UserService
{
    use Pagination;
    public function __construct(protected UserRepository $userRepository) {}
    public function all(array $targetId)
    {
        $perPage = request()->query('per_page');
        $paginate = request()->query('paginate');
        $placeholders = implode(', ', array_fill(0, count($targetId), '?'));
        if ($paginate) {
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
}
