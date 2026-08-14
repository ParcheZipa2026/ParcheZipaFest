# PARCHE ZIPA FEST 2026
## Semana de la Juventud · Zipaquirá

---

## 🚀 Inicio Rápido

1. Abre `index.html` en tu navegador (o súbelo a GitHub Pages).
2. Edita `js/config.js` para configurar las URLs.
3. Edita `data/actividades.js` para actualizar actividades.

---

## 📁 Estructura de Archivos

```
/
├── index.html          ← Página principal
├── css/
│   └── main.css        ← Estilos completos (design system)
├── js/
│   ├── config.js       ← Configuración global (EDITAR AQUÍ)
│   └── main.js         ← Lógica principal
├── data/
│   └── actividades.js  ← Datos de actividades (EDITAR AQUÍ)
├── assets/             ← Imágenes y recursos
├── admin/
│   └── index.html      ← Panel administrativo (/admin)
└── README.md
```

---

## ⚙️ Configuración Principal (`js/config.js`)

| Variable | Descripción |
|---|---|
| `APPS_SCRIPT_URL` | URL del Google Apps Script para formularios |
| `VIDEO_URL` | URL embed del video oficial de YouTube |
| `INSTAGRAM_URL` | Enlace a Instagram oficial |
| `FACEBOOK_URL` | Enlace a Facebook oficial |
| `TIKTOK_URL` | Enlace a TikTok oficial |
| `YOUTUBE_URL` | Enlace a YouTube oficial |
| `EVENT_START_DATE` | Fecha del evento para la cuenta regresiva |

---

## 📋 Actualizar Actividades (`data/actividades.js`)

Cada actividad tiene esta estructura:

```javascript
{
  id: "mural-on",
  num: "01",
  name: "Mural On",
  fullName: "Concurso de Muralismo: Mural On",
  category: "arte",           // arte | gaming | emprendimiento | deporte | participacion | entretenimiento
  categoryLabel: "Arte & Cultura",
  date: "2026-09-18",
  dateDisplay: "18 SEP",
  time: "8:00 AM",           // Actualizar cuando esté definido
  location: "Parque Central", // Actualizar cuando esté definido
  description: "...",
  requirements: "...",
  targetAudience: "...",
  googleMapsUrl: "https://www.google.com/maps/embed?...",
  status: "open",            // open | upcoming | selection | voting | closed | finished
  registrationOpen: true,
  specialProcess: "mural-on", // null si no tiene proceso especial
  accentColor: "#60E35F",
  icon: "🎨",
}
```

---

## 🗳️ Procesos Especiales

### Mural On
- Fases en el array `phases` dentro de la actividad
- Cambiar `active: true` en la fase correspondiente
- En fase de votación: mostrar botón "VOTA EN NUESTRAS REDES"

### Colegios Con Flow
- Mismo sistema de fases que Mural On

### Level Up 2026 (Premios Juventud)
- Sistema de postulación → selección → finalistas → votación
- Votación: 1 por persona por categoría
- No mostrar estadísticas públicas

---

## 🔗 Google Sheets (Formularios)

1. Crear un Google Apps Script que reciba POST requests
2. El script guarda los datos en Google Sheets
3. Pegar la URL del script en `APPS_SCRIPT_URL` de `config.js`

Ejemplo básico de Apps Script:
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById('TU_SHEET_ID').getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.actividad,
    data.primerNombre,
    data.primerApellido,
    data.documento,
    data.correo,
    data.telefono,
    data.edad,
    data.genero,
    data.autorizaDatos,
    data.autorizaImagen,
  ]);
  return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 🌐 Despliegue en GitHub Pages

1. Sube todos los archivos a un repositorio GitHub
2. Ve a Settings → Pages
3. Branch: `main`, Folder: `/ (root)`
4. Tu sitio estará en: `https://tu-usuario.github.io/parche-zipa-fest`

---

## 🔐 Panel Admin

URL: `/admin/index.html`

- **NO** está enlazado desde ningún menú público
- Contraseña por defecto: `parchezipa2026admin`
- **CAMBIAR** la contraseña en producción
- Para producción: implementar autenticación real

---

## 📦 Dependencias

- **Ninguna** — puro HTML, CSS y JavaScript vanilla
- Fuentes: Google Fonts (Anton, Barlow Condensed, Space Grotesk)
- Sin frameworks, sin build tools necesarios

---

*Programa de Juventudes · Secretaría de Familia y Desarrollo Social · Alcaldía de Zipaquirá*
