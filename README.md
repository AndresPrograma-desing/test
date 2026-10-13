# React + Vite Front-End Template

Plantilla base para proyectos frontend con React 19, Vite, React Router, Redux Toolkit, SCSS modular, Prettier, Axios y [anteriority-ui](https://github.com/AndresPrograma-desing/AnteriorityUI) como librería de componentes.

---

## 🤔 Por qué usar este template

- **Arranque inmediato**: routing, estado global, cliente HTTP y sistema de diseño ya cableados entre sí — el primer módulo que agregues sigue un patrón existente, no empieza de cero.
- **Un solo sistema de diseño en dos formatos**: los tokens de color y tipografía viven una vez en `styles/_variables.scss` (CSS) y se espejan en `app/ui` (JS) para los componentes de `anteriority-ui` que reciben colores por prop. No hay que elegir entre "estilos con SCSS" o "estilos con JS": se usan juntos, cada uno donde corresponde.
- **anteriority-ui en vez de HTML a mano**: badges, botones, callouts, cards y el catálogo de íconos de `react-icons`/`simple-icons` ya están disponibles — evita reconstruir componentes de UI que ya existen en la librería interna.
- **Convención sobre configuración**: cada pantalla nueva es una carpeta en `app/screens/modules/`, cada pieza de estado nueva es un slice en `redux/slices/`, cada llamada HTTP nueva pasa por `services/apiClient.js`. El README explica el patrón una vez; replicarlo es mecánico.

---

## 🚀 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build localmente
npm run preview

# Validar linting
npm run lint

# Corregir errores de linting automáticamente
npm run lint:fix

# Formatear el código con Prettier
npm run format

# Verificar formato con Prettier
npm run format:check
```

---

## 📁 Arquitectura del Proyecto

```text
src/
├── app/
│   ├── routes.js                  # Constantes de rutas (ROUTES.HOME, ...) usadas por App.jsx
│   ├── screens/
│   │   ├── modules/                # Una carpeta por pantalla/feature
│   │   │   ├── home/                # Ejemplo: módulo "home"
│   │   │   │   ├── index.jsx          # Componente de pantalla (export nombrado + default)
│   │   │   │   ├── constants.js       # Datos estáticos propios del módulo
│   │   │   │   ├── utils.js           # Helpers propios del módulo
│   │   │   │   └── styles.module.scss # Estilos con CSS Modules
│   │   │   └── index.js             # Barrel: re-exporta cada módulo para App.jsx
│   │   └── components/             # Componentes de vista compartidos entre módulos
│   │       └── index.js             # Barrel export
│   └── ui/                        # Espejo en JS de los design tokens (para props de componentes)
│       ├── color/paletter.js        # COLORS, LIGHT_THEME, DARK_THEME
│       ├── typography/typography.js # FONT_FAMILY, FONT_SIZE, FONT_WEIGHT
│       └── index.js                 # Barrel export
├── redux/                # Estado global con Redux Toolkit
│   ├── slices/           # Slices de ejemplo (themeSlice, authSlice, counterSlice) — ver nota abajo
│   ├── hooks.js          # useAppDispatch y useAppSelector
│   ├── store.js          # Configuración del store central
│   └── index.js          # Barrel export
├── services/             # Capa HTTP con Axios
│   ├── apiClient.js      # Instancia de Axios con interceptores de Request y Response
│   ├── authService.js    # Ejemplo de servicios de autenticación
│   ├── exampleService.js # Ejemplo de consumo de APIs REST
│   └── index.js          # Barrel export
├── styles/               # Sistema de diseño con SCSS (fuente de verdad en CSS)
│   ├── _variables.scss   # Tokens de diseño y variables CSS (Dark/Light mode)
│   ├── _mixins.scss      # Mixins de breakpoints, flexbox y glassmorphism
│   ├── _reset.scss       # Reseteo CSS moderno
│   ├── _typography.scss  # Escala tipográfica
│   ├── _utilities.scss   # Clases de utilidad y animaciones
│   └── index.scss        # Punto de entrada de estilos globales
├── App.jsx               # Define las rutas (<Routes>/<Route>) sobre los módulos de app/screens/modules
└── main.jsx              # Entrada de la app (Provider de Redux + BrowserRouter + App)
```

### Cómo agregar un módulo (pantalla) nuevo

1. Creá `src/app/screens/modules/<nombre>/index.jsx` con `export const <Nombre> = () => {...}` y un `export default`.
2. Agregá sus estilos en `<nombre>/styles.module.scss`, y `constants.js`/`utils.js` si el módulo los necesita (ver `home/` como referencia).
3. Exportalo en `src/app/screens/modules/index.js`: `export * from './<nombre>';`.
4. Agregá la ruta en `src/app/routes.js` (`ROUTES.<NOMBRE>`) y su `<Route>` en `src/App.jsx`.

Este es el único patrón a seguir — no hay routing implícito ni registro mágico de módulos.

### Nota sobre los slices de Redux

`themeSlice`, `authSlice` y `counterSlice` son **ejemplos de referencia**, no features activas: ningún componente los consume todavía. Muestran el patrón recomendado (selectors nombrados, `createAsyncThunk` para async, persistencia en `localStorage`) para cuando el proyecto necesite theming, autenticación o estado compartido real. Podés borrarlos o adaptarlos sin romper nada.

---

## 🧩 UI: anteriority-ui + design tokens

- **Componentes**: usá los componentes de `anteriority-ui` (`Button`, `Badge`, `Callout`, `Container`, `Frame`, `CopyText`, etc.) en vez de HTML plano — ya traen estilos, accesibilidad y variantes resueltas. Revisá `app/screens/modules/home/index.jsx` como ejemplo de uso real.
- **Íconos**: `anteriority-ui` reexporta todos los packs de `react-icons` (incluido `react-icons/si` = Simple Icons) bajo `common/icons`, pero también podés importar `react-icons/<pack>` directamente (p. ej. `react-icons/si`, `react-icons/fi`) — es una dependencia ya resuelta en `node_modules` vía `anteriority-ui`.
- **Colores y tipografía**: la fuente de verdad son las CSS custom properties de `styles/_variables.scss` (consumidas por SCSS Modules vía `var(--color-primary)`, etc.). `app/ui` espeja esos mismos valores como constantes JS (`COLORS`, `FONT_FAMILY`, ...) para los props de componentes que no aceptan `var(--...)` directamente (p. ej. `iconColor` de `Badge`, `bgColor` de `Callout`). Si cambiás un color del sistema, actualizalo en ambos lugares.
- Los colores de marca de tecnologías de terceros (React, Vite, Redux, etc. en `home/constants.js`) son los hex oficiales de cada marca — no deben reemplazarse por tokens del design system.

---

## 🛠️ Herramientas Configuradas

- **React Router (`react-router-dom`)**: rutas centralizadas en `app/routes.js`, declaradas en `App.jsx` con `<Routes>`/`<Route>`. `BrowserRouter` se monta una sola vez en `main.jsx`.
- **Redux Toolkit (`@reduxjs/toolkit` y `react-redux`)**: Store configurado con DevTools activados en desarrollo y hooks listos para usar (`useAppDispatch`, `useAppSelector`).
- **SCSS (`sass`)**: Sistema de estilos modular listo para importar y usar módulos SCSS (`.module.scss`).
- **Prettier (`.prettierrc`, `.prettierignore`)**: Reglas de formateo configuradas e integradas con ESLint mediante `eslint-config-prettier`.
- **Axios**: Cliente centralizado que inyecta automáticamente el token JWT en las peticiones y normaliza el manejo de respuestas y errores 401.
- **Path Alias**: Alias `@/` apuntando a `src/` configurado en `vite.config.js`.
