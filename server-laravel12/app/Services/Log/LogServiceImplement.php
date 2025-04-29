<?php

namespace App\Services\Log;

use App\Http\Resources\LogResource;
use App\Repositories\Log\LogRepository;
use App\Traits\CanLoadRelationships;
use App\Traits\Pagination;

class LogServiceImplement  implements LogService
{
    use CanLoadRelationships, Pagination;
    protected array $relations = ['user','project'];
    public function __construct(protected LogRepository $logRepository) {}

    public function all()
    {
        $perPage = request()->query('per_page');
        $userName = request()->query('user_name');
        $time = request()->query('time');
        $projectId = request()->query('project_id');
        if ($perPage) {
            $logs = $this->loadRelationships($this->logRepository->filter($userName, $time)->when($projectId ,function($q)use($projectId ){
                $q->where('project_id',$projectId );
            }))->orderByDesc('project_logs.updated_at')->paginate(is_numeric($perPage) ? $perPage : 10);
            return [
                'pagination' => $this->paginate($logs),
                'data' => LogResource::collection($logs->items())
            ];
        } else {
            $logs = $this->loadRelationships($this->logRepository->filter($userName, $time)->when($projectId ,function($q)use($projectId ){
                $q->where('project_id',$projectId );
            }))->orderByDesc('project_logs.updated_at')->get();
            return [
                'data' => LogResource::collection($logs->items())
            ];
        }
    }
}
