<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('uuid');
            $table->string('name');
            $table->timestamp('started_at');
            $table->timestamp('ended_at');
            $table->enum('status',['WAITING','REFUSE','DEVELOPING','PAUSING',"DONE",'FAILED','CLOSE']);
            $table->text('description')->nullable();
            $table->boolean('is_lock')->nullable();
            $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('pa_id')->constrained('users')->onDelete('cascade');
            $table->enum('priority',['LOW','MEDIUM',"HIGH"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
