<?php

namespace App\Repositories\Declaration;

use App\Models\Declaration;
use App\Repositories\BaseRepositoryImplement;

class DeclarationRepositoryImplement extends BaseRepositoryImplement implements DeclarationRepository
{   
    public function __construct(Declaration $model)
    {
        parent::__construct($model);
    }
    public function getByType(string $type): array{
        return $this->model->where('type','=',$type)->get()->toArray();
    }
}
