# Task Manager

Laravel API, React/Vite frontend, Sanctum SPA authentication, MySQL, and Docker Compose.

## Local / Windows

\`\`\`bash
docker compose up -d --build
\`\`\`

Open http://localhost:8080.

The browser uses one public origin. React calls /api/* and /sanctum/*; Laravel and MySQL remain internal Docker services.

## Ubuntu VM

\`\`\`bash
git clone <repository>
cd task-manager
cp backend/.env.example backend/.env
docker compose up -d --build
\`\`\`

The Laravel container generates the application key on first startup and runs normal migrations automatically. If preferred, run them explicitly:

\`\`\`bash
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
\`\`\`

Then open http://VM_IP:8080 from another machine.

## Useful commands

\`\`\`bash
docker compose ps
docker compose logs
docker compose logs -f
docker compose down
docker compose up -d --build
docker compose exec app php artisan route:list
\`\`\`

Do not use migrate:fresh; normal migrations preserve existing data.

## Authentication

The app uses Laravel Sanctum SPA authentication with session cookies and CSRF protection. It does not use JWTs or localStorage tokens.
