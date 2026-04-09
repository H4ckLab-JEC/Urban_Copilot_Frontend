/* empty css                                 */
import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DXssHrC_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DEmLSqtz.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - P\xE1gina no encontrada" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto py-20"> <h1 class="text-4xl font-bold text-center">404</h1> <p class="text-center text-xl mt-4">Página no encontrada</p> </div> ` })}`;
}, "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/404.astro", void 0);

const $$file = "/Users/leonelmendiola/Urban_Copilot_Frontend/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
