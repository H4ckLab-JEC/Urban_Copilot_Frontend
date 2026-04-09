import { f as createComponent, k as renderSlot, l as renderHead, r as renderTemplate, i as createAstro } from './astro/server_DXssHrC_.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Urban Copilot AI</title><!-- Import Outfit font for modern AI look --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&display=swap" rel="stylesheet">${renderSlot($$result, $$slots["head"])}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="bg-gradient-to-b from-[#030712] via-[#0a1329] to-[#030712] min-h-screen text-slate-200"> <!-- Ambient glowing backgrounds orb --> <div class="pointer-events-none fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div> <div class="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/10 blur-[100px]"></div> <div class="relative z-10"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/Users/leonelmendiola/Urban_Copilot_Frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
