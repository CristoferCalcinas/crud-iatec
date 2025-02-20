# CRUD de Eventos con Next.js 14

Este proyecto es una aplicación de gestión de eventos que permite crear, leer, actualizar y eliminar eventos, así como manejar participantes y categorías.

## Requisitos Previos

- Node.js 18.17 o superior
- Docker y Docker Compose
- PostgreSQL (se provee mediante Docker)
- pnpm (recomendado) o npm

## Configuración Inicial

1. **Clonar el repositorio**:

```bash
git clone <repositorio>
cd crud
```

2. **Instalar dependencias**:

```bash
pnpm install --force
# o
npm install --force
```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto:

Para la generacion de la clave secreta puedes usar el siguiente comando:

```bash
npx auth secret
```

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
AUTH_SECRET="tu-secret-key"
```

4. **Iniciar la base de datos**:

```bash
docker-compose up -d
```

5. **Ejecutar migraciones**:

```bash
pnpm prisma migrate dev
# o
npx prisma migrate dev
```

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Características

- ✅ Autenticación con NextAuth.js
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ UI Components con shadcn/ui
- ✅ Gestión de eventos (CRUD)
- ✅ Filtrado de eventos por fecha
- ✅ Sistema de participantes
- ✅ Categorías de eventos

## Estructura del Proyecto

```
crud/
├── src/
│   ├── agenda/        # Lógica de negocio
│   ├── app/           # Rutas y páginas
│   └── components/    # Componentes reutilizables
├── prisma/           # Schema y migraciones
├── docker-compose.yml
└── README.md
```

## Solución de Problemas

### Error en la instalación de dependencias

Si encuentras errores al instalar las dependencias, usa el flag `--force`:

```bash
pnpm install --force
```

### Problemas con la base de datos

1. Asegúrate de que Docker está corriendo:

```bash
docker ps
```

2. Si necesitas reiniciar la base de datos:

```bash
docker-compose down
docker-compose up -d
```

3. Para reiniciar las migraciones:

```bash
pnpm prisma migrate reset
```

## Tecnologías Principales

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- shadcn/ui
- Docker

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request
