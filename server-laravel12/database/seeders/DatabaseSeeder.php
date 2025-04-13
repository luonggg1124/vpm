<?php

namespace Database\Seeders;

use App\Models\Declaration;
use App\Models\Department;
use App\Models\Position;
use App\Models\Project;
use App\Models\Task;
use App\Models\Title;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        $declarations = [
            [
                'uuid' => fake()->uuid(),
                'name' => 'Đang thực hiện',
                'type' => 'PROJECT'
            ],
            [
                'uuid' => fake()->uuid(),
                'name' => 'Hoàn thành',
                'type' => 'PROJECT'
            ],
            [
                'uuid' => fake()->uuid(),
                'name' => 'Đóng',
                'type' => 'PROJECT'
            ],
            [
                'uuid' => fake()->uuid(),
                'name' => 'Quá hạn',
                'type' => 'TASK'
            ],
            [
                'uuid' => fake()->uuid(),
                'name' => 'Lỗi',
                'type' => 'TASK'
            ],
            [
                'uuid' => fake()->uuid(),
                'name' => 'Tạm dừng',
                'type' => 'PROJECT'
            ],
            [
                'uuid' => fake()->uuid(),
                'name' => 'Chưa thực hiện',
                'type' => 'TASK'
            ],
            [
                'uuid' => fake()->uuid(),
                'name' => 'Thất bại',
                'type' => 'TASK'
            ]
        ];

        $title = [
            [
                'name' => 'PM',
            ],
            [
                'name' => 'BA',
            ],
            [
                'name' => 'DEV',
            ],
            [
                'name' => 'TESTER',
            ]
        ];
        $position = [
            [
                'name' => 'Lead'
            ],
            [
                'name' => 'Intern'
            ],
            [
                'name' => 'Fresher'
            ],
            [
                'name' => 'Middle'
            ],
            [
                'name' => 'Senior'
            ]
        ];


        foreach ($declarations as $t) {
            Declaration::create($t);
        }
        foreach ($title as $t) {
            Title::create($t);
        }
        foreach ($position as $t) {
            Position::create($t);
        }



        $firstDepartment = Department::create([
            'uuid' => fake()->uuid(),
            'department_head_id' => null,
            'name' => fake()->name()
        ]);


        User::create([
            'name' => 'Louis',
            'email' => 'abc@gmail.com',
            'started_at' => now(),
            'password' => Hash::make('password'),
            'department_id' => 1,
            'position_id' => 1,
            'title_id' => 1
        ]);
        $firstDepartment->department_head_id = 1;
        $firstDepartment->save();
        Department::factory(10)->create();
        $user = User::factory(20)->create()->pluck('id')->toArray();

        $project = Project::factory(20)->create();
        foreach ($project as $p) {
            $p->personnel()->attach([...$user]);
            
        }
        Task::factory(20000)->create();
    }
}
