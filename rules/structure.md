# Reglas de estructura para módulos y componentes

Estas reglas aplican a todo lo que vive en `src/app/screens/modules/` (pantallas/features) y, con las mismas ideas, a `src/app/screens/components/` (componentes compartidos).

## Regla base: un módulo chico es una sola carpeta plana

Si el módulo es simple (una pantalla con poca lógica, como `home/`), alcanza con:

```text
modules/home/
├── index.jsx             # Componente de pantalla (export nombrado + default)
├── constants.js           # Datos estáticos propios del módulo
├── utils.js                # Helpers puros propios del módulo
└── styles.module.scss      # Estilos con CSS Modules
```

No crees carpetas `components/`, `hooks/` ni subcarpetas si el módulo no las necesita todavía. Una abstracción antes de que haga falta es peor que no tenerla.

## Cuándo desacoplar: la señal es el tamaño de `index.jsx`

Cuando un módulo crece (el caso típico es un login con formulario, validaciones, estados de carga/error, y dos o tres bloques visuales distintos), `index.jsx` deja de ser legible de un vistazo. Ahí se desacopla, no antes. Señales concretas de que es momento:

- `index.jsx` pasa de ~150-200 líneas.
- Hay secciones del JSX que se podrían extraer y nombrar (`<LoginForm />`, `<SocialLoginButtons />`) y el nombre ya te dice qué hacen.
- Hay lógica de estado/efectos que no es puramente de layout (manejo de formulario, llamadas a `services/`, validaciones).

## Estructura de un módulo grande

```text
modules/login/
├── index.jsx                      # Orquesta: compone los subcomponentes, no tiene JSX de detalle
├── constants.js                    # Textos no traducibles, opciones fijas, valores por defecto
├── utils.js                        # Validaciones, formateo, helpers puros sin estado
├── styles.module.scss              # Estilos del contenedor raíz del módulo
└── components/                     # Subcomponentes privados de ESTE módulo
    ├── index.js                      # Barrel: export * de cada subcomponente
    ├── LoginForm/
    │   ├── index.jsx
    │   └── styles.module.scss
    └── SocialLoginButtons/
        ├── index.jsx
        └── styles.module.scss
```

Reglas para `components/` dentro de un módulo:

- Son **privados del módulo**: solo `login/index.jsx` (o sus propios subcomponentes) los importa. Si otra pantalla necesita el mismo subcomponente, se promueve a `app/screens/components/` (ver más abajo) — no se importa cruzado entre módulos.
- Cada subcomponente sigue el mismo patrón plano (`index.jsx` + `styles.module.scss`, y `constants.js`/`utils.js` propios solo si ese subcomponente en particular los necesita).
- `components/index.js` del módulo re-exporta todos los subcomponentes, igual que hace `app/screens/modules/index.js` a nivel de pantallas.

## Cuándo promover a `app/screens/components/`

Si un subcomponente de módulo (o un patrón repetido en dos módulos distintos) se vuelve reutilizable, se mueve a `app/screens/components/<Nombre>/` y se exporta desde `app/screens/components/index.js`. A partir de ahí cualquier módulo lo puede importar. No se duplica el mismo componente en dos módulos "por las dudas" — se promueve la primera vez que hace falta en un segundo lugar, no antes (YAGNI).

## Dónde va cada cosa (resumen)

| Contenido | Ubicación |
|---|---|
| Componente de pantalla completo | `modules/<nombre>/index.jsx` |
| Subcomponente usado solo dentro de un módulo | `modules/<nombre>/components/<Subcomponente>/` |
| Componente compartido entre 2+ módulos | `app/screens/components/<Nombre>/` |
| Textos visibles al usuario | `src/i18n/locales/{es,en}.json` (vía `useTranslation`), nunca hardcodeados en JSX |
| Datos estáticos no traducibles (opciones, configuración) | `constants.js` del módulo/componente |
| Lógica pura sin estado (formateo, validación, cálculo) | `utils.js` del módulo/componente |
| Colores/tipografía reutilizables en props de componentes JS | `app/ui/` (espejo en JS de `styles/_variables.scss`) |
| Llamadas HTTP | `services/`, nunca directo desde un componente |
| Estado compartido entre módulos | slice en `redux/slices/`, nunca estado local duplicado |

## Ejemplo de referencia

`modules/home/` es el ejemplo vivo de un módulo simple (sin necesidad de `components/` todavía). Cuando se agregue el primer módulo que sí necesite desacoplar subcomponentes, seguir exactamente el patrón de `login/` descrito arriba.
