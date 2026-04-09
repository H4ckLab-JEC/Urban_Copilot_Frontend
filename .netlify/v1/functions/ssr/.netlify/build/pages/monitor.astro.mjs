/* empty css                                 */
import { f as createComponent, j as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_DXssHrC_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DEmLSqtz.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Monitor = createComponent(($$result, $$props, $$slots) => {
  const transports = [
    { id: "metro", name: "Metro", color: "#f97316", hexBorder: "border-orange-500", hexBg: "bg-orange-500", lines: true, stations: true },
    { id: "metrobus", name: "Metrob\xFAs", color: "#ef4444", hexBorder: "border-red-500", hexBg: "bg-red-500", lines: true, stations: true },
    { id: "cablebus", name: "Cableb\xFAs", color: "#06b6d4", hexBorder: "border-cyan-500", hexBg: "bg-cyan-500", lines: true, stations: true },
    { id: "trolebus", name: "Troleb\xFAs", color: "#3b82f6", hexBorder: "border-blue-500", hexBg: "bg-blue-500", lines: true, stations: true },
    { id: "tren_ligero", name: "Tren Ligero", color: "#a855f7", hexBorder: "border-purple-500", hexBg: "bg-purple-500", lines: true, stations: true },
    { id: "rtp", name: "RTP", color: "#10b981", hexBorder: "border-emerald-500", hexBg: "bg-emerald-500", lines: true, stations: true },
    { id: "ecobici", name: "Ecobici", color: "#84cc16", hexBorder: "border-lime-500", hexBg: "bg-lime-500", lines: false, stations: true }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Monitor CDMX", "data-astro-cid-ou3ajuke": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="relative flex flex-col h-screen w-full pt-16" data-astro-cid-ou3ajuke> <!-- Navbar superpuesta --> <div class="absolute top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-slate-900/40 backdrop-blur-md border-b border-blue-500/20" data-astro-cid-ou3ajuke> <h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300" data-astro-cid-ou3ajuke>\nMonitor CDMX Live\n</h1> <a href="/" class="px-4 py-2 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 border border-blue-400/40 rounded shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all" data-astro-cid-ou3ajuke>\nVolver\n</a> </div> <!-- Men\xFA Desplegable: Controles de Transporte --> <div class="absolute top-24 left-6 z-50" data-astro-cid-ou3ajuke> <button id="dropdown-button" type="button" class="flex items-center gap-2 rounded-xl bg-[#0B1736]/90 backdrop-blur-xl border border-blue-500/30 px-5 py-3 text-sm font-bold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:bg-[#112350] transition-all" data-astro-cid-ou3ajuke> <svg class="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-ou3ajuke> <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-ou3ajuke></path> </svg>\nMAPA DE TRANSPORTES\n<svg id="dropdown-icon" class="h-4 w-4 text-cyan-500 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-ou3ajuke> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-astro-cid-ou3ajuke></path> </svg> </button> <!-- Panel Desplegable --> <div id="dropdown-menu" class="hidden mt-3 bg-[#0B1736]/90 backdrop-blur-xl border border-blue-500/30 p-4 rounded-xl shadow-2xl flex-col gap-2 w-[240px] transition-all transform origin-top-left" data-astro-cid-ou3ajuke> <!-- Generar Botones Din\xE1micamente --> ', ` <p class="text-[10px] text-slate-400 mt-2 pt-2 border-t border-blue-500/20 text-center" data-astro-cid-ou3ajuke>Haz clic para encender o apagar la capa.</p> </div> </div> <!-- Contenedor del Mapa --> <div id="map" class="flex-1 w-full z-10" data-astro-cid-ou3ajuke></div> </main> <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"> <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script> <script>
    document.addEventListener('DOMContentLoaded', () => {
      // L\xF3gica del Dropdown
      const dropdownBtn = document.getElementById('dropdown-button');
      const dropdownMenu = document.getElementById('dropdown-menu');
      const dropdownIcon = document.getElementById('dropdown-icon');
      
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
        dropdownMenu.classList.toggle('flex');
        if (dropdownMenu.classList.contains('hidden')) {
          dropdownIcon.style.transform = 'rotate(0deg)';
        } else {
          dropdownIcon.style.transform = 'rotate(180deg)';
        }
      });
      document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !dropdownBtn.contains(e.target) && !dropdownMenu.classList.contains('hidden')) {
          dropdownMenu.classList.add('hidden');
          dropdownMenu.classList.remove('flex');
          dropdownIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Inicializar el mapa
      const map = L.map('map', { zoomControl: false }).setView([19.427, -99.1676], 12);
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Fondo Neo-Oscuro CartoDB
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Almacenamiento de capas { 'metro': LayerGroup, 'cablebus': LayerGroup... }
      const layers = {};

      // Obtener todos los botones
      const toggleButtons = document.querySelectorAll('.transport-toggle');

      toggleButtons.forEach(btn => {
        const id = btn.getAttribute('data-transport');
        const color = btn.getAttribute('data-color');
        const hasLines = btn.getAttribute('data-lines') === 'true';
        const hasStations = btn.getAttribute('data-stations') === 'true';
        const dot = btn.querySelector('.indicator-dot');

        // Crear el grupo de capas para este transporte
        const transportLayer = L.layerGroup();
        layers[id] = transportLayer;

        // Configuramos la paleta espec\xEDfica si es el Metro
        const metroColors = {
          "1": "#F54A91",
          "2": "#0055A5",
          "3": "#B0A32A",
          "4": "#68BCA2",
          "5": "#FBD100",
          "6": "#DA291C",
          "7": "#E36B2C",
          "8": "#00A94F",
          "9": "#56382D",
          "A": "#8D2587",
          "B": "#007460",
          "12": "#B69E52",
        };

        const metrobusColors = {
          "1": "#B72025",
          "2": "#862B88",
          "3": "#75BF2A",
          "4": "#E17719",
          "5": "#00366D",
          "6": "#CA2973",
          "7": "#008149"
        };

        const getFeatureColor = (feature) => {
          let featureColor = color; // Color por defecto (ej. azul para trolebus)
          if (id === 'metro' && feature.properties && feature.properties.LINEA) {
            let numLinea = feature.properties.LINEA.toString().toUpperCase();
            if (numLinea.startsWith("0") && numLinea.length === 2) numLinea = numLinea.substring(1);
            featureColor = metroColors[numLinea] || color;
          } else if (id === 'metrobus' && feature.properties && feature.properties.LINEA) {
            let numLinea = feature.properties.LINEA.toString().toUpperCase();
            if (numLinea.startsWith("0") && numLinea.length === 2) numLinea = numLinea.substring(1);
            featureColor = metrobusColors[numLinea] || color;
          }
          return featureColor;
        };

        // Funci\xF3n para cargar GeoJSON si existe
        const loadGeoJson = (url, isPoint) => {
          fetch(url)
            .then(res => { if(res.ok) return res.json(); else throw new Error('No '+url); })
            .then(data => {
              L.geoJSON(data, {
                style: isPoint ? null : (feature) => {
                  const featColor = getFeatureColor(feature);
                  return {
                    color: featColor,
                    weight: 4,
                    opacity: 0.8
                  };
                },
                pointToLayer: isPoint ? (feature, latlng) => {
                  const featColor = getFeatureColor(feature);
                  const stStyle = {
                    radius: id === 'ecobici' ? 2 : 4, // Ecobici tiene muchas, hacerlas chicas
                    fillColor: featColor,
                    color: '#fff',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.9
                  };
                  const m = L.circleMarker(latlng, stStyle);
                  if (feature.properties) {
                    const name = feature.properties.NOMBRE || feature.properties.nombre || feature.properties.Name || feature.properties.name || feature.properties.calle_prin || feature.properties.INSTERSECC;
                    if (name) {
                      m.bindTooltip(name, {
                        direction: 'top',
                        className: 'custom-tooltip',
                        offset: [0, -5]
                      });
                      m.bindPopup(\`<strong style="color:\${featColor}">\${name}</strong>\`);
                    }
                  }
                  return m;
                } : null
              }).addTo(transportLayer);
            })
            .catch(console.warn);
        };

        // Solicitar datos
        if (hasLines) loadGeoJson(\`/data/\${id}_lines_normalized.geojson\`, false);
        if (hasStations) loadGeoJson(\`/data/\${id}_stations_normalized.geojson\`, true);

        // Estado inicial apagado (excepto Metro)
        let isActive = id === 'metro';
        
        const updateUI = () => {
          if (isActive) {
            map.addLayer(transportLayer);
            btn.classList.add('bg-slate-700/80', 'border-cyan-500/50', 'shadow-[0_0_15px_rgba(0,0,0,0.3)]');
            btn.classList.remove('bg-slate-800/30', 'border-slate-700/50');
            dot.classList.remove('opacity-50', 'shadow-none');
            dot.style.boxShadow = \`0 0 10px \${color}, 0 0 20px \${color}\`;
            dot.style.opacity = '1';
          } else {
            map.removeLayer(transportLayer);
            btn.classList.remove('bg-slate-700/80', 'border-cyan-500/50', 'shadow-[0_0_15px_rgba(0,0,0,0.3)]');
            btn.classList.add('bg-slate-800/30', 'border-slate-700/50');
            dot.classList.add('opacity-50', 'shadow-none');
            dot.style.boxShadow = 'none';
            dot.style.opacity = '0.5';
          }
        };

        // Click Event
        btn.addEventListener('click', () => {
          isActive = !isActive;
          updateUI();
        });

        // Configurar estado inicial
        updateUI();
      });
    });
  <\/script>  `], [" ", '<main class="relative flex flex-col h-screen w-full pt-16" data-astro-cid-ou3ajuke> <!-- Navbar superpuesta --> <div class="absolute top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-slate-900/40 backdrop-blur-md border-b border-blue-500/20" data-astro-cid-ou3ajuke> <h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300" data-astro-cid-ou3ajuke>\nMonitor CDMX Live\n</h1> <a href="/" class="px-4 py-2 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 border border-blue-400/40 rounded shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all" data-astro-cid-ou3ajuke>\nVolver\n</a> </div> <!-- Men\xFA Desplegable: Controles de Transporte --> <div class="absolute top-24 left-6 z-50" data-astro-cid-ou3ajuke> <button id="dropdown-button" type="button" class="flex items-center gap-2 rounded-xl bg-[#0B1736]/90 backdrop-blur-xl border border-blue-500/30 px-5 py-3 text-sm font-bold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:bg-[#112350] transition-all" data-astro-cid-ou3ajuke> <svg class="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-ou3ajuke> <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-ou3ajuke></path> </svg>\nMAPA DE TRANSPORTES\n<svg id="dropdown-icon" class="h-4 w-4 text-cyan-500 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-ou3ajuke> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-astro-cid-ou3ajuke></path> </svg> </button> <!-- Panel Desplegable --> <div id="dropdown-menu" class="hidden mt-3 bg-[#0B1736]/90 backdrop-blur-xl border border-blue-500/30 p-4 rounded-xl shadow-2xl flex-col gap-2 w-[240px] transition-all transform origin-top-left" data-astro-cid-ou3ajuke> <!-- Generar Botones Din\xE1micamente --> ', ` <p class="text-[10px] text-slate-400 mt-2 pt-2 border-t border-blue-500/20 text-center" data-astro-cid-ou3ajuke>Haz clic para encender o apagar la capa.</p> </div> </div> <!-- Contenedor del Mapa --> <div id="map" class="flex-1 w-full z-10" data-astro-cid-ou3ajuke></div> </main> <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"> <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script> <script>
    document.addEventListener('DOMContentLoaded', () => {
      // L\xF3gica del Dropdown
      const dropdownBtn = document.getElementById('dropdown-button');
      const dropdownMenu = document.getElementById('dropdown-menu');
      const dropdownIcon = document.getElementById('dropdown-icon');
      
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
        dropdownMenu.classList.toggle('flex');
        if (dropdownMenu.classList.contains('hidden')) {
          dropdownIcon.style.transform = 'rotate(0deg)';
        } else {
          dropdownIcon.style.transform = 'rotate(180deg)';
        }
      });
      document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !dropdownBtn.contains(e.target) && !dropdownMenu.classList.contains('hidden')) {
          dropdownMenu.classList.add('hidden');
          dropdownMenu.classList.remove('flex');
          dropdownIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Inicializar el mapa
      const map = L.map('map', { zoomControl: false }).setView([19.427, -99.1676], 12);
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Fondo Neo-Oscuro CartoDB
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Almacenamiento de capas { 'metro': LayerGroup, 'cablebus': LayerGroup... }
      const layers = {};

      // Obtener todos los botones
      const toggleButtons = document.querySelectorAll('.transport-toggle');

      toggleButtons.forEach(btn => {
        const id = btn.getAttribute('data-transport');
        const color = btn.getAttribute('data-color');
        const hasLines = btn.getAttribute('data-lines') === 'true';
        const hasStations = btn.getAttribute('data-stations') === 'true';
        const dot = btn.querySelector('.indicator-dot');

        // Crear el grupo de capas para este transporte
        const transportLayer = L.layerGroup();
        layers[id] = transportLayer;

        // Configuramos la paleta espec\xEDfica si es el Metro
        const metroColors = {
          "1": "#F54A91",
          "2": "#0055A5",
          "3": "#B0A32A",
          "4": "#68BCA2",
          "5": "#FBD100",
          "6": "#DA291C",
          "7": "#E36B2C",
          "8": "#00A94F",
          "9": "#56382D",
          "A": "#8D2587",
          "B": "#007460",
          "12": "#B69E52",
        };

        const metrobusColors = {
          "1": "#B72025",
          "2": "#862B88",
          "3": "#75BF2A",
          "4": "#E17719",
          "5": "#00366D",
          "6": "#CA2973",
          "7": "#008149"
        };

        const getFeatureColor = (feature) => {
          let featureColor = color; // Color por defecto (ej. azul para trolebus)
          if (id === 'metro' && feature.properties && feature.properties.LINEA) {
            let numLinea = feature.properties.LINEA.toString().toUpperCase();
            if (numLinea.startsWith("0") && numLinea.length === 2) numLinea = numLinea.substring(1);
            featureColor = metroColors[numLinea] || color;
          } else if (id === 'metrobus' && feature.properties && feature.properties.LINEA) {
            let numLinea = feature.properties.LINEA.toString().toUpperCase();
            if (numLinea.startsWith("0") && numLinea.length === 2) numLinea = numLinea.substring(1);
            featureColor = metrobusColors[numLinea] || color;
          }
          return featureColor;
        };

        // Funci\xF3n para cargar GeoJSON si existe
        const loadGeoJson = (url, isPoint) => {
          fetch(url)
            .then(res => { if(res.ok) return res.json(); else throw new Error('No '+url); })
            .then(data => {
              L.geoJSON(data, {
                style: isPoint ? null : (feature) => {
                  const featColor = getFeatureColor(feature);
                  return {
                    color: featColor,
                    weight: 4,
                    opacity: 0.8
                  };
                },
                pointToLayer: isPoint ? (feature, latlng) => {
                  const featColor = getFeatureColor(feature);
                  const stStyle = {
                    radius: id === 'ecobici' ? 2 : 4, // Ecobici tiene muchas, hacerlas chicas
                    fillColor: featColor,
                    color: '#fff',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.9
                  };
                  const m = L.circleMarker(latlng, stStyle);
                  if (feature.properties) {
                    const name = feature.properties.NOMBRE || feature.properties.nombre || feature.properties.Name || feature.properties.name || feature.properties.calle_prin || feature.properties.INSTERSECC;
                    if (name) {
                      m.bindTooltip(name, {
                        direction: 'top',
                        className: 'custom-tooltip',
                        offset: [0, -5]
                      });
                      m.bindPopup(\\\`<strong style="color:\\\${featColor}">\\\${name}</strong>\\\`);
                    }
                  }
                  return m;
                } : null
              }).addTo(transportLayer);
            })
            .catch(console.warn);
        };

        // Solicitar datos
        if (hasLines) loadGeoJson(\\\`/data/\\\${id}_lines_normalized.geojson\\\`, false);
        if (hasStations) loadGeoJson(\\\`/data/\\\${id}_stations_normalized.geojson\\\`, true);

        // Estado inicial apagado (excepto Metro)
        let isActive = id === 'metro';
        
        const updateUI = () => {
          if (isActive) {
            map.addLayer(transportLayer);
            btn.classList.add('bg-slate-700/80', 'border-cyan-500/50', 'shadow-[0_0_15px_rgba(0,0,0,0.3)]');
            btn.classList.remove('bg-slate-800/30', 'border-slate-700/50');
            dot.classList.remove('opacity-50', 'shadow-none');
            dot.style.boxShadow = \\\`0 0 10px \\\${color}, 0 0 20px \\\${color}\\\`;
            dot.style.opacity = '1';
          } else {
            map.removeLayer(transportLayer);
            btn.classList.remove('bg-slate-700/80', 'border-cyan-500/50', 'shadow-[0_0_15px_rgba(0,0,0,0.3)]');
            btn.classList.add('bg-slate-800/30', 'border-slate-700/50');
            dot.classList.add('opacity-50', 'shadow-none');
            dot.style.boxShadow = 'none';
            dot.style.opacity = '0.5';
          }
        };

        // Click Event
        btn.addEventListener('click', () => {
          isActive = !isActive;
          updateUI();
        });

        // Configurar estado inicial
        updateUI();
      });
    });
  <\/script>  `])), maybeRenderHead(), transports.map((t) => renderTemplate`<button${addAttribute(t.id, "data-transport")}${addAttribute(t.color, "data-color")}${addAttribute(t.lines.toString(), "data-lines")}${addAttribute(t.stations.toString(), "data-stations")}${addAttribute(`transport-toggle flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 transition-all duration-300`, "class")} data-astro-cid-ou3ajuke> <div${addAttribute(`w-4 h-4 rounded-full ${t.hexBg} opacity-50 shadow-none indicator-dot transition-all duration-300`, "class")} data-astro-cid-ou3ajuke></div> <span class="text-slate-300 font-medium text-sm drop-shadow-md" data-astro-cid-ou3ajuke>${t.name}</span> </button>`)) })}`;
}, "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/monitor.astro", void 0);

const $$file = "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/monitor.astro";
const $$url = "/monitor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Monitor,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
