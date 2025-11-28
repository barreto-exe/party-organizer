# Party Organizer (React + Vite + Firebase)

Aplicación en React para organizar invitados y grupos de fotos de una fiesta, con sincronización en tiempo real usando Firebase Realtime Database. La UI es responsive con Bootstrap y está pensada para usarse desde móvil y escritorio.

## Características

- **Fiestas por código**:
	- Crea una fiesta nueva o únete ingresando un código alfanumérico de 6 caracteres.
	- El código identifica de forma única cada sesión en tiempo real.
- **Lista de invitados**:
	- Agrega invitados de forma individual o en lote (uno por línea).
- **Gestión de grupos**:
	- Crea grupos vacíos o a partir de una selección múltiple de invitados.
	- Asigna invitados a grupos existentes.
- **Dashboard en vivo**:
	- Check-in por invitado (al llegar se tacha el nombre).
	- Grupos se muestran en verde cuando todos sus miembros han llegado.
	- Marca “Foto tomada” para grupos listos.
- **Tiempo real**: Todos los cambios se sincronizan para todos los dispositivos conectados a la misma fiesta.
- **Responsive**: Layout centrado y fluido en pantallas grandes; navegación cómoda en móviles.

## Tecnologías

- `React` + `Vite`
- `Bootstrap` y `bootstrap-icons`
- `Firebase Realtime Database`

## Estructura de datos (Firebase)

```
parties/{PARTY_CODE}/
	guests/
		{guestId}: { name, arrived }
	groups/
		{groupId}: { name, memberIds: string[], photoTaken }
```

## Configuración (Variables de entorno)

1. Copia el archivo de ejemplo y completa tus valores de Firebase:
	 ```powershell
	 Copy-Item .env.example .env
	 ```
2. Edita `.env` y completa estas claves (todas comienzan con `VITE_` para que Vite las incluya en el build del cliente):
	 - `VITE_FIREBASE_API_KEY`
	 - `VITE_FIREBASE_AUTH_DOMAIN`
	 - `VITE_FIREBASE_DATABASE_URL`
	 - `VITE_FIREBASE_PROJECT_ID`
	 - `VITE_FIREBASE_STORAGE_BUCKET`
	 - `VITE_FIREBASE_MESSAGING_SENDER_ID`
	 - `VITE_FIREBASE_APP_ID`

> Nota: En apps cliente, estas claves quedan embebidas en el build. Controla acceso con **reglas** de Realtime Database, no ocultando las claves.

## Desarrollo

1. Instalar dependencias:
	 ```powershell
	 npm install
	 ```
2. Ejecutar en desarrollo:
	 ```powershell
	 npm run dev
	 ```
3. Construir para producción:
	 ```powershell
	 npm run build
	 ```

## Reglas de Realtime Database (ejemplo de prueba)

Para desarrollo rápido puedes usar reglas abiertas (no recomendado para producción):

```json
{
	"rules": {
		".read": true,
		".write": true
	}
}
```

Para producción, ajusta las reglas según tus necesidades (p. ej., limitar escritura/lectura por fiesta, agregar auth si más adelante la habilitas).

## Deploy en Firebase Hosting

### Manual (local)

Si haces el build y deploy desde tu PC, Vite leerá `.env` durante el build y los valores quedarán embebidos en `dist/`:

```powershell
npm run build
firebase deploy
```

### CI con GitHub Actions

Este repo incluye un workflow en `.github/workflows/firebase-hosting-merge.yml`. Para que el build en CI tenga las variables, agrega **Secrets** en GitHub (Settings → Secrets and variables → Actions):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_DATABASE_URL`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

El workflow ya exporta estas variables al paso `npm run build` para que Vite las reemplace en el build.

## Uso

- **Inicio**: Pantalla para crear o unirse a una fiesta ingresando el código.
- **Invitados**: Agrega individualmente o en lote (uno por línea).
- **Grupos**: Crea grupos vacíos o desde selección múltiple, y asigna invitados.
- **Dashboard**: Realiza el check-in, ve grupos listos (verde) y marca “Foto tomada”.

## Notas

- Sin autenticación de usuarios: el acceso se basa en conocer el código de la fiesta.
- Considera reglas de DB más estrictas si compartes públicamente el enlace.
