<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppBindingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $services = [
            'auth' => [
                \App\Services\Auth\AuthService::class,
                \App\Services\Auth\AuthServiceImplement::class
            ],
            'Declaration' => [
                \App\Services\Declaration\DeclarationService::class,
                \App\Services\Declaration\DeclarationServiceImplement::class
            ],
            'Project' => [
                \App\Services\Project\ProjectService::class,
                \App\Services\Project\ProjectServiceImplement::class
            ],
            'User' => [
                \App\Services\User\UserService::class,
                \App\Services\User\UserServiceImplement::class
            ],
            'Task' => [
                \App\Services\Task\TaskService::class,
                \App\Services\Task\TaskServiceImplement::class
            ],
            'Log' => [
                \App\Services\Log\LogService::class,
                \App\Services\Log\LogServiceImplement::class
            ]
        ];
        foreach ($services as $service) {
            $this->app->bind($service[0], $service[1]);
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
