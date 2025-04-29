<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'uuid',
        'description',
        'project_id',
        'status',
        'feature',
        'designated_personnel_id',
        'designating_personnel_id',
        'status_changed_at',
        'ended_at',
        'priority',
    ];
    protected $casts = [
        'status' => \App\Enum\TaskStatus::class,
    ];
    // public function declaration():BelongsTo{
    //     return $this->belongsTo(Declaration::class,'declaration_id');
    // }
    public function designated_personnel():BelongsTo{
        return $this->belongsTo(User::class,'designated_personnel_id');
    }
    public function designating_personnel():BelongsTo{
        return $this->belongsTo(User::class,'designating_personnel_id');
    }
    public function project():BelongsTo{
        return $this->belongsTo( Project::class,'project_id');
    }
}
