<template>
  <div class="app-container">
    <h1>TravelRoute</h1>
    <form @submit.prevent="submitForm" class="form-container">
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
    <div v-if="route" class="trip-container">
      <h1>{{ route.title }}</h1>
      <p class="description">{{ route.description }}</p>
      <div class="trip-details">
        <div class="region-currency">
          <p><strong>Region:</strong> {{ route.region }}</p>
          <p><strong>Currency:</strong> {{ route.currency }}</p>
        </div>
        <div class="plan">
          <div v-for="day in route.plan" :key="day.day" class="day-plan">
            <h2>Day {{ day.day }}: {{ day.destination }}</h2>
            <p><strong>Distance:</strong> {{ day.distance }}</p>
            <p><strong>Duration:</strong> {{ day.duration }}</p>
            <ul>
              <li v-for="activity in day.activities" :key="activity">{{ activity }}</li>
            </ul>
          </div>
        </div>
      </div>
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.app-container {
  font-family: 'Roboto', sans-serif;
  padding: 2em;
  background: hsl(0, 0%, 100%);
  color: #2c3e50;
  max-width: 1500px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #f76234; 
  margin-bottom: 1em;
}

.description {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2em;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background: #ffffff;
  border-radius: 8px;
  max-width: 600px;
  margin: 2em auto;
  box-shadow: 0 0 10px rgb(240, 72, 6);
}

form div {
  margin-bottom: 1em;
  width: 100%;
}

label {
  display: block;
  color: #2c3e50;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ecf0f1;
  border-radius: 4px;
}

button {
  padding: 0.5em 1em;
  background-color: #e2725b; 
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #008080; 
}

.trip-container {
  padding: 2em;
  background: #f8f9fa;
  border-radius: 8px;
  max-width: 800px;
  margin: 2em auto;
  box-shadow: 0 0 10px rgb(255, 95, 2);
}

.trip-details {
  padding: 1em;
  background: #ffffff;
  border-radius: 8px;
}

.region-currency {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
}

.region-currency p {
  margin: 0;
  color: #2c3e50;
}

.plan .day-plan {
  margin-bottom: 2em;
}

.day-plan h2 {
  color: #008080; 
  margin-bottom: 0.5em;
}

.day-plan p {
  color: #2c3e50;
  margin: 0.5em 0;
}

.day-plan ul {
  list-style-type: none;
  padding: 0;
  margin: 0.5em 0;
}

.day-plan ul li {
  background: #ecf0f1;
  padding: 0.5em;
  border-radius: 4px;
  margin-bottom: 0.5em;
  color: #2c3e50;
}

pre {
  background: #ecf0f1;
  padding: 1em;
  border-radius: 4px;
}
</style>
