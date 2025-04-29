<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

interface BaseRepository
{
    public function paginate(int $limit = 10):LengthAwarePaginator ;
    public function all();

    public function find(int|string $id);

    public function create(array $data);
    public function update($id, array $data);
    public function delete(int|string $id);
    public function query():Builder;
}
