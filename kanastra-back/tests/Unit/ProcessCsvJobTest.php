<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Jobs\ProcessCsvJob;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendBoletoMail;
use Illuminate\Support\Facades\Queue;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProcessCsvJobTest extends TestCase
{
    use RefreshDatabase;

    public function testProcessCsvJob()
    {
        Mail::fake();
        Queue::fake();

        // Disparar o Job
        ProcessCsvJob::dispatch();

        Queue::assertPushed(ProcessCsvJob::class, 1);

        Mail::assertSent(SendBoletoMail::class, function ($mail) {
            return $mail->hasTo('test@example.com');  // Adapte para seu teste
        });
    }
}
