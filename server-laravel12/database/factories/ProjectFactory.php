<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = Carbon::instance($this->faker->dateTimeBetween('-1 year', 'now'));
        return [
            'uuid' => $this->faker->company(),
            'name' => $this->faker->name(),
            'started_at' => $start,
            'ended_at' => Carbon::instance($this->faker->dateTimeBetween($start, '+6 months')),
            'status' => $this->faker->randomElement(['WAITING', 'REFUSE', 'DEVELOPING', 'PAUSING', "DONE"]),
            'creator_id' =>random_int(1, 10),
            'description' => $this->faker->sentence,
            'pa_id' => random_int(1, 10),
            'priority' => $this->faker->randomElement(['LOW', 'MEDIUM', "HIGH"]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
