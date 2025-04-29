<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class BaseRepositoryImplement implements BaseRepository
{
    public function __construct(protected Model $model)
    {
    }
    public function paginate(int $limit = 10):LengthAwarePaginator {
        return $this->model->paginate($limit);
    }
    public function all()
    {
        return $this->model->all();
    }

    public function find(int|string $id)
    {
        return $this->model->query()->find($id);
    }

    public function create(array $data):Model
    {
        return $this->model->query()->create($data);
    }

    public function update($id, array $data)
    {
        $record = $this->model->query()->find($id);
        if (!$record) {
            return null;
        }
        $record->update($data);
        return $record;
    }
    public function delete(int|string $id)
    {
        $record = $this->model->query()->find($id);
        if ($record) {
            return $record->delete();
        }
        return false;
    }
    public function query():Builder
    {
        return $this->model->query();
    }
    
}
