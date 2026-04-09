import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_DXssHrC_.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/leonelmendiola/Urban_Copilot_Frontend/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/events","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/events\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/events.ts","pathname":"/api/events","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/recommendations","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/recommendations\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"recommendations","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/recommendations.ts","pathname":"/api/recommendations","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"},{"type":"inline","content":".custom-scrollbar[data-astro-cid-hkky7lif]::-webkit-scrollbar{width:4px}.custom-scrollbar[data-astro-cid-hkky7lif]::-webkit-scrollbar-track{background:transparent}.custom-scrollbar[data-astro-cid-hkky7lif]::-webkit-scrollbar-thumb{background:#334155;border-radius:10px}\n"}],"routeData":{"route":"/laboratorio","isIndex":false,"type":"page","pattern":"^\\/laboratorio\\/?$","segments":[[{"content":"laboratorio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/laboratorio.astro","pathname":"/laboratorio","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"},{"type":"inline","content":".leaflet-popup-content-wrapper[data-astro-cid-ou3ajuke]{background:#0f172ae6;border:1px solid rgba(56,189,248,.3);color:#e2e8f0;border-radius:8px}.leaflet-popup-tip[data-astro-cid-ou3ajuke]{background:#0f172ae6}.leaflet-tooltip[data-astro-cid-ou3ajuke].custom-tooltip{background:#030712d9;border:1px solid rgba(56,189,248,.5);color:#e2e8f0;border-radius:6px;font-family:Outfit,sans-serif;font-weight:500;font-size:.85rem;padding:4px 8px;box-shadow:0 0 10px #38bdf833;backdrop-filter:blur(4px);white-space:nowrap}.leaflet-tooltip[data-astro-cid-ou3ajuke].custom-tooltip:before{border-top-color:#38bdf880}\n"}],"routeData":{"route":"/monitor","isIndex":false,"type":"page","pattern":"^\\/monitor\\/?$","segments":[[{"content":"monitor","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/monitor.astro","pathname":"/monitor","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"},{"type":"inline","content":".titulo-copiloto[data-astro-cid-ra3dqpph]{background:linear-gradient(to right,#93c5fd,#a5f3fc,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.autocomplete-list[data-astro-cid-ra3dqpph]{position:absolute;top:100%;left:0;width:100%;max-height:250px;background:#0f172a;border:1px solid #334155;border-radius:.5rem;overflow-y:auto;z-index:50;margin-top:.5rem}.autocomplete-item[data-astro-cid-ra3dqpph]{padding:.75rem 1rem;cursor:pointer;border-bottom:1px solid #1e293b;color:#cbd5e1;font-size:.875rem;display:flex;justify-content:space-between}.autocomplete-item[data-astro-cid-ra3dqpph]:hover{background:#1e293b;color:#38bdf8}.autocomplete-item[data-astro-cid-ra3dqpph] .badge[data-astro-cid-ra3dqpph]{font-size:10px;padding:2px 6px;border-radius:4px;background:#ffffff1a}.custom-tooltip[data-astro-cid-ra3dqpph]{background:#0f172ae6;border:1px solid rgba(56,189,248,.5);color:#fff;padding:4px 8px;border-radius:4px;font-size:12px}\n"}],"routeData":{"route":"/predicciones","isIndex":false,"type":"page","pattern":"^\\/predicciones\\/?$","segments":[[{"content":"predicciones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/predicciones.astro","pathname":"/predicciones","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"},{"type":"inline","content":".chip[data-astro-cid-hdplutls]{cursor:pointer;border-radius:9999px;border-width:1px;border-color:#6366f14d;background-color:#6366f11a;padding:.25rem .75rem;font-size:10px;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.chip[data-astro-cid-hdplutls]:hover{background-color:#60a5fa4d}.custom-scrollbar[data-astro-cid-hdplutls]::-webkit-scrollbar{width:4px}.custom-scrollbar[data-astro-cid-hdplutls]::-webkit-scrollbar-track{background:transparent}.custom-scrollbar[data-astro-cid-hdplutls]::-webkit-scrollbar-thumb{background:#1e293b;border-radius:10px}.mic-active[data-astro-cid-hdplutls]{color:#10b981!important;animation:pulse 1.5s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}to{transform:scale(1)}}\n"}],"routeData":{"route":"/reportes","isIndex":false,"type":"page","pattern":"^\\/reportes\\/?$","segments":[[{"content":"reportes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reportes.astro","pathname":"/reportes","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"},{"type":"inline","content":".leaflet-popup-content-wrapper[data-astro-cid-l6oo6qk4]{background:#0f172a!important;color:#fff!important;border:1px solid #334155}.leaflet-popup-tip[data-astro-cid-l6oo6qk4]{background:#0f172a!important}\n"}],"routeData":{"route":"/rutas","isIndex":false,"type":"page","pattern":"^\\/rutas\\/?$","segments":[[{"content":"rutas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rutas.astro","pathname":"/rutas","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"},{"type":"inline","content":".animate-fadeIn[data-astro-cid-3cnlknit]{animation:fadeIn .4s ease-out}.animate-slideUp[data-astro-cid-3cnlknit]{animation:slideUp .4s ease-out}.animate-slideLeft[data-astro-cid-3cnlknit]{animation:slideLeft .4s ease-out}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes slideLeft{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}.incident-pulse[data-astro-cid-3cnlknit]{animation:marker-pulse 1.5s infinite}@keyframes marker-pulse{0%{r:10;opacity:1;stroke-width:2}50%{r:15;opacity:.5;stroke-width:1}to{r:20;opacity:0;stroke-width:.5}}.custom-tooltip[data-astro-cid-3cnlknit]{background:#0f172ae6!important;border:1px solid rgba(255,255,255,.1)!important;color:#fff!important;font-size:10px!important;font-weight:700!important;border-radius:6px!important;padding:2px 6px!important}\n"}],"routeData":{"route":"/tablero","isIndex":false,"type":"page","pattern":"^\\/tablero\\/?$","segments":[[{"content":"tablero","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tablero.astro","pathname":"/tablero","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChbYrf4p.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/laboratorio.astro",{"propagation":"none","containsHead":true}],["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/monitor.astro",{"propagation":"none","containsHead":true}],["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/predicciones.astro",{"propagation":"none","containsHead":true}],["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/reportes.astro",{"propagation":"none","containsHead":true}],["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/rutas.astro",{"propagation":"none","containsHead":true}],["/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/tablero.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/events@_@ts":"pages/api/events.astro.mjs","\u0000@astro-page:src/pages/api/recommendations@_@ts":"pages/api/recommendations.astro.mjs","\u0000@astro-page:src/pages/laboratorio@_@astro":"pages/laboratorio.astro.mjs","\u0000@astro-page:src/pages/monitor@_@astro":"pages/monitor.astro.mjs","\u0000@astro-page:src/pages/predicciones@_@astro":"pages/predicciones.astro.mjs","\u0000@astro-page:src/pages/reportes@_@astro":"pages/reportes.astro.mjs","\u0000@astro-page:src/pages/rutas@_@astro":"pages/rutas.astro.mjs","\u0000@astro-page:src/pages/tablero@_@astro":"pages/tablero.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_nMtq788J.mjs","@astrojs/react/client.js":"_astro/client.uNJO8lcC.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.ChbYrf4p.css","/leaflet.css","/leaflet.js","/_astro/client.uNJO8lcC.js","/data/cablebus_lines_normalized.geojson","/data/cablebus_stations_normalized.geojson","/data/cdmx_streets.geojson","/data/ecobici_stations_normalized.geojson","/data/metro_lines_normalized.geojson","/data/metro_stations_normalized.geojson","/data/metrobus_lines_normalized.geojson","/data/metrobus_stations_normalized.geojson","/data/rtp_lines_normalized.geojson","/data/rtp_stations_normalized.geojson","/data/tren_ligero_lines_normalized.geojson","/data/tren_ligero_stations_normalized.geojson","/data/trolebus_lines_normalized.geojson","/data/trolebus_stations_normalized.geojson"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"QILeJyFfHDVwD45HZ2m0A3fLsO9k2Y5aQ5t4Ym4exmM=","experimentalEnvGetSecretEnabled":false});

export { manifest };
