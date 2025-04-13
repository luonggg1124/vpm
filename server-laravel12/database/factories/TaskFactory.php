<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'uuid' => $this->faker->uuid(),
            'project_id' => random_int(1,20),
            'status' => $this->faker->randomElement(['DONE','PENDING','PAUSING','OVERDUE']),
            'feature' => $this->faker->name(),
            'designated_personnel_id' => random_int(1,20)
        ];
    }
}
