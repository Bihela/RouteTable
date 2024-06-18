import { ref } from 'vue';

export default function useTravelRoute() {
  const route = ref(null);
  const error = ref(null);

  const fetchRoute = async (request) => {
    try {
      console.log('Sending request:', request);
      
      const response = await fetch('https://localhost:7221/Home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      console.log('Received response:', response);
      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = JSON.stringify(errorData);
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError);
        }
        throw new Error(`API error: ${response.statusText} - ${errorMessage}`);
      }

      try {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        route.value = responseData;
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error('Error parsing response data');
      }
      
    } catch (err) {
      console.error('Fetch error:', err);
      error.value = err;
    }
  };

  return { route, error, fetchRoute };
}
