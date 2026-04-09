import { f as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_DXssHrC_.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$DashboardHeader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="absolute top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-slate-900/40 backdrop-blur-md border-b border-white/10 pointer-events-none"> <div class="pointer-events-auto flex items-center gap-4"> <a href="/" class="p-2 bg-slate-800/50 rounded-lg border border-white/10 text-white hover:bg-slate-700 transition-all"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> </a> <h1 class="text-lg md:text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-500 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
Urban Copilot AI
</h1> </div> <div id="map-status" class="pointer-events-auto px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2"> <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">AI Conectada</span> </div> </header>`;
}, "/Users/leonelmendiola/Urban_Copilot_Frontend/src/components/DashboardHeader.astro", void 0);

export { $$DashboardHeader as $ };
