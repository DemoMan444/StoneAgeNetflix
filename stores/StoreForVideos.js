import { defineStore, acceptHMRUpdate } from 'pinia';
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

export const usePiniaStore = defineStore('StoreForVideos', {
    state() {
        return {
            videosDisplayed: [],
            n: -1,
            movieNr: 0,
            linkNr: "",
            csv: [],
            videosArray: []
        };
    },
    getters: {

    },
    actions: {
        async initializeCsv(filePath) {
            this.csv = await loadCsvFile(filePath);
            this.linkNr = this.csv[0].link; // Initialize with the first link
        },

        FirstmovieNrFunction() {
            this.linkNr = this.csv[0].link;
            const image = document.getElementById("videoSrc");
            image.src = this.linkNr;
        },

        movieNrFunctionPlus() {
            this.movieNr++;
            this.linkNr = this.csv[this.movieNr].link;
            const image = document.getElementById("videoSrc");
            image.src = this.linkNr;
            return this.linkNr;
        },

        movieNrFunctionMinus() {
            this.movieNr--;
            this.linkNr = this.csv[this.movieNr].link;
            return this.linkNr;
        },

        DisplayMoreVideos() {
            const moreSameMovies = this.csv[this.movieNr].link;
            this.movieNr++;
            const newCard = moreSameMovies;
            this.videosArray.push(newCard);
            alert(moreSameMovies);
        },
    },
});

// Initializing the store with a CSV file
const store = usePiniaStore();
store.initializeCsv('./19CartoonsWithLinksFinal.csv');
