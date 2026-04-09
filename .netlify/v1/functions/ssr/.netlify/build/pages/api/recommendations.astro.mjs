export { renderers } from '../../renderers.mjs';

const API_URL = "http://localhost:8000";
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const response = await fetch(`${API_URL}/api/v1/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to get recommendation" }), {
        status: response.status
      });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
