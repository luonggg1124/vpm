<?php

namespace App\Repositories\Log;

use App\Models\ProjectLog;
use App\Repositories\BaseRepositoryImplement;
use Illuminate\Database\Eloquent\Builder;

class LogRepositoryImplement extends BaseRepositoryImplement implements LogRepository
{
    public function __construct(ProjectLog $model)
    {
        parent::__construct($model);
    }
    public function filter(
        $userName = "",
        $time = ""
    ):Builder{
        return $this->model->when($userName,function($q)use($userName){
            $q->whereHas('user',function($q) use($userName){
                $q->where('name','ILIKE',"%{$userName}%");
            });
        })->when($time,function($q)use($time){
            $q->whereDate('created_at','<=',$time);
        });
    }
}
