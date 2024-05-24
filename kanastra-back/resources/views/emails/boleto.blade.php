<!DOCTYPE html>
<html>

<head>
    <title>Seu Boleto</title>
</head>

<body>
    <h1>Olá, {{ $name }}</h1>
    <p>Seu boleto está disponível no seguinte link:</p>
    <p><a href="{{ $boletoUrl }}">Clique aqui para acessar seu boleto</a></p>
</body>

</html>
