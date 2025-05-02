<?php

namespace Database\Seeders;

use App\Enum\ProjectStatus;
use App\Enum\TaskPriority;
use App\Enum\TaskStatus;
use App\Models\Declaration;
use App\Models\Department;
use App\Models\Docs;
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
                'name' => 'ADMIN',
            ],
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



        


        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'started_at' => now(),
            'password' => Hash::make('password'),
            // 'department_id' => 1,
            'position_id' => 1,
            'title_id' => 1
        ]);
        User::create([
            'name' => 'Ngoc Anh',
            'email' => 'ngocanh@gmail.com',
            'started_at' => now(),
            'password' => Hash::make('password'),
            // 'department_id' => 1,
            'position_id' => 1,
            'title_id' => 2
        ]);
        User::create([
            'name' => 'Ngoc Anh 1',
            'email' => 'ngocanh11@gmail.com',
            'started_at' => now(),
            'password' => Hash::make('password'),
            // 'department_id' => 1,
            'position_id' => 1,
            'title_id' => 3
        ]);
        
        
        $projects = [
            [
                'uuid' => 'PROJECT1',
                'name' => 'TMDT BTE',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT2',
                'name' => 'IV SYSTEM VLMS',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT3',
                'name' => 'SVS TN1 - Quản lý tài khoản',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT4',
                'name' => 'Học việc',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
            'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT5',
                'name' => 'K12-DTH HCM 2025',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT6',
                'name' => 'K12 - Đính kèm mẫu báo cáo theo TT 35 + số báo cáo',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT7',
                'name' => 'K12Online | Mầm Non - Nộp CSDL Ngành',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT8',
                'name' => 'K12 Bản tin - Cài tiến thực đơn - BTE',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT9',
                'name' => 'K12 Mầm non - Xây dựng module Sổ sách',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT10',
                'name' => 'K12Online - KDCLGD : Cài tiến đáp ứng thông tư 22',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT11',
                'name' => 'K12Connect - Chuyển căn V3',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT12',
                'name' => 'K12Online | App Ngành HCM',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT13',
                'name' => 'TVS | TW6 - Tư vấn người học',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT14',
                'name' => 'APP - Sàn Thương mại Giáo dục',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT15',
                'name' => 'K12 Bản tin - Đổi đơn - BTE',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT16',
                'name' => 'K12 Connect V3 - Phổ cập giáo dục',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT17',
                'name' => 'Chatbot TTHC Hải Dương',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT18',
                'name' => 'K12Online | Mầm Non - Nộp CSDL Ngành (2025-04-30)',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT19',
                'name' => 'K12Online | Gộp app',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM'
            ],
            [
                'uuid' => 'PROJECT20',
                'name' => 'BTE12 - Tích hợp hệ thống Paramount++ & Package in Postpaid Bill',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM' // Sửa từ ProjectStatus::DONE thành giá trị hợp lệ
            ],
            [
                'uuid' => 'PROJECT21',
                'name' => 'K12Online | Mầm Non - Nộp CSDL Ngành (2025-04-30)',
                'started_at' => '2025-04-13',
                'ended_at' => '2025-04-25',
                'status' => 'DEVELOPING',
                'creator_id' => 1,
                'pa_id' => 2,
                'priority' => 'MEDIUM' // Sửa từ ProjectStatus::DONE thành giá trị hợp lệ
            ]
        ];
        
        $users = [
            [
                'name' => 'Nguyễn Đăng Khoa',
                'email' => 'khoand@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Nguyễn Bá Khôi',
                'email' => 'khoinb@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Lê Trọng Kiên',
                'email' => 'kienlt@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Nguyễn Thị Thúy Kiều',
                'email' => 'kieuntt@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Phạm Thị Lan',
                'email' => 'lanpt@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Nguyễn Thị Khánh Linh',
                'email' => 'linhntk1@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Nguyễn Hoàng Long',
                'email' => 'longjh@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Đinh Hoàng Long',
                'email' => 'longdih@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Lã Hoàng Long',
                'email' => 'longlth@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Nguyễn Đình Long',
                'email' => 'longndi@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ],
            [
                'name' => 'Phùng Hoàng Long',
                'email' => 'longph@vhv.vn',
                'started_at' => now(),
                'password' => Hash::make('password'),
                'position_id' => 2,
                'title_id' => 3
            ]
        ];
        
        $tasks = [
            [
                'name' => 'BS sung giao diện cho tính tìm kiếm phân ẩn, kiện nghị',
                'uuid' => '0888279000!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thực hiện\nChức năng",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11), // Điều chỉnh để khớp với số lượng user
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-27',
                'ended_at' => '2025-03-27',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung popup Xóa phân ẩn, kiện nghị, sự kiện',
                'uuid' => '0888279000!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Click vào icon Xóa\nChức năng:\nMong muốn: BS sung popup Xóa phân ẩn, kiện nghị như sau",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-27',
                'ended_at' => '2025-03-27',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung popup Giới thiệu và chế phí nguồn ứng tuyển hiện xem lại trên TBD nhập',
                'uuid' => '0888279000!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị, sự kiện\nBước 4: Chọn\nChức năng:\nMong muốn: BS sung popup Giới thiệu",
                'status' => TaskStatus::DONE,
                'feature' => 'Quản lý phân ẩn',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-27',
                'ended_at' => '2025-03-27',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung popup Tư chọn phân ẩn, kiện nghị, sự kiện',
                'uuid' => '0888279000!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị, sự kiện\nBước 4: Chọn\nChức năng:\nMong muốn: BS sung popup Tư chọn phân ẩn, kiện nghị, sự kiện như sau",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-27',
                'ended_at' => '2025-03-27',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng lọc phân ẩn theo ngày tạo',
                'uuid' => '0888279001!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm bộ lọc theo ngày\nChức năng:\nMong muốn: BS sung bộ lọc phân ẩn theo ngày tạo",
                'status' => TaskStatus::PENDING,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-28',
                'ended_at' => '2025-04-20', // Chưa hoàn thành nên để '2025-04-20'
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung popup Sửa thông tin kiện nghị',
                'uuid' => '0888279002!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Click vào icon Sửa\nChức năng:\nMong muốn: BS sung popup Sửa thông tin kiện nghị",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-29',
                'ended_at' => '2025-03-29', // Cập nhật ended_at
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung giao diện hiển thị sự kiện theo danh sách',
                'uuid' => '0888279003!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Hiển thị danh sách\nChức năng:\nMong muốn: BS sung giao diện danh sách sự kiện",
                'status' => TaskStatus::DONE,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-30',
                'ended_at' => '2025-03-30',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::LOW
            ],
            [
                'name' => 'BS sung chức năng xuất Excel cho phân ẩn',
                'uuid' => '0888279004!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm nút xuất Excel\nChức năng:\nMong muốn: BS sung chức năng xuất Excel",
                'status' => TaskStatus::PENDING,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-03-31',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung popup Xác nhận xóa sự kiện',
                'uuid' => '0888279005!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Click vào icon Xóa\nChức năng:\nMong muốn: BS sung popup Xác nhận xóa sự kiện",
                'status' => TaskStatus::DONE,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-01',
                'ended_at' => '2025-04-01',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung giao diện chi tiết kiện nghị',
                'uuid' => '0888279006!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Click vào kiện nghị\nChức năng:\nMong muốn: BS sung giao diện chi tiết kiện nghị",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-02',
                'ended_at' => '2025-04-02',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng tìm kiếm sự kiện theo tên',
                'uuid' => '0888279007!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Thêm ô tìm kiếm\nChức năng:\nMong muốn: BS sung tìm kiếm sự kiện theo tên",
                'status' => TaskStatus::PENDING,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-03',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung popup Thêm mới phân ẩn',
                'uuid' => '0888279008!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Click nút Thêm mới\nChức năng:\nMong muốn: BS sung popup Thêm mới phân ẩn",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-04',
                'ended_at' => '2025-04-04',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng gửi thông báo kiện nghị',
                'uuid' => '0888279009!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm nút gửi thông báo\nChức năng:\nMong muốn: BS sung gửi thông báo kiện nghị",
                'status' => TaskStatus::PENDING,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-05',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung giao diện thống kê sự kiện',
                'uuid' => '0888279010!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Thêm tab thống kê\nChức năng:\nMong muốn: BS sung giao diện thống kê sự kiện",
                'status' => TaskStatus::DONE,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-06',
                'ended_at' => '2025-04-06',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::LOW
            ],
            [
                'name' => 'BS sung chức năng phân quyền truy cập phân ẩn',
                'uuid' => '0888279011!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm phân quyền\nChức năng:\nMong muốn: BS sung phân quyền truy cập phân ẩn",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-07',
                'ended_at' => '2025-04-07',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung popup Thêm mới sự kiện',
                'uuid' => '0888279012!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Click nút Thêm mới\nChức năng:\nMong muốn: BS sung popup Thêm mới sự kiện",
                'status' => TaskStatus::DONE,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-08',
                'ended_at' => '2025-04-08',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng chỉnh sửa phân ẩn hàng loạt',
                'uuid' => '0888279013!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm tính năng chỉnh sửa hàng loạt\nChức năng:\nMong muốn: BS sung chỉnh sửa phân ẩn hàng loạt",
                'status' => TaskStatus::PENDING,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-09',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung giao diện chi tiết sự kiện',
                'uuid' => '0888279014!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Click vào sự kiện\nChức năng:\nMong muốn: BS sung giao diện chi tiết sự kiện",
                'status' => TaskStatus::DONE,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-10',
                'ended_at' => '2025-04-10',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng gửi email thông báo phân ẩn',
                'uuid' => '0888279015!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm nút gửi email\nChức năng:\nMong muốn: BS sung gửi email thông báo phân ẩn",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-11',
                'ended_at' => '2025-04-11',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung chức năng lọc sự kiện theo trạng thái',
                'uuid' => '0888279016!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Thêm bộ lọc trạng thái\nChức năng:\nMong muốn: BS sung lọc sự kiện theo trạng thái",
                'status' => TaskStatus::PENDING,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-12',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung popup Xác nhận sửa phân ẩn',
                'uuid' => '0888279017!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Click vào icon Sửa\nChức năng:\nMong muốn: BS sung popup Xác nhận sửa phân ẩn",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-13',
                'ended_at' => '2025-04-13',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung giao diện dashboard phân ẩn',
                'uuid' => '0888279018!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm dashboard\nChức năng:\nMong muốn: BS sung giao diện dashboard phân ẩn",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-14',
                'ended_at' => '2025-04-14',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung chức năng xuất PDF cho sự kiện',
                'uuid' => '0888279019!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Thêm nút xuất PDF\nChức năng:\nMong muốn: BS sung chức năng xuất PDF cho sự kiện",
                'status' => TaskStatus::PENDING,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-15',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng đồng bộ dữ liệu kiện nghị',
                'uuid' => '0888279020!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm nút đồng bộ\nChức năng:\nMong muốn: BS sung đồng bộ dữ liệu kiện nghị",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-16',
                'ended_at' => '2025-04-16',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung popup Xem chi tiết sự kiện',
                'uuid' => '0888279021!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Click vào sự kiện\nChức năng:\nMong muốn: BS sung popup Xem chi tiết sự kiện",
                'status' => TaskStatus::DONE,
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-17',
                'ended_at' => '2025-04-17',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng lưu lịch sử chỉnh sửa phân ẩn',
                'uuid' => '0888279022!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Lưu lịch sử chỉnh sửa\nChức năng:\nMong muốn: BS sung lưu lịch sử chỉnh sửa phân ẩn",
                'status' => TaskStatus::PENDING,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-18',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ],
            [
                'name' => 'BS sung giao diện báo cáo kiện nghị',
                'uuid' => '0888279023!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Phân ẩn, kiện nghị\nBước 4: Thêm tab báo cáo\nChức năng:\nMong muốn: BS sung giao diện báo cáo kiện nghị",
                'status' => TaskStatus::DONE,
                'feature' => 'Phân ẩn, kiện nghị',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-19',
                'ended_at' => '2025-04-19',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::MEDIUM
            ],
            [
                'name' => 'BS sung chức năng thông báo sự kiện sắp diễn ra',
                'uuid' => '0888279024!Demowd#2025',
                'description' => "Các bước thực hiện: \nBước 1: Vào link https://thepphanhanhat.coquan.vn/\nBước 2: Login IM khoản - Quản trị hệ thống\nBước 3: Truy cập menu Sự kiện\nBước 4: Thêm thông báo sự kiện\nChức năng:\nMong muốn: BS sung thông báo sự kiện sắp diễn ra",
                'status' => TaskStatus::PENDING, // Sửa từ PAUSING thành PENDING
                'feature' => 'Sự kiện',
                'designated_personnel_id' => random_int(1, 11),
                'designating_personnel_id' => random_int(1, 11),
                'status_changed_at' => '2025-04-20',
                'ended_at' => '2025-04-20',
                'project_id' => random_int(1,20),
                'priority' => TaskPriority::HIGH
            ]
        ];
        
        Project::insert($projects);
        User::insert($users);
        Task::insert($tasks);
        $allUserId = User::all()->pluck('id')->toArray();
        $allProject = Project::all();
        $allTasks = Task::all();
        foreach($allTasks as $p) {
            $p->created_at = now();
            $p->updated_at = now();
            $p->save();
        } 
        foreach($allProject as $p) {
            $p->personnel()->attach($allUserId);     
            $p->pm()->attach([1,2,3]);
            $p->created_at = now();
            $p->updated_at = now();
            $p->save();
        }      
        // Department::factory(10)->create();
        // $user = User::factory(100)->create()->pluck('id')->toArray();

        // $project = Project::factory(20)->create();
        // foreach ($project as $p) {
        //     $p->personnel()->attach([...$user]);
        //     $p->pm()->attach([1,2,3]);
        // }
        // Task::factory(20000)->create();
        Docs::factory(2000)->create();
    }
}
