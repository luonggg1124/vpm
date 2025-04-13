<?php

namespace App\Services\User;

use App\Http\Resources\UserResource;
use App\Repositories\User\UserRepository;
use App\Traits\Pagination;



class UserServiceImplement  implements UserService
{
    use Pagination;
    public function __construct(protected UserRepository $userRepository) {}
    public function all(int|string $targetId)
    {
        $perPage = request()->query('per_page');
        $paginate = request()->query('paginate');
        if ($paginate) {
            $user = $this->userRepository->query()->orderByRaw("CASE WHEN id = ? THEN 0 ELSE 1 END", [$targetId])
            ->orderBy('id')->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($user),
                'data' => UserResource::collection($user->items())
            ];
        } else {

            $user = $this->userRepository->query()->orderByRaw("CASE WHEN id = ? THEN 0 ELSE 1 END", [$targetId])
            ->orderBy('id')->get();
            return [
                'data' => UserResource::collection($user)
            ];
        }
    }
}
