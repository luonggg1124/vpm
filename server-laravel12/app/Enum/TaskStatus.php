<?php

namespace App\Enum;

enum TaskStatus: string
{
    case DONE     = 'DONE';
    case PENDING  = 'PENDING';
    case PAUSING = 'PAUSING';
    case OVERDUE  = 'OVERDUE';
    public function label(): string {
        return match($this) {
            self::DONE => 'Hoàn thành',
            self::PENDING => 'Đang xử lý',
            self::OVERDUE => 'Quá hạn',
            self::PAUSING => 'Tạm dừng'
        };
    }
}
