<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Docs>
 */
class DocsFactory extends Factory
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
            'title' => $this->faker->name(),
            'project_id' => random_int(1, 10),
            'uuid' => $this->faker->uuid(),
            'file' => $this->faker->randomElement(['sotay.docs', 'phananh.ptpm', 'giaoduc.html']),
            'added_at' =>  Carbon::instance($this->faker->dateTimeBetween($start, '+6 months')),
        ];
    }
}
