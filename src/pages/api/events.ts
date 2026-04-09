import type { APIRoute } from 'astro';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const GET: APIRoute = async ({ request }) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/events`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
        status: response.status,
      });
    }
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};
