<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    protected $casts = [
        'status' => \App\Enum\TaskStatus::class,
    ];
    // public function declaration():BelongsTo{
    //     return $this->belongsTo(Declaration::class,'declaration_id');
    // }
    public function designated_personnel():BelongsTo{
        return $this->belongsTo(User::class,'designated_personnel_id');
    }
}
