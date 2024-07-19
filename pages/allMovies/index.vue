<template>
  <h1>All Cartoons Listed</h1>

  <div v-for="(value, index) in csvData" :key="index">
    <h1>{{ value.title }}</h1>
    <h3>{{ value.id }}</h3>
    <p>{{ value.overview }}</p>

    <NuxtLink :to="`/allMovies/${value.id}`">Go to Details</NuxtLink>
    <hr />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
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

// Load the CSV data on component mount
onMounted(async () => {
  csvData.push(...await loadCsvFile('/19CartoonsWithLinksFinal.csv')); // Path to your CSV file in the public directory
});
</script>
