<?php

namespace App\Repositories\Project;
use Illuminate\Database\Eloquent\Builder;
use App\Repositories\BaseRepository;

interface ProjectRepository extends BaseRepository
{
    public function filter($start_date = null,
    $end_date = null,
    $name = null,
    $uuid = null,
    $status = null):Builder;
    public function projectQuantity():array;

}
