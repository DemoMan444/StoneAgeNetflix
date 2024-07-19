<template>
  <h1>Cartoon Details</h1>

  <div v-if="cartoonDetailsSelected">
    <div v-for="(value, key) in cartoonDetailsSelected" :key="key">
      <p>{{ key }}: {{ value }}</p>
    </div>
    <NuxtLink :to="`/allMovies`">Go back</NuxtLink>
    <hr />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Papa from 'papaparse';

// Function to load and parse the CSV file
async function loadCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            resolve(results.data);
          },
          error: (error) => {
            reject(error);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Reactive state to hold the CSV data
const csvData = reactive([]);

// Get route information
const route = useRoute();
const id = route.params.id;

// Reactive state to hold selected cartoon details
const cartoonDetailsSelected = reactive({});

// Load the CSV data on component mount
onMounted(async () => {
  const data = await loadCsvFile('/19CartoonsWithLinksFinal.csv'); // Path to your CSV file in the public directory
  csvData.push(...data);
  const selectedCartoon = csvData.find(cartoon => cartoon.id == id);
  if (selectedCartoon) {
    Object.assign(cartoonDetailsSelected, selectedCartoon);
  }
});
</script>
