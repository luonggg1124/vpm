<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    // tự ép kiểu
    protected $casts = [
        'status' => \App\Enum\ProjectStatus::class,
        'priority' =>  \App\Enum\ProjectPriority::class,
        
    ];
    protected $fillable = [
        'uuid',
        'name',
        'started_at',
        'ended_at',
        'status',
        'is_lock',
        'description',
        'pa_id',
        'creator_id',
        'priority',
        'created_at',
        'updated_at'
    ];
    // public function declaration():BelongsTo
    // {
    //     return $this->belongsTo(Declaration::class,'declaration_id');
    // }
    public function pm():BelongsToMany{
        return $this->belongsToMany(User::class,'pm_project','project_id','pm_id');
    }
    public function pa():BelongsTo{
        return $this->belongsTo(User::class,'pa_id');
    }
    public function creator():BelongsTo{
        return $this->belongsTo(User::class,'creator_id');
    }
    public function tasks():HasMany{
        return $this->hasMany(Task::class,'project_id');
    }
    public function personnel(){
        return $this->belongsToMany(User::class,'table_project_personnel','project_id','personnel_id');
    }
    public function logs():HasMany{
        return $this->hasMany(ProjectLog::class,'project_id');
    }
    public function docs():HasMany{
        return $this->hasMany(Docs::class,'project_id');
    }
}
