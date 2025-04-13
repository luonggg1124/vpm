<?php

namespace App\Services\Declaration;

use App\Http\Resources\DeclarationResource;
use App\Repositories\Declaration\DeclarationRepository;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;


class DeclarationServiceImplement  implements DeclarationService
{
    public function __construct(protected DeclarationRepository $declarationRepository) {}
    public function all(): AnonymousResourceCollection
    {
        return DeclarationResource::collection($this->declarationRepository->all());
    }
    public function getByType(string $type = 'PROJECT'): AnonymousResourceCollection{
        return DeclarationResource::collection($this->declarationRepository->getByType(Str::upper($type)));
    }
}
