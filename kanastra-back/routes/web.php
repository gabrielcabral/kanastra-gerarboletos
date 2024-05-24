<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileProcessingController;

Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

Route::post('/upload', [FileProcessingController::class, 'uploadCsv']);
Route::get('/files', [FileProcessingController::class, 'index']);
