<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectLog extends Model
{
    protected $fillable = ['project_id','user_id','description','detail'];
    protected $cast = [
        'meta' => 'array'
    ];
    public function project():BelongsTo{
        return $this->belongsTo(Project::class,'');
    }
}
