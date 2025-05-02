<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectLog extends Model
{
    protected $fillable = ['project_id','user_id','description','meta', 'created_at',
    'updated_at'];
    protected $casts = [
        'meta' => 'array'
    ];
    public function project():BelongsTo{
        return $this->belongsTo(Project::class,'project_id');
    }
    public function user():BelongsTo{
        return $this->belongsTo(User::class,'user_id');
    }
}
