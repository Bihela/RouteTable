
<!-- Pages/index.vue -->
<template>
  <div>
    <h1>TravelRoute</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="startLocation">Start Location:</label>
        <input id="startLocation" v-model="form.startLocation" required />
      </div>
      <div>
        <label for="finishLocation">Finish Location:</label>
        <input id="finishLocation" v-model="form.finishLocation" required />
      </div>
      <div>
        <label for="continuationPoints">Continuation Points (comma-separated):</label>
        <input id="continuationPoints" v-model="form.continuationPoints" />
      </div>
      <div>
        <label for="departureDate">Departure Date:</label>
        <input id="departureDate" type="datetime-local" v-model="form.departureDate" required />
      </div>
      <div>
        <label for="duration">Duration (in days):</label>
        <input id="duration" type="number" v-model="form.duration" required />
      </div>
      <button type="submit">Generate Route</button>
    </form>
    <div v-if="route">
      <h2>Generated Route</h2>
      <pre>{{ route }}</pre>
    </div>
    <div v-if="error">
      <h2>Error</h2>
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useTravelRoute from '~/composables/useTravelRoute'

const form = ref({
  startLocation: '',
  finishLocation: '',
  continuationPoints: '',
  departureDate: '',
  duration: ''
})

const { route, error, fetchRoute } = useTravelRoute()

const submitForm = () => {
  const request = {
    StartLocation: form.value.startLocation,
    FinishLocation: form.value.finishLocation,
    ContinuationPoints: form.value.continuationPoints ? form.value.continuationPoints.split(',').map(p => p.trim()) : null,
    DepartureDate: new Date(form.value.departureDate).toISOString(),
    Duration: parseInt(form.value.duration, 10)
  }

  console.log('Submitting form with request:', request);
  fetchRoute(request)
}
</script>

<style scoped>
form div {
  margin-bottom: 1em;
}

label {
  display: block;
}

button {
  padding: 0.5em 1em;
}

pre {
  background: #f4f4f4;
  padding: 1em;
  border-radius: 4px;
}
</style>
