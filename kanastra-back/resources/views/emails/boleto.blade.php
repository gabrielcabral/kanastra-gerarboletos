<!DOCTYPE html>
<html>

<head>
    <title>Seu Boleto</title>
</head>

<body>
    <h1>Ol�, {{ $name }}</h1>
    <p>Seu boleto est� dispon�vel no seguinte link:</p>
    <p><a href="{{ $boletoUrl }}">Clique aqui para acessar seu boleto</a></p>
</body>

</html>
