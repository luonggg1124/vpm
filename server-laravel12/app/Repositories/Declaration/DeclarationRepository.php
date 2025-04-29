<?php

namespace App\Repositories\Declaration;

use App\Repositories\BaseRepository;

interface DeclarationRepository extends BaseRepository
{
    public function getByType(string $type):array;
}
