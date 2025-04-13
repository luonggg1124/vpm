<?php

namespace App\Enum;

enum ProjectPriority: string
{
    case LOW = 'LOW';
    case MEDIUM = 'MEDIUM';
    case HIGH = 'HIGH';
    public function label(): string
    {
        return match ($this) {
            self::LOW => 'Thấp',
            self::MEDIUM => 'Trung bình',
            self::HIGH => 'Cao',
        };
    }
}
