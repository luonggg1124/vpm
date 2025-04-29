<?php

namespace App\Enum;

enum ProjectStatus:string
{
    case WAITING     = 'WAITING';
    case REFUSE      = 'REFUSE';
    case DEVELOPING  = 'DEVELOPING';
    case PAUSING     = 'PAUSING';
    case DONE        = 'DONE';
    case FAILED      = 'FAILED';
    case CLOSE       = 'CLOSE';
}
