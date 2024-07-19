<template>
    <audio
        @ended="
            () => {
                isPlaying = false;
            }
        "
        :src="sound.filename"
        ref="audio"></audio>
    <button
        class="m-2 p-2 border-solid border-2 border-sky-500"
        @click="playSound"
        :class="{ playing: isPlaying }">
        {{ sound.name }}
    </button>
</template>

<script setup>
defineProps(['sound']);

const audio = ref();
const isPlaying = ref(false);

function playSound() {
    audio.value.play();
    isPlaying.value = true;
}
</script>
