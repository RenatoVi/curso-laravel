FROM php:8.2-fpm-alpine

ARG user
ARG uid

# Set timezone
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    apk del tzdata
##
RUN apk update \
    && apk upgrade \
    && apk add supervisor nginx

# Install the PHP pdo_pgsql extention
RUN apk add --no-cache postgresql-dev && \
    docker-php-ext-install pdo_pgsql

RUN docker-php-ext-install pcntl

RUN docker-php-ext-install intl

# Get latest Composer
COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

# supervisord
COPY ./configs/supervisord/supervisord.conf /etc/supervisord.conf

# nginx
COPY ./configs/nginx/nginx.conf /etc/nginx/nginx.conf

# cron
COPY ./configs/cron/crontab /etc/crontabs/root

RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

#Install NodeJs e npm
RUN apk add --update nodejs npm

RUN addgroup -g $uid $user
RUN adduser -G $user -u $uid -h /home/$user -D $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

RUN echo "alias a='php artisan'" >> /root/.bashrc

#USER $user

WORKDIR /var/www

CMD /usr/bin/supervisord -c /etc/supervisord.conf
