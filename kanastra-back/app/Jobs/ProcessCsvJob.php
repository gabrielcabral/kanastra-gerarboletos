<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use League\Csv\Reader;
use App\Mail\SendBoletoMail;
use Mail;

class ProcessCsvJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle()
    {
        $path = base_path('input2.csv');
        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0);

        foreach ($csv as $record) {
            // Geração de boleto (simulada aqui)
            $boleto = $this->generateBoleto($record);

            // Envio de email
            Mail::to($record['email'])->send(new SendBoletoMail($record['name'], $boleto));
        }
    }

    private function generateBoleto($data)
    {
        // Simulação de geração de boleto
        return [
            'name' => $data['name'],
            'governmentId' => $data['governmentId'],
            'debtAmount' => $data['debtAmount'],
            'debtDueDate' => $data['debtDueDate'],
            'debtID' => $data['debtID'],
            'boletoUrl' => 'http://example.com/boleto/' . $data['debtID'],
        ];
    }
}
