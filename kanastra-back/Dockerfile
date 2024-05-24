# Use uma imagem oficial do PHP 8.2 como base
FROM php:8.2-apache

# Instale as dependências necessárias do PHP e do Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Instale o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configure o Apache para servir o Laravel na porta 9200
COPY . /var/www/html

# Exponha a porta 9200 para fora do contêiner
EXPOSE 9200

# Comando para instalar as dependências do Laravel e iniciar o Apache quando o contêiner for iniciado
CMD ["bash", "-c", "cd /var/www/html && composer install && php artisan key:generate && apache2-foreground"]
