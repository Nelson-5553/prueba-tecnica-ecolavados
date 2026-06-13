# Gestión de Órdenes de Servicio de Transporte

## El reto

Construye una aplicación web para gestión de órdenes de servicio de transporte.

La aplicación debe permitir:

- Crear una orden con los siguientes datos: cliente, fecha, conductor asignado, estado inicial (Pendiente) y observaciones opcionales
- Listar todas las órdenes existentes con sus datos
- Editar una orden existente
- Cancelar una orden (cambiar su estado a Cancelado — no eliminar de la base de datos)
- Filtrar las órdenes por estado (Pendiente / En ruta / Entregado / Cancelado) o por conductor
- Persistir los datos en una base de datos — el motor es tu elección

Estados válidos de una orden: Pendiente → En ruta → Entregado. Cancelado puede activarse desde cualquier estado.

## Stack requerido

| Herramienta | Versión mínima         |
| ----------- | ---------------------- |
| PHP         | ^8.3                   |
| Composer    | 2.x                    |
| Node.js     | 18+                    |
| npm         | 9+                     |
| SQLite      | 3.x (incluido con PHP) |

No se requiere MySQL, PostgreSQL ni ningún motor externo. La aplicación usa SQLite por defecto.

## Instalación y despliegue local

```bash
# 1. Clonar el repositorio
git clone prueba-tecnica-ecolavados
cd prueba-tecnica-ecolavados

# 2. Copiar archivo .env
# El archivo .env.example ya está configurado para SQLite, funciona sin cambios.
cp .env.example .env

# 3. Instalar dependencias de PHP
composer install

# 4. Generar APP_KEY
php artisan key:generate

# 5. Crear la base de datos y ejecutar migraciones + seeders
touch database/database.sqlite
php artisan migrate --seed

# 6. Instalar dependencias de frontend y compilar assets
npm install
npm run build

# 7. Iniciar el servidor de desarrollo (PHP + Vite + Queue)
#    Ejecuta: php artisan serve, npm run dev y php artisan queue:listen
composer run dev
```

> **Alternativa rápida:** `composer run setup` ejecuta los pasos 3 al 6 automáticamente.

La aplicación estará disponible en `http://localhost:8000`.

## Ejecutar tests

```bash
# Todos los tests
php artisan test

# Tests con output compacto
php artisan test --compact

# Filtrar por grupo (Order o Employee)
php artisan test --compact --filter=Order
php artisan test --compact --filter=Employee

# Un test específico
php artisan test --compact --filter=test_can_create_order
```
