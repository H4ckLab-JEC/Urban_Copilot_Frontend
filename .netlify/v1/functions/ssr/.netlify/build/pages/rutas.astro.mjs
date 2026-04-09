/* empty css                                 */
import { f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DXssHrC_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DEmLSqtz.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Rutas = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ` <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"> <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script> <script>
  let lMap, lMarkerGroup;
  let reportMarkers = [];

  // 1. Inicializar Leaflet de inmediato (Sin depender de Google)
  function initApp() {
    console.log("\u{1F3D9}\uFE0F Urban Copilot: Iniciando Leaflet Engine");
    const container = document.getElementById("main-map");
    container.innerHTML = ""; 
    
    lMap = L.map(container, {
      zoomControl: false,
      attributionControl: false
    }).setView([19.4326, -99.1332], 12);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(lMap);
    lMarkerGroup = L.layerGroup().addTo(lMap);

    loadRealTimeData();
  }

  async function loadRealTimeData() {
    try {
      const r = await fetch("/api/v1/reports");
      const reports = await r.json();
      
      reports.forEach(r => {
        // PRIORIDAD: Coordenadas reales del reporte. FALLBACK: Simulaci\xF3n en CDMX.
        const lat = r.latitude || (19.4326 + (Math.random() - 0.5) * 0.15);
        const lng = r.longitude || (-99.1332 + (Math.random() - 0.5) * 0.15);
        
        L.circleMarker([lat, lng], {
          radius: 10,
          fillColor: r.category === 'Bloqueo' ? "#ef4444" : "#f59e0b",
          color: "#fff",
          weight: 2,
          fillOpacity: 0.8
        }).addTo(lMarkerGroup).bindPopup(\`
          <div style="color: #333; font-family: sans-serif;">
            <b style="color: #e11d48;">\${r.category}</b><br>
            <small>\${r.location}</small>
            <p style="margin-top:5px; font-size: 10px; color: #666;">\${r.description}</p>
          </div>
        \`);
      });

      updateAlertsSidebar(reports);
    } catch (e) {
      console.error("Error cargando reportes:", e);
    }
  }

  function updateAlertsSidebar(reports) {
    const alertsContainer = document.getElementById('route-alerts');
    const critical = reports.filter(r => r.category === 'Bloqueo' || r.category === 'Manifestaci\xF3n');
    
    if (critical.length > 0) {
      alertsContainer.classList.remove('hidden');
      alertsContainer.innerHTML = \`
        <div class="p-4 bg-rose-950/40 border border-rose-500/30 rounded-xl">
          <div class="text-rose-400 font-black text-[10px] uppercase tracking-tighter mb-2 flex items-center gap-2">
            <span class="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span> Alertas de Movilidad
          </div>
          \${critical.slice(0,2).map(r => \`
            <div class="text-[10px] text-rose-200/70 mb-1 leading-tight">\u{1F6D1} <b>\${r.category}:</b> \${r.location}</div>
          \`).join('')}
        </div>
      \`;
    }
  }

  async function handleCalculate() {
    const originText = document.getElementById("origin-input").value;
    const destText = document.getElementById("dest-input").value;
    const originCoords = document.getElementById("origin-input").dataset.latlng;
    const selectedMode = document.getElementById("mode-input").value;
    
    if(!originText || !destText) {
      alert("Por favor ingresa origen y destino");
      return;
    }

    document.getElementById("btn-calc").textContent = "Calculando Trayecto...";
    document.getElementById("btn-calc").disabled = true;

    try {
      // 1. Obtener Recomendaci\xF3n de IA desde el Backend (Conoce todas las redes de Metro/Metrobus)
      const aiRes = await fetch('/api/v1/recommendations', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ origin: originText, destination: destText, mode: selectedMode })
      });
      const aiData = await aiRes.json();
      
      let aiHtml = '';
      if(aiData.recommendation && aiData.recommendation.steps) {
         aiHtml = aiData.recommendation.steps.map((step, idx) => \`
            <div class="flex gap-2 items-start opacity-90 \${idx > 0 && 'mt-2 border-t border-indigo-500/20 pt-2'}">
               <div class="w-3 h-3 rounded-full mt-0.5 flex-shrink-0" style="background:\${step.color || '#818cf8'}"></div>
               <div>
                 <p class="text-[10px] font-bold text-indigo-200 uppercase">\${step.location_name || 'Trayecto'}</p>
                 <p class="text-[10px] text-indigo-300/80 leading-tight">\${step.instruction}</p>
               </div>
            </div>
         \`).join('');
      } else {
         aiHtml = \`<div class="text-xs text-indigo-100">\${JSON.stringify(aiData.recommendation)}</div>\`;
      }

      // Mostrar recomendaci\xF3n experta en la interfaz
      const alertsContainer = document.getElementById('route-alerts');
      alertsContainer.classList.remove('hidden');
      alertsContainer.innerHTML = \`
        <div class="p-4 bg-blue-900/40 border border-indigo-500/30 rounded-xl mb-4 animate-fadeIn">
          <div class="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Inteligencia Artificial de Copilot
          </div>
          <div class="space-y-1">
             \${aiHtml}
          </div>
          <div class="mt-3 pt-2 border-t border-indigo-500/30 flex justify-between">
             <span class="text-[9px] text-indigo-400 font-mono">DURACI\xD3N (IA)</span>
             <span class="text-[10px] text-emerald-400 font-bold">\${aiData.recommendation?.travel_time_minutes || '--'} MIN</span>
          </div>
        </div>
      \`;

      // 2. Geocodificaci\xF3n Asistida por OpenStreetMap (Nominatim)
      let start = "-99.1332,19.4326"; // Fallback CDMX
      if (originCoords) {
         start = originCoords.split(',').reverse().join(',');
      } else {
         try {
            const oRes = await fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(originText + ', Ciudad de M\xE9xico')}&limit=1\`);
            const oData = await oRes.json();
            if(oData && oData.length > 0) start = \`\${oData[0].lon},\${oData[0].lat}\`;
         } catch(e) {}
      }

      let end = "-99.1412,19.4352"; // Fallback Centro Hist\xF3rico
      try {
         const destRes = await fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(destText + ', Ciudad de M\xE9xico')}&limit=1\`);
         const destData = await destRes.json();
         if(destData && destData.length > 0) {
            end = \`\${destData[0].lon},\${destData[0].lat}\`;
         }
      } catch(e) {
         console.warn("Fallo en geocodificaci\xF3n secundaria, se usar\xE1 punto por defecto.");
      }
      const osrmProfile = selectedMode.startsWith('driving-') ? 'driving' : selectedMode;
      const osrmUrl = \`https://router.project-osrm.org/route/v1/\${osrmProfile}/\${start};\${end}?overview=full&geometries=geojson\`;
      
      const routeRes = await fetch(osrmUrl);
      const routeData = await routeRes.json();

      if (routeData.routes && routeData.routes.length > 0) {
        // 3. Dibujar L\xEDnea y Marcadores
        if (window.currentRoute) lMap.removeLayer(window.currentRoute);
        if (window.destMarker) lMap.removeLayer(window.destMarker);

        const route = routeData.routes[0];
        window.currentRoute = L.geoJSON(route.geometry, {
          style: { color: "#f43f5e", weight: 6, opacity: 0.8, lineCap: "round" },
        }).addTo(lMap);

        // Marcador de Destino (Bandera)
        const destCoords = route.geometry.coordinates.pop();
        window.destMarker = L.marker([destCoords[1], destCoords[0]], {
          icon: L.divIcon({
            className: "custom-div-icon",
            html: "<div style='font-size: 24px; filter: drop-shadow(0 0 5px rgba(244,63,94,0.8));'>\u{1F6A9}</div>",
            iconSize: [30, 42],
            iconAnchor: [5, 30],
          }),
        })
          .addTo(lMap)
          .bindPopup(\`<b>Destino:</b><br>\${destText}\`)
          .openPopup();

        lMap.fitBounds(window.currentRoute.getBounds(), { padding: [50, 50] });

        // Actualizar Info Box
        document.getElementById("route-info").classList.remove("hidden");
        document.getElementById("route-dist").textContent =
          (route.distance / 1000).toFixed(1) + " km";

        const isTransit = selectedMode.startsWith('driving-') && selectedMode !== 'driving-car';
        const aiTime = aiData.recommendation?.travel_time_minutes;
        
        let finalTimeMin = Math.round(route.duration / 60);
        let timeLabel = "Tiempo Estimado (OSRM)";
        
        if (isTransit && aiTime) {
           finalTimeMin = aiTime;
           timeLabel = "Tiempo Estimado (IA Copilot)";
        }

        const labelEl = document.getElementById("route-time-label");
        if(labelEl) labelEl.textContent = timeLabel;
        
        document.getElementById("route-time").textContent = finalTimeMin + " min";
      }

    } catch (e) {
      console.error("Error en el c\xE1lculo estrat\xE9gico:", e);
      alert("Error al conectar con la red de movilidad. Revisa tu conexi\xF3n.");
    } finally {
      document.getElementById("btn-calc").textContent = "Calcular Ruta \xD3ptima";
      document.getElementById("btn-calc").disabled = false;
    }
  }

  // Geolocation Automatizada
  function autoLocate() {
    if (navigator.geolocation) {
      console.log("\u{1F4CD} Solicitando ubicaci\xF3n exacta...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          document.getElementById("origin-input").value = \`Mi ubicaci\xF3n (\${lat.toFixed(4)}, \${lng.toFixed(4)})\`;
          document.getElementById("origin-input").dataset.latlng = \`\${lat},\${lng}\`;
          
          if(lMap) {
            lMap.flyTo([lat, lng], 15);
            L.marker([lat, lng]).addTo(lMap).bindPopup("Est\xE1s aqu\xED").openPopup();
          }
        },
        (err) => {
          console.warn("Ubicaci\xF3n rechazada o no disponible.");
        },
        { enableHighAccuracy: true }
      );
    }
  }

  document.getElementById("btn-geo").addEventListener("click", autoLocate);

  document.getElementById("btn-calc").addEventListener("click", handleCalculate);

  // Iniciar al cargar
  window.onload = () => {
    initApp();
    setTimeout(autoLocate, 1000); // Dar un segundo para que el mapa cargue antes de volar a la ubicaci\xF3n
  };
<\/script> `], ["", ` <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"> <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script> <script>
  let lMap, lMarkerGroup;
  let reportMarkers = [];

  // 1. Inicializar Leaflet de inmediato (Sin depender de Google)
  function initApp() {
    console.log("\u{1F3D9}\uFE0F Urban Copilot: Iniciando Leaflet Engine");
    const container = document.getElementById("main-map");
    container.innerHTML = ""; 
    
    lMap = L.map(container, {
      zoomControl: false,
      attributionControl: false
    }).setView([19.4326, -99.1332], 12);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(lMap);
    lMarkerGroup = L.layerGroup().addTo(lMap);

    loadRealTimeData();
  }

  async function loadRealTimeData() {
    try {
      const r = await fetch("/api/v1/reports");
      const reports = await r.json();
      
      reports.forEach(r => {
        // PRIORIDAD: Coordenadas reales del reporte. FALLBACK: Simulaci\xF3n en CDMX.
        const lat = r.latitude || (19.4326 + (Math.random() - 0.5) * 0.15);
        const lng = r.longitude || (-99.1332 + (Math.random() - 0.5) * 0.15);
        
        L.circleMarker([lat, lng], {
          radius: 10,
          fillColor: r.category === 'Bloqueo' ? "#ef4444" : "#f59e0b",
          color: "#fff",
          weight: 2,
          fillOpacity: 0.8
        }).addTo(lMarkerGroup).bindPopup(\\\`
          <div style="color: #333; font-family: sans-serif;">
            <b style="color: #e11d48;">\\\${r.category}</b><br>
            <small>\\\${r.location}</small>
            <p style="margin-top:5px; font-size: 10px; color: #666;">\\\${r.description}</p>
          </div>
        \\\`);
      });

      updateAlertsSidebar(reports);
    } catch (e) {
      console.error("Error cargando reportes:", e);
    }
  }

  function updateAlertsSidebar(reports) {
    const alertsContainer = document.getElementById('route-alerts');
    const critical = reports.filter(r => r.category === 'Bloqueo' || r.category === 'Manifestaci\xF3n');
    
    if (critical.length > 0) {
      alertsContainer.classList.remove('hidden');
      alertsContainer.innerHTML = \\\`
        <div class="p-4 bg-rose-950/40 border border-rose-500/30 rounded-xl">
          <div class="text-rose-400 font-black text-[10px] uppercase tracking-tighter mb-2 flex items-center gap-2">
            <span class="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span> Alertas de Movilidad
          </div>
          \\\${critical.slice(0,2).map(r => \\\`
            <div class="text-[10px] text-rose-200/70 mb-1 leading-tight">\u{1F6D1} <b>\\\${r.category}:</b> \\\${r.location}</div>
          \\\`).join('')}
        </div>
      \\\`;
    }
  }

  async function handleCalculate() {
    const originText = document.getElementById("origin-input").value;
    const destText = document.getElementById("dest-input").value;
    const originCoords = document.getElementById("origin-input").dataset.latlng;
    const selectedMode = document.getElementById("mode-input").value;
    
    if(!originText || !destText) {
      alert("Por favor ingresa origen y destino");
      return;
    }

    document.getElementById("btn-calc").textContent = "Calculando Trayecto...";
    document.getElementById("btn-calc").disabled = true;

    try {
      // 1. Obtener Recomendaci\xF3n de IA desde el Backend (Conoce todas las redes de Metro/Metrobus)
      const aiRes = await fetch('/api/v1/recommendations', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ origin: originText, destination: destText, mode: selectedMode })
      });
      const aiData = await aiRes.json();
      
      let aiHtml = '';
      if(aiData.recommendation && aiData.recommendation.steps) {
         aiHtml = aiData.recommendation.steps.map((step, idx) => \\\`
            <div class="flex gap-2 items-start opacity-90 \\\${idx > 0 && 'mt-2 border-t border-indigo-500/20 pt-2'}">
               <div class="w-3 h-3 rounded-full mt-0.5 flex-shrink-0" style="background:\\\${step.color || '#818cf8'}"></div>
               <div>
                 <p class="text-[10px] font-bold text-indigo-200 uppercase">\\\${step.location_name || 'Trayecto'}</p>
                 <p class="text-[10px] text-indigo-300/80 leading-tight">\\\${step.instruction}</p>
               </div>
            </div>
         \\\`).join('');
      } else {
         aiHtml = \\\`<div class="text-xs text-indigo-100">\\\${JSON.stringify(aiData.recommendation)}</div>\\\`;
      }

      // Mostrar recomendaci\xF3n experta en la interfaz
      const alertsContainer = document.getElementById('route-alerts');
      alertsContainer.classList.remove('hidden');
      alertsContainer.innerHTML = \\\`
        <div class="p-4 bg-blue-900/40 border border-indigo-500/30 rounded-xl mb-4 animate-fadeIn">
          <div class="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Inteligencia Artificial de Copilot
          </div>
          <div class="space-y-1">
             \\\${aiHtml}
          </div>
          <div class="mt-3 pt-2 border-t border-indigo-500/30 flex justify-between">
             <span class="text-[9px] text-indigo-400 font-mono">DURACI\xD3N (IA)</span>
             <span class="text-[10px] text-emerald-400 font-bold">\\\${aiData.recommendation?.travel_time_minutes || '--'} MIN</span>
          </div>
        </div>
      \\\`;

      // 2. Geocodificaci\xF3n Asistida por OpenStreetMap (Nominatim)
      let start = "-99.1332,19.4326"; // Fallback CDMX
      if (originCoords) {
         start = originCoords.split(',').reverse().join(',');
      } else {
         try {
            const oRes = await fetch(\\\`https://nominatim.openstreetmap.org/search?format=json&q=\\\${encodeURIComponent(originText + ', Ciudad de M\xE9xico')}&limit=1\\\`);
            const oData = await oRes.json();
            if(oData && oData.length > 0) start = \\\`\\\${oData[0].lon},\\\${oData[0].lat}\\\`;
         } catch(e) {}
      }

      let end = "-99.1412,19.4352"; // Fallback Centro Hist\xF3rico
      try {
         const destRes = await fetch(\\\`https://nominatim.openstreetmap.org/search?format=json&q=\\\${encodeURIComponent(destText + ', Ciudad de M\xE9xico')}&limit=1\\\`);
         const destData = await destRes.json();
         if(destData && destData.length > 0) {
            end = \\\`\\\${destData[0].lon},\\\${destData[0].lat}\\\`;
         }
      } catch(e) {
         console.warn("Fallo en geocodificaci\xF3n secundaria, se usar\xE1 punto por defecto.");
      }
      const osrmProfile = selectedMode.startsWith('driving-') ? 'driving' : selectedMode;
      const osrmUrl = \\\`https://router.project-osrm.org/route/v1/\\\${osrmProfile}/\\\${start};\\\${end}?overview=full&geometries=geojson\\\`;
      
      const routeRes = await fetch(osrmUrl);
      const routeData = await routeRes.json();

      if (routeData.routes && routeData.routes.length > 0) {
        // 3. Dibujar L\xEDnea y Marcadores
        if (window.currentRoute) lMap.removeLayer(window.currentRoute);
        if (window.destMarker) lMap.removeLayer(window.destMarker);

        const route = routeData.routes[0];
        window.currentRoute = L.geoJSON(route.geometry, {
          style: { color: "#f43f5e", weight: 6, opacity: 0.8, lineCap: "round" },
        }).addTo(lMap);

        // Marcador de Destino (Bandera)
        const destCoords = route.geometry.coordinates.pop();
        window.destMarker = L.marker([destCoords[1], destCoords[0]], {
          icon: L.divIcon({
            className: "custom-div-icon",
            html: "<div style='font-size: 24px; filter: drop-shadow(0 0 5px rgba(244,63,94,0.8));'>\u{1F6A9}</div>",
            iconSize: [30, 42],
            iconAnchor: [5, 30],
          }),
        })
          .addTo(lMap)
          .bindPopup(\\\`<b>Destino:</b><br>\\\${destText}\\\`)
          .openPopup();

        lMap.fitBounds(window.currentRoute.getBounds(), { padding: [50, 50] });

        // Actualizar Info Box
        document.getElementById("route-info").classList.remove("hidden");
        document.getElementById("route-dist").textContent =
          (route.distance / 1000).toFixed(1) + " km";

        const isTransit = selectedMode.startsWith('driving-') && selectedMode !== 'driving-car';
        const aiTime = aiData.recommendation?.travel_time_minutes;
        
        let finalTimeMin = Math.round(route.duration / 60);
        let timeLabel = "Tiempo Estimado (OSRM)";
        
        if (isTransit && aiTime) {
           finalTimeMin = aiTime;
           timeLabel = "Tiempo Estimado (IA Copilot)";
        }

        const labelEl = document.getElementById("route-time-label");
        if(labelEl) labelEl.textContent = timeLabel;
        
        document.getElementById("route-time").textContent = finalTimeMin + " min";
      }

    } catch (e) {
      console.error("Error en el c\xE1lculo estrat\xE9gico:", e);
      alert("Error al conectar con la red de movilidad. Revisa tu conexi\xF3n.");
    } finally {
      document.getElementById("btn-calc").textContent = "Calcular Ruta \xD3ptima";
      document.getElementById("btn-calc").disabled = false;
    }
  }

  // Geolocation Automatizada
  function autoLocate() {
    if (navigator.geolocation) {
      console.log("\u{1F4CD} Solicitando ubicaci\xF3n exacta...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          document.getElementById("origin-input").value = \\\`Mi ubicaci\xF3n (\\\${lat.toFixed(4)}, \\\${lng.toFixed(4)})\\\`;
          document.getElementById("origin-input").dataset.latlng = \\\`\\\${lat},\\\${lng}\\\`;
          
          if(lMap) {
            lMap.flyTo([lat, lng], 15);
            L.marker([lat, lng]).addTo(lMap).bindPopup("Est\xE1s aqu\xED").openPopup();
          }
        },
        (err) => {
          console.warn("Ubicaci\xF3n rechazada o no disponible.");
        },
        { enableHighAccuracy: true }
      );
    }
  }

  document.getElementById("btn-geo").addEventListener("click", autoLocate);

  document.getElementById("btn-calc").addEventListener("click", handleCalculate);

  // Iniciar al cargar
  window.onload = () => {
    initApp();
    setTimeout(autoLocate, 1000); // Dar un segundo para que el mapa cargue antes de volar a la ubicaci\xF3n
  };
<\/script> `])), renderComponent($$result, "Layout", $$Layout, { "title": "Planificador de Rutas - Urban Copilot", "data-astro-cid-l6oo6qk4": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen pt-24 px-6 mb-12 flex flex-col items-center" data-astro-cid-l6oo6qk4> <div class="max-w-6xl w-full mx-auto backdrop-blur-md bg-slate-900/80 rounded-2xl border border-rose-500/30 p-6 md:p-10 shadow-2xl relative" data-astro-cid-l6oo6qk4> <!-- Design Accents --> <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-rose-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 z-0" data-astro-cid-l6oo6qk4></div> <header class="mb-8 border-l-4 border-rose-400 pl-4 md:pl-6 relative z-30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" data-astro-cid-l6oo6qk4> <div data-astro-cid-l6oo6qk4> <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight" data-astro-cid-l6oo6qk4>Planificador de Rutas</h1> <p class="text-slate-400 text-sm font-medium mt-1 md:mt-2" data-astro-cid-l6oo6qk4>Motor de Movilidad Inteligente (Leaflet v1.9)</p> </div> <a href="/" class="w-full md:w-auto text-center px-6 py-2 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 font-bold backdrop-blur-md" data-astro-cid-l6oo6qk4>
Volver
</a> </header> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-30" data-astro-cid-l6oo6qk4> <div class="space-y-6 relative z-30" data-astro-cid-l6oo6qk4> <div class="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-xl" data-astro-cid-l6oo6qk4> <h3 class="text-rose-400 text-xs font-black uppercase tracking-widest mb-6" data-astro-cid-l6oo6qk4>Configurar Trayecto</h3> <div class="space-y-4" data-astro-cid-l6oo6qk4> <div class="relative" data-astro-cid-l6oo6qk4> <label class="block text-[10px] text-slate-500 uppercase font-bold mb-1.5 ml-1" data-astro-cid-l6oo6qk4>Punto de Partida</label> <div class="flex gap-2" data-astro-cid-l6oo6qk4> <input id="origin-input" type="text" autocomplete="off" placeholder="Ej: Metro Pantitlán" class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500 cursor-text relative z-40" data-astro-cid-l6oo6qk4> <button id="btn-geo" class="p-2 bg-slate-700 text-slate-300 rounded-lg hover:text-white transition-all shadow-inner relative z-40" data-astro-cid-l6oo6qk4> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-l6oo6qk4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-astro-cid-l6oo6qk4></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-l6oo6qk4></path></svg> </button> </div> </div> <div data-astro-cid-l6oo6qk4> <label class="block text-[10px] text-slate-500 uppercase font-bold mb-1.5 ml-1" data-astro-cid-l6oo6qk4>Destino Final</label> <input id="dest-input" type="text" autocomplete="off" placeholder="Ej: Palacio de Bellas Artes" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500 cursor-text relative z-40" data-astro-cid-l6oo6qk4> </div> <div class="relative z-40 mt-3" data-astro-cid-l6oo6qk4> <label class="block text-[10px] text-slate-500 uppercase font-bold mb-1.5 ml-1" data-astro-cid-l6oo6qk4>Modo de Transporte Principal</label> <select id="mode-input" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500 cursor-pointer" data-astro-cid-l6oo6qk4> <option value="driving-metro" data-astro-cid-l6oo6qk4>🚇 Metro</option> <option value="driving-metrobus" data-astro-cid-l6oo6qk4>🚌 Metrobús</option> <option value="driving-cablebus" data-astro-cid-l6oo6qk4>🚠 Cablebús</option> <option value="driving-tren" data-astro-cid-l6oo6qk4>🚆 Tren Ligero / Suburbano</option> <option value="foot" data-astro-cid-l6oo6qk4>🚶 Caminando</option> <option value="bike" data-astro-cid-l6oo6qk4>🚲 Bicicleta</option> <option value="driving-car" data-astro-cid-l6oo6qk4>🚗 Automóvil / Taxi</option> </select> <p class="text-[9px] text-slate-500 mt-1 leading-tight italic" data-astro-cid-l6oo6qk4>*OSRM traza la ruta física. Urban Copilot AI calcula estaciones y transbordos.</p> </div> <button id="btn-calc" class="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg transition-all shadow-lg shadow-emerald-600/20 uppercase tracking-widest mt-4 relative z-40" data-astro-cid-l6oo6qk4>
Calcular Ruta Óptima
</button> </div> </div> <div id="route-alerts" class="hidden space-y-4 animate-fadeIn" data-astro-cid-l6oo6qk4></div> <div id="route-info" class="hidden bg-slate-900/60 p-5 rounded-xl border border-slate-700 animate-fadeIn" data-astro-cid-l6oo6qk4> <div class="flex justify-between items-center mb-4" data-astro-cid-l6oo6qk4> <span class="text-rose-300 font-bold text-sm" data-astro-cid-l6oo6qk4>Resumen del Viaje</span> <span id="route-dist" class="text-[10px] bg-rose-600/30 px-2 py-0.5 rounded text-white font-mono" data-astro-cid-l6oo6qk4>-- km</span> </div> <div class="space-y-3" data-astro-cid-l6oo6qk4> <div class="flex items-center gap-3" data-astro-cid-l6oo6qk4> <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-rose-400" data-astro-cid-l6oo6qk4> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-l6oo6qk4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-l6oo6qk4></path></svg> </div> <div data-astro-cid-l6oo6qk4> <p id="route-time-label" class="text-[10px] text-slate-500 font-bold uppercase" data-astro-cid-l6oo6qk4>Tiempo Estimado (OSRM)</p> <p id="route-time" class="text-sm text-white font-medium" data-astro-cid-l6oo6qk4>-- min</p> </div> </div> </div> </div> </div> <div class="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl h-[400px] lg:h-auto relative" data-astro-cid-l6oo6qk4> <div id="main-map" class="w-full h-full" data-astro-cid-l6oo6qk4> <div class="flex items-center justify-center h-full text-slate-600 font-mono text-xs uppercase tracking-[0.2em] animate-pulse" data-astro-cid-l6oo6qk4>
Iniciando Cartografía Urbana...
</div> </div> </div> </div> </div> </main> ` }));
}, "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/rutas.astro", void 0);

const $$file = "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/rutas.astro";
const $$url = "/rutas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rutas,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
