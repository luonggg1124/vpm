<?php

namespace App\Repositories\Log;

use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

interface LogRepository extends BaseRepository
{
    public function filter(
        $userName = "",
        $time = ""
    ): Builder;
}
