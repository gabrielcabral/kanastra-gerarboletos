<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ProcessCsvJob;

class FileProcessingController extends Controller
{
    public function uploadCsv(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt'
        ]);

        $path = $request->file('file')->storeAs('', 'input2.csv');

        ProcessCsvJob::dispatch();

        return response()->json(['message' => 'Boletos gerados e e-mails enviados com sucesso']);
    }
}
