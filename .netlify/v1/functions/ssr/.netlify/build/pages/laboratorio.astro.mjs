/* empty css                                 */
import { f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DXssHrC_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DEmLSqtz.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Laboratorio = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '  <script>\n  var isTraining = false;\n  var logs = [\n    "Iniciando ingesta de datos GeoJSON...",\n    "Validando topolog\xEDa de red CDMX...",\n    "Procesando Metro L\xEDnea 1 (20 estaciones)",\n    "Identificando Hub: Pantitl\xE1n",\n    "Ajustando coeficiente de carga para Hub: Tacubaya",\n    "Optimizando Red Lineal Metrob\xFAs L7...",\n    "Refinando predicci\xF3n para estaciones Cableb\xFAs...",\n    "C\xE1lculo de error residuo completado (MSE: 0.042)",\n    "Aplicando pesos ponderados por nodo...",\n    "Actualizando base de datos local station_weights.csv...",\n    "Sincronizaci\xF3n de modelo v1.1.0 exitosa",\n  ];\n\n  document.addEventListener("DOMContentLoaded", function () {\n    var btn = document.getElementById("btn-start-train");\n    var consoleDiv = document.getElementById("log-console");\n    var progBar = document.getElementById("progress-bar");\n    var progContainer = document.getElementById("progress-bar-container");\n    var statAcc = document.getElementById("stat-accuracy");\n    var statSam = document.getElementById("stat-samples");\n\n    btn.addEventListener("click", function () {\n      if (isTraining) return;\n      isTraining = true;\n      btn.disabled = true;\n      btn.style.opacity = "0.5";\n      consoleDiv.innerHTML = "";\n      progContainer.classList.remove("hidden");\n\n      var index = 0;\n      var interval = setInterval(function () {\n        if (index < logs.length) {\n          var p = document.createElement("p");\n          p.textContent = "> " + logs[index];\n          consoleDiv.appendChild(p);\n          consoleDiv.scrollTop = consoleDiv.scrollHeight;\n          progBar.style.width = ((index + 1) / logs.length) * 100 + "%";\n          index++;\n        } else {\n          clearInterval(interval);\n          finishTraining();\n        }\n      }, 350);\n    });\n\n    function finishTraining() {\n      fetch("/api/v1/occupancy/train", { method: "POST" })\n        .then(function (r) {\n          return r.json();\n        })\n        .then(function (data) {\n          statAcc.textContent = data.new_accuracy + "%";\n          statSam.textContent = data.total_samples.toLocaleString();\n\n          var p = document.createElement("p");\n          p.style.color = "#10b981";\n          p.style.fontWeight = "bold";\n          p.textContent =\n            ">> ENTRENAMIENTO COMPLETADO. VERSI\xD3N: " + data.version;\n          consoleDiv.appendChild(p);\n\n          isTraining = false;\n          btn.disabled = false;\n          btn.style.opacity = "1";\n          alert("\xA1Modelo optimizado! Precisi\xF3n: " + data.new_accuracy + "%");\n        });\n    }\n  });\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, { "title": "UCAI Lab - Entrenamiento de IA", "data-astro-cid-hkky7lif": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen pt-24 px-6 mb-12 flex flex-col items-center" data-astro-cid-hkky7lif> <div class="max-w-4xl w-full mx-auto backdrop-blur-md bg-slate-900/80 rounded-2xl border border-indigo-500/30 p-10 shadow-2xl relative overflow-hidden" data-astro-cid-hkky7lif> <!-- Design Accents --> <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" data-astro-cid-hkky7lif></div> <header class="mb-8 md:mb-12 border-l-4 border-indigo-400 pl-4 md:pl-6 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" data-astro-cid-hkky7lif> <div data-astro-cid-hkky7lif> <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight" data-astro-cid-hkky7lif>
Laboratorio de AI
</h1> <p class="text-slate-400 text-sm font-medium mt-1 md:mt-2" data-astro-cid-hkky7lif>
Optimización del modelo generativo (UCAI-v1.1)
</p> </div> <a href="/" class="w-full md:w-auto text-center px-6 py-2 bg-blue-900/40 hover:bg-blue-800/60 text-indigo-300 border border-blue-400/40 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 font-bold backdrop-blur-md" data-astro-cid-hkky7lif>
Volver
</a> </header> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 relative z-10" data-astro-cid-hkky7lif> <!-- Stats Cards --> <div class="bg-indigo-950/30 p-4 md:p-5 rounded-xl border border-indigo-500/20 text-center" data-astro-cid-hkky7lif> <p class="text-[10px] text-indigo-300 uppercase font-bold tracking-widest mb-1 md:mb-2" data-astro-cid-hkky7lif>
Precisión
</p> <p id="stat-accuracy" class="text-2xl md:text-3xl font-black text-white" data-astro-cid-hkky7lif>
92.8%
</p> </div> <div class="bg-indigo-950/30 p-4 md:p-5 rounded-xl border border-indigo-500/20 text-center" data-astro-cid-hkky7lif> <p class="text-[10px] text-indigo-300 uppercase font-bold tracking-widest mb-1 md:mb-2" data-astro-cid-hkky7lif>
Muestras
</p> <p id="stat-samples" class="text-2xl md:text-3xl font-black text-white" data-astro-cid-hkky7lif>
10,170
</p> </div> <div class="bg-indigo-950/30 p-4 md:p-5 rounded-xl border border-indigo-500/20 text-center sm:col-span-2 md:col-span-1" data-astro-cid-hkky7lif> <p class="text-[10px] text-indigo-300 uppercase font-bold tracking-widest mb-1 md:mb-2" data-astro-cid-hkky7lif>
Red
</p> <p class="text-2xl md:text-3xl font-black text-emerald-400" data-astro-cid-hkky7lif>
Estable
</p> </div> <!-- Training Console --> <div class="md:col-span-2 bg-slate-950 rounded-xl border border-slate-700 shadow-inner overflow-hidden flex flex-col h-[300px] md:h-[400px]" data-astro-cid-hkky7lif> <div class="bg-slate-900 px-4 py-2 border-bottom border-slate-700 flex justify-between items-center text-[11px] font-mono text-slate-500" data-astro-cid-hkky7lif> <span data-astro-cid-hkky7lif>TERMINAL DE ENTRENAMIENTO</span> <div class="flex gap-1.5" data-astro-cid-hkky7lif> <div class="w-2.5 h-2.5 rounded-full bg-red-500/40" data-astro-cid-hkky7lif></div> <div class="w-2.5 h-2.5 rounded-full bg-amber-500/40" data-astro-cid-hkky7lif></div> <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/40" data-astro-cid-hkky7lif></div> </div> </div> <div id="log-console" class="p-6 font-mono text-xs text-indigo-400 overflow-y-auto space-y-1 custom-scrollbar leading-relaxed" data-astro-cid-hkky7lif> <p data-astro-cid-hkky7lif>> Esperando secuencia de entrenamiento...</p> </div> <div class="p-4 bg-slate-900/50 border-t border-slate-800" data-astro-cid-hkky7lif> <div id="progress-bar-container" class="hidden w-full h-2 bg-slate-800 rounded-full overflow-hidden" data-astro-cid-hkky7lif> <div id="progress-bar" class="w-0 h-full bg-indigo-500 transition-all duration-300" data-astro-cid-hkky7lif></div> </div> </div> </div> <!-- Controls --> <div class="flex flex-col gap-4" data-astro-cid-hkky7lif> <div class="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50 flex-1" data-astro-cid-hkky7lif> <h3 class="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider" data-astro-cid-hkky7lif>
Parámetros
</h3> <div class="space-y-4" data-astro-cid-hkky7lif> <div data-astro-cid-hkky7lif> <label class="block text-[10px] text-slate-500 uppercase font-bold mb-1" data-astro-cid-hkky7lif>Algoritmo</label> <select class="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300" data-astro-cid-hkky7lif> <option data-astro-cid-hkky7lif>Gradient Boosting</option> <option data-astro-cid-hkky7lif>Random Forest (Optimized)</option> <option data-astro-cid-hkky7lif>Neural Network v2</option> </select> </div> <div class="flex items-center justify-between" data-astro-cid-hkky7lif> <span class="text-xs text-slate-400" data-astro-cid-hkky7lif>Auto-Refine Weights</span> <div class="w-8 h-4 bg-indigo-500 rounded-full" data-astro-cid-hkky7lif></div> </div> </div> </div> <button id="btn-start-train" class="w-full py-5 bg-blue-500 hover:bg-blue-400 text-white font-black rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex flex-col items-center justify-center gap-1" data-astro-cid-hkky7lif> <span class="text-lg uppercase" data-astro-cid-hkky7lif>Ejecutar Ciclo de Entrenamiento</span> <span class="text-[9px] text-indigo-200 opacity-60" data-astro-cid-hkky7lif>Sincroniza 10,170 estaciones (Pantitlán Hub incl.)</span> </button> </div> </div> <div class="mt-12 relative z-10" data-astro-cid-hkky7lif> <h2 class="text-xl font-bold text-indigo-300 mb-6 flex items-center gap-2" data-astro-cid-hkky7lif> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-hkky7lif><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-hkky7lif></path></svg>
Módulo de Inteligencia IBM Granite
</h2> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-astro-cid-hkky7lif> <!-- Point 1 --> <div class="bg-indigo-900/10 border border-indigo-500/20 p-5 rounded-xl hover:border-blue-400/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-indigo-200 font-bold mb-2" data-astro-cid-hkky7lif>
1. Pronóstico 24h (Forecasting)
</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>
Predicción activa de flujos futuros. Usa modelos temporales para
              anticipar la carga en andenes con 24 horas de antelación.
</p> </div> <!-- Point 2 --> <div class="bg-indigo-900/10 border border-indigo-500/20 p-5 rounded-xl hover:border-blue-400/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-indigo-200 font-bold mb-2" data-astro-cid-hkky7lif>
2. Detección de Anomalías
</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>
Identifica desviaciones críticas en la red (marchas, fallas o
              clima) comparando la realidad contra la tendencia histórica de
              Granite.
</p> </div> <!-- Point 3 --> <div class="bg-indigo-900/10 border border-indigo-500/20 p-5 rounded-xl hover:border-blue-400/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-indigo-200 font-bold mb-2" data-astro-cid-hkky7lif>
3. Inferencia TTFM (Velocidad)
</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>
Implementación de Tiny Time Series Foundation Models.
              Procesamiento ultrarrápido para el monitoreo simultáneo de 10k+
              estaciones.
</p> </div> <!-- Point 4 --> <div class="bg-indigo-900/10 border border-indigo-500/20 p-5 rounded-xl hover:border-blue-400/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-indigo-200 font-bold mb-2" data-astro-cid-hkky7lif>
4. Zero-Shot Insights
</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>
Capacidad de razonamiento sobre movilidad sin historial previo,
              heredando el conocimiento de los modelos fundamentales de IBM.
</p> </div> </div> </div> <div class="mt-12 relative z-10" data-astro-cid-hkky7lif> <h2 class="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-2" data-astro-cid-hkky7lif> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-hkky7lif><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.574.346l-2.387-.477a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 002.828 2.828l2.387-2.387a2 2 0 011.022-.547l2.387.477a6 6 0 003.86-.517l.675-.337a4 4 0 002.574-.346l2.387.477a2 2 0 011.022.547l2.387 2.387a2 2 0 002.828-2.828l-2.387-2.387zM5 10a2 2 0 110-4 2 2 0 010 4zm14 0a2 2 0 110-4 2 2 0 010 4zm-7 2a2 2 0 100-4 2 2 0 000 4z" data-astro-cid-hkky7lif></path></svg>
Optimización con IBM AutoAI
</h2> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-astro-cid-hkky7lif> <!-- Point 1 --> <div class="bg-cyan-900/10 border border-cyan-500/20 p-5 rounded-xl hover:border-cyan-500/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-cyan-200 font-bold mb-2" data-astro-cid-hkky7lif>1. Feature Engineering Automática</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>Detecta patrones geográficos en los GeoJSON crudos y extrae variables de importancia (Hubs, Terminales) sin intervención humana.</p> </div> <!-- Point 2 --> <div class="bg-cyan-900/10 border border-cyan-500/20 p-5 rounded-xl hover:border-cyan-500/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-cyan-200 font-bold mb-2" data-astro-cid-hkky7lif>2. Unificación de Datos Crudos</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>Resuelve inconsistencias en los nombres y esquemas de los archivos del directorio /data, creando un dataset maestro normalizado.</p> </div> <!-- Point 3 --> <div class="bg-cyan-900/10 border border-cyan-500/20 p-5 rounded-xl hover:border-cyan-500/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-cyan-200 font-bold mb-2" data-astro-cid-hkky7lif>3. Selección de Pipelines</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>Compite entre diversos algoritmos de ML para elegir el que mejor predice la afluencia específica de la Ciudad de México.</p> </div> <!-- Point 4 --> <div class="bg-cyan-900/10 border border-cyan-500/20 p-5 rounded-xl hover:border-cyan-500/40 transition-all" data-astro-cid-hkky7lif> <h3 class="text-cyan-200 font-bold mb-2" data-astro-cid-hkky7lif>4. Código Grado Producción</h3> <p class="text-[11px] text-slate-400 leading-relaxed" data-astro-cid-hkky7lif>Exporta el modelo optimizado como código Python listo para despliegues de alto rendimiento y escalabilidad masiva.</p> </div> </div> </div> <div class="mt-12 text-center text-[10px] text-slate-600 font-mono italic" data-astro-cid-hkky7lif>
Nota: El entrenamiento utiliza los pesos geográficos de la red oficial
        de CDMX procesados con lógica Granite Time Series y optimizados vía AutoAI.
</div> </div> </main> ` }));
}, "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/laboratorio.astro", void 0);

const $$file = "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/laboratorio.astro";
const $$url = "/laboratorio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Laboratorio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
