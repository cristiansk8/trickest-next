# Scripts de Base de Datos

## Seed Principal

El archivo `prisma/seed.ts` crea todos los datos de prueba necesarios:

### Ejecutar seed completo:
```bash
npm run seed
```

Esto creará:
- ✅ 1 Admin
- ✅ 3 Jueces
- ✅ 5 Skaters de prueba
- ✅ 11 Challenges (10 niveles + 1 bonus)
- ✅ 5 Submissions pendientes para evaluar

### Credenciales creadas:

**Admin/Jueces:**
- admin@trickest.com (Admin)
- judge1@trickest.com (Juez - Carlos Ramírez)
- judge2@trickest.com (Juez - María González)
- judge3@trickest.com (Juez - Pedro Torres)

**Skaters:**
- skater1@trickest.com (@tony_hawk_jr - Antonio Rodríguez)
- skater2@trickest.com (@street_rider - Laura Martínez)
- skater3@trickest.com (@flip_master - Diego Santos)
- skater4@trickest.com (@gnar_shredder - Sofía Gómez)
- skater5@trickest.com (@vert_legend - Miguel Ángel Ruiz)

**Contraseña para todos:** `password123`

---

## Migrar usernames (IMPORTANTE si tienes usuarios sin username)

Si tienes usuarios existentes que fueron creados antes de la implementación de auto-generación de usernames, necesitas ejecutar este script:

```bash
node scripts/migrate-usernames.js
```

Este script:
- ✅ Busca usuarios sin username asignado
- ✅ Genera usernames únicos automáticamente
- ✅ Actualiza la base de datos
- ✅ Muestra progreso detallado

**¿Cuándo ejecutarlo?**
- Después de actualizar a la versión con auto-generación de usernames
- Si los usuarios no pueden ver challenges
- Si aparece error "No autenticado" al acceder a submissions

---

## Agregar más submissions (standalone)

Si necesitas agregar más submissions de prueba después del seed:

### Para un usuario específico:
```bash
node scripts/add-test-submissions.js <username>
```

Ejemplo:
```bash
# Crear 5 submissions para el usuario tony_hawk_jr
node scripts/add-test-submissions.js tony_hawk_jr
```

### Para múltiples skaters:
```bash
# Sin argumentos, crea 1 submission por skater
node scripts/add-test-submissions.js
```

El script:
- ✅ Verifica que no existan submissions duplicadas
- ✅ Crea submissions con videos reales de YouTube
- ✅ Asigna fechas aleatorias de los últimos 7 días
- ✅ Muestra el progreso detallado

**Importante:** Si especificas un username, creará 5 submissions para ese usuario específicamente. Esto es útil cuando quieres probar cómo se ve el dashboard de submissions de un skater en particular.

---

## Verificar datos

Para verificar la conexión y datos en la base de datos:

```bash
npx prisma studio
```

Esto abrirá una interfaz web donde puedes ver y editar todos los datos.

---

## Submissions de prueba creadas

Las submissions creadas incluyen videos reales de YouTube de trucos:

1. **Ollie** - Antonio Rodríguez (@tony_hawk_jr)
2. **Kickflip** - Laura Martínez (@street_rider)
3. **Pop Shove-it** - Diego Santos (@flip_master)
4. **Heelflip** - Sofía Gómez (@gnar_shredder)
5. **Varial Kickflip** - Miguel Ángel Ruiz (@vert_legend)

Todas están en estado `pending` listas para ser evaluadas por los jueces.

---

## Acceder al dashboard de jueces

1. Inicia sesión con alguna cuenta de juez (ej: judge1@trickest.com)
2. Ve a `/dashboard/judges/evaluate`
3. Verás las 5 submissions pendientes
4. Evalúa cada una asignando score (0-100) y feedback
