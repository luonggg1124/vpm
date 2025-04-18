<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppBindingRepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $repositories = [
            'project' => [
                \App\Repositories\Project\ProjectRepository::class,
                \App\Repositories\Project\ProjectRepositoryImplement::class
            ],
            'task' => [
                \App\Repositories\Task\TaskRepository::class,
                \App\Repositories\Task\TaskRepositoryImplement::class
            ],
            'user' => [
                \App\Repositories\User\UserRepository::class,
                \App\Repositories\User\UserRepositoryImplement::class
            ],
            'Declaration' => [
                \App\Repositories\Declaration\DeclarationRepository::class,
                \App\Repositories\Declaration\DeclarationRepositoryImplement::class
            ],
            'Log' => [
                \App\Repositories\Log\LogRepository::class,
                \App\Repositories\Log\LogRepositoryImplement::class
            ]
        ];
        foreach ($repositories as $repository) {
            $this->app->bind($repository[0], $repository[1]);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
