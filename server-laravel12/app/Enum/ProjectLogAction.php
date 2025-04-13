<?php

namespace App\Enum;

enum ProjectLogAction:string
{
    case UPDATE_STATUS= "UPDATE_STATUS";
    case COMPLETE_TASK = "COMPLETE_TASK";
}
