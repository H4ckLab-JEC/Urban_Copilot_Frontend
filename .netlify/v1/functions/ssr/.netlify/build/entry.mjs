import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_nMtq788J.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/events.astro.mjs');
const _page3 = () => import('./pages/api/recommendations.astro.mjs');
const _page4 = () => import('./pages/laboratorio.astro.mjs');
const _page5 = () => import('./pages/monitor.astro.mjs');
const _page6 = () => import('./pages/predicciones.astro.mjs');
const _page7 = () => import('./pages/reportes.astro.mjs');
const _page8 = () => import('./pages/rutas.astro.mjs');
const _page9 = () => import('./pages/tablero.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/events.ts", _page2],
    ["src/pages/api/recommendations.ts", _page3],
    ["src/pages/laboratorio.astro", _page4],
    ["src/pages/monitor.astro", _page5],
    ["src/pages/predicciones.astro", _page6],
    ["src/pages/reportes.astro", _page7],
    ["src/pages/rutas.astro", _page8],
    ["src/pages/tablero.astro", _page9],
    ["src/pages/index.astro", _page10]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "db952d69-a148-44bd-b67a-c54511a3ea8e"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
