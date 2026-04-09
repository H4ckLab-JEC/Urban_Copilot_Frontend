/* empty css                                 */
import { f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DXssHrC_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DEmLSqtz.mjs';
import { $ as $$DashboardHeader } from '../chunks/DashboardHeader_u36cLjCm.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Reportes = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `  <script>
  let reportData = { category: "", system: "", station: "", description: "", location: "" };
  let step = 0;
  let isListening = false;

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const btnMic = document.getElementById('btn-mic');
  const micIcon = document.getElementById('mic-icon');
  const reportsList = document.getElementById('reports-list');

  // VOICE SYNTHESIS
  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }

  // VOICE RECOGNITION
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  function initRecognition() {
    if (!Recognition) return null;
    const r = new Recognition();
    r.lang = 'es-MX';
    r.continuous = false;
    r.interimResults = false;
    r.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      handleInput();
    };
    r.onend = () => { isListening = false; micIcon.classList.remove('mic-active'); };
    r.onerror = (e) => { isListening = false; micIcon.classList.remove('mic-active'); };
    return r;
  }

  btnMic.addEventListener('click', () => {
    if (!Recognition) return alert("Navegador no soporta voz.");
    if (!recognition) recognition = initRecognition();
    if (isListening) recognition.stop();
    else { isListening = true; micIcon.classList.add('mic-active'); recognition.start(); }
  });

  function addMessage(text, isUser = false, isHtml = false) {
    const div = document.createElement('div');
    div.className = \`flex \${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn\`;
    const inner = document.createElement('div');
    inner.className = isUser 
      ? 'bg-slate-800 border border-slate-700 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%]' 
      : 'bg-blue-500/20 border border-indigo-500/30 text-indigo-100 p-3 rounded-2xl rounded-tl-none max-w-[85%]';
    
    if (isHtml) inner.innerHTML = text;
    else inner.textContent = text;
    
    div.appendChild(inner);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) speak(text.replace(/<[^>]*>/g, '')); 
  }

  window.startFlow = (cat) => {
    reportData.category = cat;
    addMessage(cat, true);
    setTimeout(() => {
      addMessage("Perfecto. \xBFEn qu\xE9 sistema de transporte ocurri\xF3 el evento?", false, true);
      const systems = ["Metro", "Metrob\xFAs", "Cableb\xFAs", "Troleb\xFAs", "RTP", "Tren Ligero", "Otro"];
      const container = document.createElement('div');
      container.className = "mt-3 flex flex-wrap gap-2";
      systems.forEach(s => {
        const btn = document.createElement('button');
        btn.className = "chip";
        btn.textContent = s;
        btn.onclick = () => selectSystem(s);
        container.appendChild(btn);
      });
      chatMessages.lastElementChild.firstChild.appendChild(container);
      step = 1;
    }, 500);
  };

  let currentSystemStations = []; // Solo nombres para validaci\xF3n r\xE1pida
  let currentSystemStationsFull = []; // Info completa (lat/lng/name)

  window.selectSystem = async (sys) => {
    reportData.system = sys;
    addMessage(sys, true);
    
    const sysKey = sys.toLowerCase().replace('\xFA', 'u').replace('\xE9', 'e').replace(' ', '_');
    const loadingMsg = \`Buscando estaciones cercanas de \${sys}...\`;
    addMessage(loadingMsg);

    try {
      const res = await fetch(\`/data/\${sysKey}_stations_normalized.geojson\`);
      if (!res.ok) throw new Error();
      const gj = await res.json();
      
      // Procesar y guardar estaciones del sistema para validaci\xF3n
      currentSystemStations = [];
      currentSystemStationsFull = [];
      
      gj.features.forEach(f => {
        let name = f.properties.NOMBRE || f.properties.nombre || f.properties.STATION || "";
        if (sys.toLowerCase() === 'rtp') name = f.properties.INSTERSECC || "";
        if (sys.toLowerCase() === 'ecobici') name = \`\${f.properties.calle_prin} y \${f.properties.calle_secu}\`;
        
        if (name) {
          currentSystemStations.push(name);
          currentSystemStationsFull.push({
            name: name,
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0]
          });
        }
      });

      let lat = 19.4326, lng = -99.1332; // Default CDMX Central
      if (navigator.geolocation) {
        try {
          const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 2000 });
          });
          lat = pos.coords.latitude; lng = pos.coords.longitude;
        } catch(e) {}
      }

      // Calcular distancias y sugerir las 4 m\xE1s cercanas usando la lista procesada
      const suggestions = currentSystemStationsFull.map(s => {
        const dist = Math.sqrt(Math.pow(lat - s.lat, 2) + Math.pow(lng - s.lng, 2));
        return { name: s.name, dist };
      })
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 4);

      setTimeout(() => {
        // Eliminar el mensaje de carga y poner la pregunta real
        if (chatMessages.lastElementChild.innerText.includes("Buscando")) {
           chatMessages.lastElementChild.remove();
        }
        addMessage(\`He detectado estas estaciones de \${sys} cerca de ti. \xBFEs alguna de estas o prefieres escribir otra?\`, false, true);
        
        const container = document.createElement('div');
        container.className = "mt-3 flex flex-wrap gap-2";
        suggestions.forEach(s => {
          const btn = document.createElement('button');
          btn.className = "chip border-emerald-500/50 bg-emerald-500/5";
          btn.textContent = s.name;
          btn.onclick = () => { reportData.station = s.name; handleInputManually(s.name); };
          container.appendChild(btn);
        });
        chatMessages.lastElementChild.firstChild.appendChild(container);
        step = 2;
      }, 600);

    } catch (e) {
      if (chatMessages.lastElementChild.innerText.includes("Buscando")) {
         chatMessages.lastElementChild.remove();
      }
      addMessage(\`De acuerdo. \xBFCu\xE1l es el nombre de la estaci\xF3n o punto m\xE1s cercano en el \${sys}?\`);
      step = 2;
    }
  };

  // Helper para cuando se hace click en una estaci\xF3n sugerida
  function handleInputManually(val) {
     addMessage(val, true);
     setTimeout(() => {
        addMessage("Perfecto. Por favor, describe brevemente qu\xE9 est\xE1 ocurriendo.");
        step = 3;
     }, 500);
  }

  async function loadReports() {
    try {
      const r = await fetch('/api/v1/reports');
      const data = await r.json();
      reportsList.innerHTML = data.reverse().map(rep => \`
        <div class="p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-[10px] mb-3 border-l-2 border-l-emerald-500">
          <div class="flex justify-between text-emerald-400 font-bold mb-1">
            <span>\${rep.category}</span>
            <span>\${rep.time}</span>
          </div>
          <div class="text-slate-300 font-bold">\${rep.system} - \${rep.station}</div>
          <div class="text-slate-500 italic mt-1 line-clamp-2">\${rep.description}</div>
        </div>
      \`).join('') || '<p class="text-[10px] text-slate-600">No hay reportes hoy.</p>';
    } catch (e) { console.error(e); }
  }

  async function submitReport() {
    try {
      addMessage("Sincronizando reporte con el Tablero Maestro...", false);
      
      // La ubicaci\xF3n principal debe ser la de la ESTACI\xD3N reportada, no la del usuario
      let finalLat = null;
      let finalLng = null;

      const stationCoords = currentSystemStationsFull.find(s => s.name === reportData.station);
      if (stationCoords) {
        finalLat = stationCoords.lat;
        finalLng = stationCoords.lng;
        console.log("Usando coordenadas de la estaci\xF3n:", finalLat, finalLng);
      } else if (navigator.geolocation) {
        // Fallback al GPS del usuario si por alguna raz\xF3n no tenemos la coord de la estaci\xF3n
        try {
          const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 2000 });
          });
          finalLat = pos.coords.latitude; 
          finalLng = pos.coords.longitude;
          console.log("Fallback a GPS del usuario");
        } catch (e) {}
      }

      await fetch('/api/v1/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: reportData.category,
          system: reportData.system,
          station: reportData.station,
          location: \`\${reportData.system} \${reportData.station}\`,
          description: reportData.description,
          latitude: finalLat, 
          longitude: finalLng
        })
      });
      
      setTimeout(() => {
        addMessage(\`\xA1Registro completado! He categorizado tu reporte como \${reportData.category} en \${reportData.system} \${reportData.station}.\`);
        setTimeout(() => {
          addMessage("Muchas gracias por tu colaboraci\xF3n para mejorar la movilidad urbana. La conversaci\xF3n ha finalizado. \xA1Buen viaje!", false);
          loadReports();
          step = 4; // Cerrado
          chatInput.disabled = true;
          btnSend.disabled = true;
          btnMic.disabled = true;
        }, 1000);
      }, 1000);

    } catch (error) {
      addMessage("Error al sincronizar. Por favor, reintenta.");
    }
  }

  function handleInput() {
    const val = chatInput.value.trim();
    if (!val) return;
    
    if (step === 0) {
      const categories = ['bloqueo', 'manifestacion', 'accidente', 'obras', 'otro', 'falla'];
      const valLower = val.toLowerCase();
      const matched = categories.find(c => valLower.includes(c));
      if (matched) {
        let finalCat = matched.charAt(0).toUpperCase() + matched.slice(1).replace('cion', 'ci\xF3n');
        if (matched === 'falla') finalCat = 'Falla T\xE9cnica';
        startFlow(finalCat);
        chatInput.value = "";
        return;
      }
    }

    if (step === 4) return; // Conversaci\xF3n terminada

    addMessage(val, true);
    chatInput.value = "";

    if (step === 1) {
      selectSystem(val);
    } else if (step === 2) {
      // Validar si la estaci\xF3n existe en el sistema actual
      const inputNorm = val.toLowerCase().trim();
      const matchedStation = currentSystemStations.find(s => s.toLowerCase() === inputNorm);
      
      if (matchedStation) {
        reportData.station = matchedStation;
        setTimeout(() => {
          addMessage("Estaci\xF3n validada correctamente. Por favor, describe brevemente qu\xE9 est\xE1 ocurriendo.");
          step = 3;
        }, 500);
      } else {
        setTimeout(() => {
          addMessage(\`No reconozco "\${val}" como una estaci\xF3n v\xE1lida de \${reportData.system}. Por favor, selecciona una de las sugerencias o escribe el nombre exacto de la estaci\xF3n.\`);
          // Re-mostrar sugerencias
          const container = document.createElement('div');
          container.className = "mt-3 flex flex-wrap gap-2";
          
          // Buscar sugerencias (las 4 m\xE1s cercanas que ya calculamos o simplemente las primeras 4)
          const searchLat = 19.4326, searchLng = -99.1332; 
          const currentSuggestions = currentSystemStationsFull
            .map(s => {
               const dist = Math.sqrt(Math.pow(searchLat - s.lat, 2) + Math.pow(searchLng - s.lng, 2));
               return { name: s.name, dist };
            })
            .sort((a,b) => a.dist - b.dist)
            .slice(0, 4);

          currentSuggestions.forEach(s => {
            const btn = document.createElement('button');
            btn.className = "chip border-emerald-500/50 bg-emerald-500/5";
            btn.textContent = s.name;
            btn.onclick = () => { reportData.station = s.name; handleInputManually(s.name); };
            container.appendChild(btn);
          });
          chatMessages.lastElementChild.firstChild.appendChild(container);
        }, 500);
      }
    } else if (step === 3) {
      reportData.description = val;
      submitReport();
    } else if (step === 0) {
      setTimeout(() => {
        addMessage("Para iniciar, dime qu\xE9 quieres reportar (Bloqueo, Accidente, etc) o elige una opci\xF3n.");
      }, 500);
    }
  }

  btnSend.addEventListener('click', handleInput);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleInput(); });
  loadReports();

  // Primera bienvenida hablada tras un click del usuario (browser restriction)
  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href="/"]')) return;
    if (chatMessages.children.length === 1 && !window.hasWelcomed) {
      speak("\xA1Hola! Soy tu asistente inteligente de Urban Copilot. \xBFQu\xE9 evento te gustar\xEDa reportar hoy?");
      window.hasWelcomed = true;
    }
  }, { once: true });

  // Detener voz al salir de la p\xE1gina
  window.addEventListener('pagehide', () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  });
<\/script>`], ["", `  <script>
  let reportData = { category: "", system: "", station: "", description: "", location: "" };
  let step = 0;
  let isListening = false;

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const btnMic = document.getElementById('btn-mic');
  const micIcon = document.getElementById('mic-icon');
  const reportsList = document.getElementById('reports-list');

  // VOICE SYNTHESIS
  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }

  // VOICE RECOGNITION
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  function initRecognition() {
    if (!Recognition) return null;
    const r = new Recognition();
    r.lang = 'es-MX';
    r.continuous = false;
    r.interimResults = false;
    r.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      handleInput();
    };
    r.onend = () => { isListening = false; micIcon.classList.remove('mic-active'); };
    r.onerror = (e) => { isListening = false; micIcon.classList.remove('mic-active'); };
    return r;
  }

  btnMic.addEventListener('click', () => {
    if (!Recognition) return alert("Navegador no soporta voz.");
    if (!recognition) recognition = initRecognition();
    if (isListening) recognition.stop();
    else { isListening = true; micIcon.classList.add('mic-active'); recognition.start(); }
  });

  function addMessage(text, isUser = false, isHtml = false) {
    const div = document.createElement('div');
    div.className = \\\`flex \\\${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn\\\`;
    const inner = document.createElement('div');
    inner.className = isUser 
      ? 'bg-slate-800 border border-slate-700 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%]' 
      : 'bg-blue-500/20 border border-indigo-500/30 text-indigo-100 p-3 rounded-2xl rounded-tl-none max-w-[85%]';
    
    if (isHtml) inner.innerHTML = text;
    else inner.textContent = text;
    
    div.appendChild(inner);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) speak(text.replace(/<[^>]*>/g, '')); 
  }

  window.startFlow = (cat) => {
    reportData.category = cat;
    addMessage(cat, true);
    setTimeout(() => {
      addMessage("Perfecto. \xBFEn qu\xE9 sistema de transporte ocurri\xF3 el evento?", false, true);
      const systems = ["Metro", "Metrob\xFAs", "Cableb\xFAs", "Troleb\xFAs", "RTP", "Tren Ligero", "Otro"];
      const container = document.createElement('div');
      container.className = "mt-3 flex flex-wrap gap-2";
      systems.forEach(s => {
        const btn = document.createElement('button');
        btn.className = "chip";
        btn.textContent = s;
        btn.onclick = () => selectSystem(s);
        container.appendChild(btn);
      });
      chatMessages.lastElementChild.firstChild.appendChild(container);
      step = 1;
    }, 500);
  };

  let currentSystemStations = []; // Solo nombres para validaci\xF3n r\xE1pida
  let currentSystemStationsFull = []; // Info completa (lat/lng/name)

  window.selectSystem = async (sys) => {
    reportData.system = sys;
    addMessage(sys, true);
    
    const sysKey = sys.toLowerCase().replace('\xFA', 'u').replace('\xE9', 'e').replace(' ', '_');
    const loadingMsg = \\\`Buscando estaciones cercanas de \\\${sys}...\\\`;
    addMessage(loadingMsg);

    try {
      const res = await fetch(\\\`/data/\\\${sysKey}_stations_normalized.geojson\\\`);
      if (!res.ok) throw new Error();
      const gj = await res.json();
      
      // Procesar y guardar estaciones del sistema para validaci\xF3n
      currentSystemStations = [];
      currentSystemStationsFull = [];
      
      gj.features.forEach(f => {
        let name = f.properties.NOMBRE || f.properties.nombre || f.properties.STATION || "";
        if (sys.toLowerCase() === 'rtp') name = f.properties.INSTERSECC || "";
        if (sys.toLowerCase() === 'ecobici') name = \\\`\\\${f.properties.calle_prin} y \\\${f.properties.calle_secu}\\\`;
        
        if (name) {
          currentSystemStations.push(name);
          currentSystemStationsFull.push({
            name: name,
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0]
          });
        }
      });

      let lat = 19.4326, lng = -99.1332; // Default CDMX Central
      if (navigator.geolocation) {
        try {
          const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 2000 });
          });
          lat = pos.coords.latitude; lng = pos.coords.longitude;
        } catch(e) {}
      }

      // Calcular distancias y sugerir las 4 m\xE1s cercanas usando la lista procesada
      const suggestions = currentSystemStationsFull.map(s => {
        const dist = Math.sqrt(Math.pow(lat - s.lat, 2) + Math.pow(lng - s.lng, 2));
        return { name: s.name, dist };
      })
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 4);

      setTimeout(() => {
        // Eliminar el mensaje de carga y poner la pregunta real
        if (chatMessages.lastElementChild.innerText.includes("Buscando")) {
           chatMessages.lastElementChild.remove();
        }
        addMessage(\\\`He detectado estas estaciones de \\\${sys} cerca de ti. \xBFEs alguna de estas o prefieres escribir otra?\\\`, false, true);
        
        const container = document.createElement('div');
        container.className = "mt-3 flex flex-wrap gap-2";
        suggestions.forEach(s => {
          const btn = document.createElement('button');
          btn.className = "chip border-emerald-500/50 bg-emerald-500/5";
          btn.textContent = s.name;
          btn.onclick = () => { reportData.station = s.name; handleInputManually(s.name); };
          container.appendChild(btn);
        });
        chatMessages.lastElementChild.firstChild.appendChild(container);
        step = 2;
      }, 600);

    } catch (e) {
      if (chatMessages.lastElementChild.innerText.includes("Buscando")) {
         chatMessages.lastElementChild.remove();
      }
      addMessage(\\\`De acuerdo. \xBFCu\xE1l es el nombre de la estaci\xF3n o punto m\xE1s cercano en el \\\${sys}?\\\`);
      step = 2;
    }
  };

  // Helper para cuando se hace click en una estaci\xF3n sugerida
  function handleInputManually(val) {
     addMessage(val, true);
     setTimeout(() => {
        addMessage("Perfecto. Por favor, describe brevemente qu\xE9 est\xE1 ocurriendo.");
        step = 3;
     }, 500);
  }

  async function loadReports() {
    try {
      const r = await fetch('/api/v1/reports');
      const data = await r.json();
      reportsList.innerHTML = data.reverse().map(rep => \\\`
        <div class="p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-[10px] mb-3 border-l-2 border-l-emerald-500">
          <div class="flex justify-between text-emerald-400 font-bold mb-1">
            <span>\\\${rep.category}</span>
            <span>\\\${rep.time}</span>
          </div>
          <div class="text-slate-300 font-bold">\\\${rep.system} - \\\${rep.station}</div>
          <div class="text-slate-500 italic mt-1 line-clamp-2">\\\${rep.description}</div>
        </div>
      \\\`).join('') || '<p class="text-[10px] text-slate-600">No hay reportes hoy.</p>';
    } catch (e) { console.error(e); }
  }

  async function submitReport() {
    try {
      addMessage("Sincronizando reporte con el Tablero Maestro...", false);
      
      // La ubicaci\xF3n principal debe ser la de la ESTACI\xD3N reportada, no la del usuario
      let finalLat = null;
      let finalLng = null;

      const stationCoords = currentSystemStationsFull.find(s => s.name === reportData.station);
      if (stationCoords) {
        finalLat = stationCoords.lat;
        finalLng = stationCoords.lng;
        console.log("Usando coordenadas de la estaci\xF3n:", finalLat, finalLng);
      } else if (navigator.geolocation) {
        // Fallback al GPS del usuario si por alguna raz\xF3n no tenemos la coord de la estaci\xF3n
        try {
          const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 2000 });
          });
          finalLat = pos.coords.latitude; 
          finalLng = pos.coords.longitude;
          console.log("Fallback a GPS del usuario");
        } catch (e) {}
      }

      await fetch('/api/v1/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: reportData.category,
          system: reportData.system,
          station: reportData.station,
          location: \\\`\\\${reportData.system} \\\${reportData.station}\\\`,
          description: reportData.description,
          latitude: finalLat, 
          longitude: finalLng
        })
      });
      
      setTimeout(() => {
        addMessage(\\\`\xA1Registro completado! He categorizado tu reporte como \\\${reportData.category} en \\\${reportData.system} \\\${reportData.station}.\\\`);
        setTimeout(() => {
          addMessage("Muchas gracias por tu colaboraci\xF3n para mejorar la movilidad urbana. La conversaci\xF3n ha finalizado. \xA1Buen viaje!", false);
          loadReports();
          step = 4; // Cerrado
          chatInput.disabled = true;
          btnSend.disabled = true;
          btnMic.disabled = true;
        }, 1000);
      }, 1000);

    } catch (error) {
      addMessage("Error al sincronizar. Por favor, reintenta.");
    }
  }

  function handleInput() {
    const val = chatInput.value.trim();
    if (!val) return;
    
    if (step === 0) {
      const categories = ['bloqueo', 'manifestacion', 'accidente', 'obras', 'otro', 'falla'];
      const valLower = val.toLowerCase();
      const matched = categories.find(c => valLower.includes(c));
      if (matched) {
        let finalCat = matched.charAt(0).toUpperCase() + matched.slice(1).replace('cion', 'ci\xF3n');
        if (matched === 'falla') finalCat = 'Falla T\xE9cnica';
        startFlow(finalCat);
        chatInput.value = "";
        return;
      }
    }

    if (step === 4) return; // Conversaci\xF3n terminada

    addMessage(val, true);
    chatInput.value = "";

    if (step === 1) {
      selectSystem(val);
    } else if (step === 2) {
      // Validar si la estaci\xF3n existe en el sistema actual
      const inputNorm = val.toLowerCase().trim();
      const matchedStation = currentSystemStations.find(s => s.toLowerCase() === inputNorm);
      
      if (matchedStation) {
        reportData.station = matchedStation;
        setTimeout(() => {
          addMessage("Estaci\xF3n validada correctamente. Por favor, describe brevemente qu\xE9 est\xE1 ocurriendo.");
          step = 3;
        }, 500);
      } else {
        setTimeout(() => {
          addMessage(\\\`No reconozco "\\\${val}" como una estaci\xF3n v\xE1lida de \\\${reportData.system}. Por favor, selecciona una de las sugerencias o escribe el nombre exacto de la estaci\xF3n.\\\`);
          // Re-mostrar sugerencias
          const container = document.createElement('div');
          container.className = "mt-3 flex flex-wrap gap-2";
          
          // Buscar sugerencias (las 4 m\xE1s cercanas que ya calculamos o simplemente las primeras 4)
          const searchLat = 19.4326, searchLng = -99.1332; 
          const currentSuggestions = currentSystemStationsFull
            .map(s => {
               const dist = Math.sqrt(Math.pow(searchLat - s.lat, 2) + Math.pow(searchLng - s.lng, 2));
               return { name: s.name, dist };
            })
            .sort((a,b) => a.dist - b.dist)
            .slice(0, 4);

          currentSuggestions.forEach(s => {
            const btn = document.createElement('button');
            btn.className = "chip border-emerald-500/50 bg-emerald-500/5";
            btn.textContent = s.name;
            btn.onclick = () => { reportData.station = s.name; handleInputManually(s.name); };
            container.appendChild(btn);
          });
          chatMessages.lastElementChild.firstChild.appendChild(container);
        }, 500);
      }
    } else if (step === 3) {
      reportData.description = val;
      submitReport();
    } else if (step === 0) {
      setTimeout(() => {
        addMessage("Para iniciar, dime qu\xE9 quieres reportar (Bloqueo, Accidente, etc) o elige una opci\xF3n.");
      }, 500);
    }
  }

  btnSend.addEventListener('click', handleInput);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleInput(); });
  loadReports();

  // Primera bienvenida hablada tras un click del usuario (browser restriction)
  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href="/"]')) return;
    if (chatMessages.children.length === 1 && !window.hasWelcomed) {
      speak("\xA1Hola! Soy tu asistente inteligente de Urban Copilot. \xBFQu\xE9 evento te gustar\xEDa reportar hoy?");
      window.hasWelcomed = true;
    }
  }, { once: true });

  // Detener voz al salir de la p\xE1gina
  window.addEventListener('pagehide', () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  });
<\/script>`])), renderComponent($$result, "Layout", $$Layout, { "title": "Centro de Reportes - Urban Copilot", "data-astro-cid-hdplutls": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen pt-24 px-6 mb-12 flex flex-col items-center" data-astro-cid-hdplutls> ${renderComponent($$result2, "DashboardHeader", $$DashboardHeader, { "data-astro-cid-hdplutls": true })} <div class="max-w-4xl w-full mx-auto backdrop-blur-md bg-slate-900/80 rounded-2xl border border-emerald-500/30 p-6 md:p-10 shadow-2xl relative overflow-hidden" data-astro-cid-hdplutls> <!-- Design Accents --> <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" data-astro-cid-hdplutls></div> <div class="mb-6 md:mb-8 border-l-4 border-emerald-400 pl-4 md:pl-6 relative z-10" data-astro-cid-hdplutls> <h2 class="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight" data-astro-cid-hdplutls>Asistente de Reportes</h2> <p class="text-slate-400 text-xs md:text-sm font-medium mt-1" data-astro-cid-hdplutls>Sincronización en tiempo real con la Red de Transporte Masivo</p> </div> <div class="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10" data-astro-cid-hdplutls> <!-- Watson Chat Area --> <div class="md:col-span-8 bg-slate-950 rounded-xl border border-slate-700 shadow-inner overflow-hidden flex flex-col h-[450px] md:h-[550px]" data-astro-cid-hdplutls> <div class="bg-slate-900 px-3 py-3 md:px-4 border-b border-slate-700 flex justify-between items-center" data-astro-cid-hdplutls> <div class="flex items-center gap-2" data-astro-cid-hdplutls> <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" data-astro-cid-hdplutls></div> <span class="text-[10px] md:text-[11px] font-bold text-slate-300 uppercase tracking-widest" data-astro-cid-hdplutls>Asistente Watson en Línea</span> </div> <span class="hidden sm:inline text-[10px] font-mono text-slate-500 uppercase" data-astro-cid-hdplutls>WSN-ASSIST-102</span> </div> <div id="chat-messages" class="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 font-['Inter'] text-sm custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" data-astro-cid-hdplutls> <!-- Initial Welcome --> <div class="flex justify-start" data-astro-cid-hdplutls> <div class="bg-blue-500/20 border border-indigo-500/30 text-indigo-100 p-3 md:p-4 rounded-2xl rounded-tl-none max-w-[90%] md:max-w-[85%]" data-astro-cid-hdplutls>
¡Hola! Soy tu asistente inteligente de Urban Copilot. ¿Qué evento te gustaría reportar hoy?
<div class="mt-3 flex flex-wrap gap-2" data-astro-cid-hdplutls> <button class="chip" onclick="startFlow('Accidente')" data-astro-cid-hdplutls>Accidente</button> <button class="chip" onclick="startFlow('Bloqueo')" data-astro-cid-hdplutls>Bloqueo</button> <button class="chip" onclick="startFlow('Manifestación')" data-astro-cid-hdplutls>Manifestación</button> <button class="chip" onclick="startFlow('Obras')" data-astro-cid-hdplutls>Obras</button> <button class="chip" onclick="startFlow('Falla Técnica')" data-astro-cid-hdplutls>Falla</button> <button class="chip" onclick="startFlow('Otro')" data-astro-cid-hdplutls>Otro</button> </div> </div> </div> </div> <div class="p-3 md:p-4 bg-slate-900 border-t border-slate-700 flex gap-2" data-astro-cid-hdplutls> <button id="btn-mic" class="p-2 md:p-2.5 bg-slate-800 text-slate-400 rounded-lg hover:text-emerald-400 transition-all border border-slate-700 active:scale-95" title="Reportar por voz" data-astro-cid-hdplutls> <svg id="mic-icon" class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-hdplutls><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 5v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" data-astro-cid-hdplutls></path></svg> </button> <input id="chat-input" type="text" placeholder="Escribe aquí..." class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 md:px-4 py-2 text-white text-sm md:text-base focus:outline-none focus:border-emerald-500 placeholder:text-slate-600" data-astro-cid-hdplutls> <button id="btn-send" class="p-2 md:p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all active:scale-95 shadow-lg shadow-red-600/20" data-astro-cid-hdplutls> <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-hdplutls><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-hdplutls></path></svg> </button> </div> </div> <!-- Recent Activity SidePanel --> <div class="md:col-span-4 flex flex-col gap-4" data-astro-cid-hdplutls> <div class="bg-slate-900/50 rounded-xl border border-slate-800 p-4 md:p-5 flex-1" data-astro-cid-hdplutls> <h3 class="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2" data-astro-cid-hdplutls> <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" data-astro-cid-hdplutls></span>
Actividad Reciente
</h3> <div id="reports-list" class="space-y-3 max-h-[300px] md:max-h-[450px] overflow-y-auto custom-scrollbar" data-astro-cid-hdplutls> <!-- Dynamically Loaded --> <p class="text-[10px] text-slate-500 italic" data-astro-cid-hdplutls>Sincronizando reportes...</p> </div> </div> </div> </div> </div> </main> ` }));
}, "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/reportes.astro", void 0);

const $$file = "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/reportes.astro";
const $$url = "/reportes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reportes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
