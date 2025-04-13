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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('uuid');
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->enum('status',['DONE','PENDING','PAUSING','OVERDUE']);
            // $table->foreignId('declaration_id')->constrained('declarations');
            $table->string('feature');
            $table->foreignId('designated_personnel_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('ended_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
