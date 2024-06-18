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
        <label>Continuation Points:</label>
        <div v-for="(point, index) in form.continuationPoints" :key="index" class="continuation-point">
          <input :value="point" @input="updateContinuationPoint($event, index)" />
          <button type="button" @click="removeContinuationPoint(index)">Remove</button>
        </div>
        <button type="button" @click="addContinuationPoint">Add Continuation Point</button>
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
    <div v-if="isLoading" class="loading-bar">Loading...</div>
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
  continuationPoints: [''], // Initialize with one empty point
  departureDate: '',
  duration: ''
})

const { route, error, isLoading, fetchRoute } = useTravelRoute() // Include isLoading

const addContinuationPoint = () => {
  form.value.continuationPoints.push('')
}

const removeContinuationPoint = (index) => {
  form.value.continuationPoints.splice(index, 1)
}

const updateContinuationPoint = (event, index) => {
  form.value.continuationPoints[index] = event.target.value
}

const submitForm = () => {
  const request = {
    StartLocation: form.value.startLocation,
    FinishLocation: form.value.finishLocation,
    ContinuationPoints: form.value.continuationPoints.filter(point => point.trim() !== ''), // Filter out empty points
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

.loading-bar {
  margin-top: 1em;
  font-size: 1.2em;
  color: #e2725b; 
  text-align: center;
}

.trip-container {
  padding: 2em;
  background: #f8f9fa;
  border-radius: 8px;
  max-width: 800px;
  margin: 2em auto;
  box-shadow: 0 0 10px rgb(233, 87, 3);
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

.continuation-point {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.continuation-point input {
  flex: 1;
  margin-right: 1em;
}

.continuation-point button {
  padding: 0.5em 1em;
  background-color: #e2725b; 
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.continuation-point button:hover {
  background-color: #008080; 
}
</style>
