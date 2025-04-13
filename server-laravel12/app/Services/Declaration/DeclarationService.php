<?php

namespace App\Services\Declaration;


use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface DeclarationService 
{
    public function all(): AnonymousResourceCollection;
    public function getByType(string $type = 'PROJECT'): AnonymousResourceCollection;
}
