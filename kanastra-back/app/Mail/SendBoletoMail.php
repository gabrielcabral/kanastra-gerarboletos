<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendBoletoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $boleto;

    public function __construct($name, $boleto)
    {
        $this->name = $name;
        $this->boleto = $boleto;
    }

    public function build()
    {
        return $this->view('emails.boleto')
            ->subject('Seu Boleto')
            ->with([
                'name' => $this->name,
                'boletoUrl' => $this->boleto['boletoUrl'],
            ]);
    }
}
