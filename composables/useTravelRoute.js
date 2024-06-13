//composables/useTravelRoute.js
import { ref } from 'vue'

export default function useTravelRoute() {
  const route = ref(null)
  const error = ref(null)

  const fetchRoute = async (request) => {
    try {
      console.log('Sending request:', request);
      const response = await fetch('http://localhost:7221/Home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      console.log('Received response:', response);

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      route.value = await response.json();
    } catch (err) {
      console.error('Fetch error:', err);
      error.value = err;
    }
  }

  return { route, error, fetchRoute };
}
