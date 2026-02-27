# Inspección rápida del repositorio

## Resumen general
- El repositorio contiene principalmente un backend Node.js/TypeScript en `hotel-pa/backend`.
- La API está construida con Express y expone recursos para:
  - `huespedes`
  - `habitaciones`
  - `reservas`
  - `paquetes`
- El arranque de la app ocurre en `src/app.ts`, escuchando en el puerto `3000`.

## Estructura relevante
- `hotel-pa/backend/src/app.ts`: configuración de Express y montaje de rutas.
- `hotel-pa/backend/src/routes/*.ts`: endpoints CRUD básicos en memoria.
- `hotel-pa/backend/src/models/*.ts`: clases/modelos de dominio hotelero.
- `hotel-pa/backend/src/ormconfig.ts`: configuración TypeORM para MySQL.
- `hotel-pa/backend/package.json`: scripts y dependencias.

## Hallazgos técnicos
1. **Persistencia inconsistente**
   - Hay configuración TypeORM + MySQL (`ormconfig.ts`), pero las rutas actualmente usan arreglos en memoria para simular base de datos.
   - Esto significa que los datos se pierden al reiniciar el servidor.

2. **Dependencias instaladas en el repo**
   - Existe `node_modules` dentro del repositorio, incluyendo múltiples archivos rastreados por Git.
   - Esto incrementa tamaño del repo y complejidad al versionar cambios.

3. **Riesgo de datos hardcodeados**
   - Credenciales/valores de conexión están en `ormconfig.ts` (`host`, `username`, `password`, `database`).
   - Recomendado migrar a variables de entorno.

## Comandos útiles
Desde `hotel-pa/backend`:
- Desarrollo: `npm run dev`
- Compilación: `npm run build`
- Ejecución compilada: `npm start`

## Recomendaciones prioritarias
1. Integrar rutas con repositorios TypeORM para persistencia real.
2. Excluir `node_modules` del control de versiones y mantener lockfile (`package-lock.json`).
3. Configurar `.env` + validación de variables de entorno para conexión DB.
4. Agregar pruebas de integración mínimas para endpoints críticos (reservas y habitaciones).
