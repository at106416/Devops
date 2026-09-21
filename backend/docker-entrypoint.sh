#!/bin/sh
set -eu

cd /var/www/html

if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ -z "${APP_KEY:-}" ] && grep -q '^APP_KEY=$' .env; then
    php artisan key:generate --force
fi

mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwX storage bootstrap/cache

echo "Waiting for MySQL..."

attempt=1
max_attempts=30

until php -r '
try {
    new PDO(
        "mysql:host=" . getenv("DB_HOST") . ";port=" . getenv("DB_PORT") . ";dbname=" . getenv("DB_DATABASE"),
        getenv("DB_USERNAME"),
        getenv("DB_PASSWORD")
    );
    exit(0);
} catch (Throwable $e) {
    exit(1);
}
'; do
    if [ "$attempt" -ge "$max_attempts" ]; then
        echo "MySQL did not become available after $max_attempts attempts."
        exit 1
    fi

    echo "MySQL not ready yet... attempt $attempt/$max_attempts"
    attempt=$((attempt + 1))
    sleep 2
done

echo "MySQL is ready."

php artisan migrate --force

exec php-fpm
