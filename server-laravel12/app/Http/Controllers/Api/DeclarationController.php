<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Declaration\DeclarationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeclarationController extends Controller
{
    public function __construct(private DeclarationService $declarationService) {}
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->declarationService->all()
        ]);
    }
    public function getByType(Request $request)
    {
        return response()->json([
            'data' => $this->declarationService->getByType($request->query('type') ?? "PROJECT")
        ]);
    }
}
