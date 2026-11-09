# carlosperez-web

Nueva base de desarrollo independiente para carlosperez.cr.

## Arranque
Requiere Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
npm run build
```

## Estado
- Migrado de Create React App a Vite.
- Conservados: páginas, rutas, artículos, proyectos, charlas e i18n ES/EN.
- Eliminados: node_modules, historial Git del proyecto antiguo, Firebase cliente y artefactos CRA.
- Contacto provisional: abre el cliente de correo con `mailto:`. **No envía automáticamente**; implementar endpoint seguro antes de producción.
- Favicon anterior conservado como `public/favicon-legacy.svg` solo como referencia; el logo aprobado requiere vectorización exacta.
- Dominio de producción y CNAME **no incluidos** para evitar afectar el sitio actual.
- `BrowserRouter` requiere configurar fallback de rutas en el hosting; definir estrategia antes de publicar.
- El diseño visual aún es el heredado; siguiente fase: aplicar Brand Book.
- No se incluyeron credenciales ni configuraciones de Firebase.

## GitHub
Crear un repositorio nuevo vacío llamado `carlosperez-web` (no `.github.io`).
Desde esta carpeta:
```bash
git init
git add .
git commit -m "chore: bootstrap React Vite from existing portfolio"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/carlosperez-web.git
git push -u origin main
```
No configurar todavía el dominio `carlosperez.cr` en el nuevo repo.
