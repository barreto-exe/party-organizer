# Party Organizer (React + Vite)

Aplicación en React para organizar invitados y grupos de fotos durante una fiesta de cumpleaños. Incluye check-in, estado de grupos, y registro de foto tomada, con diseño responsive usando Bootstrap y persistencia en `localStorage`.

## Características

- **Lista de invitados**:
	- Agrega invitados de forma individual.
	- Agrega invitados en lote pegando texto (uno por línea).
- **Gestión de grupos**:
	- Crea grupos vacíos con nombre.
	- Asigna invitados a grupos existentes.
	- Crea un grupo nuevo seleccionando múltiples invitados mediante checkboxes.
- **Dashboard**:
	- Marca llegada de invitados (check-in) y los muestra con línea tachada.
	- Grupos se iluminan en verde cuando todos sus miembros han llegado.
	- Permite marcar “Foto tomada” para grupos listos.
- **Persistencia**: Guarda invitados y grupos en `localStorage` (sobrevive refrescos y cierres del navegador).
- **Responsive**: UI adaptada a móviles y centrada en pantallas grandes (máximo ancho del contenido y uso de Bootstrap).

## Tecnologías

- `React` + `Vite`
- `Bootstrap` y `bootstrap-icons`

## Inicio Rápido

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

## Uso

- **Navegación**: Usa los botones “Invitados”, “Grupos” y “Dashboard” (con iconos) en la barra superior.
- **Invitados**:
	- Agrega un invitado escribiendo su nombre y presionando “Agregar”.
	- Agrega en lote pegando una lista de nombres, uno por línea, y presionando “Agregar Lista”.
- **Grupos**:
	- Crea un grupo vacío indicando el nombre.
	- Asigna un invitado a un grupo desde los selects y “Asignar”.
	- Crea un grupo seleccionando varios invitados (checkboxes) y presionando “Crear Grupo”.
- **Dashboard**:
	- Marca llegada de cada invitado con el checkbox (se tacha el nombre).
	- Los grupos se ven en verde cuando todos sus miembros han llegado; puedes marcar “Foto tomada”.

## Persistencia de Datos

- Los datos de `Invitados` y `Grupos` se guardan automáticamente en `localStorage`.
- Claves utilizadas: `partyGuests` y `partyGroups`.
- Para resetear, limpia el almacenamiento del sitio desde el navegador (o borra las claves en la consola).

## Responsive y Diseño

- Contenido centrado con un ancho máximo de ~960px, fondo claro y tarjetas con sombra.
- Bootstrap y sus utilidades (`container`, `row`, `col`, `card`, `btn`, etc.) para una experiencia móvil fluida.
- Iconos con `bootstrap-icons` para mejorar la navegación.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo (Vite).
- `npm run build`: Genera la build de producción en `dist/`.

## Notas

- Este proyecto no requiere backend; todos los datos se manejan en el navegador.
- Si deseas exportar o importar datos, se puede añadir una funcionalidad de import/export JSON en futuras mejoras.
