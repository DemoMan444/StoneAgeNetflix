<script setup>

import Video from '@/components/Video.vue';
import { usePiniaStore } from '@/stores/StoreForVideos'


const store = usePiniaStore();



</script>


<template>


           


            <div id="videos">
              
                    <Video v-once=video-container></Video>
                    <button @click="store.FirstmovieNrFunction()">Load the first movie</button>
                    <button @click="store.movieNrFunctionPlus()">Next movie</button>
                    <button @click="store.movieNrFunctionMinus()">Previous movie</button>
                   
            </div>

        
           
            <h3>Current videos link: {{ store.linkNr}}</h3>


           
            <button @click="store.DisplayMoreVideos">Display More Same Cartoons :D </button>

            
              
                    <Video :src="moreSameMovie"
                   
                   v-for="moreSameMovie in store.videosArray"
                   height="200"></Video>
                    
         
       
  
  
</template>

