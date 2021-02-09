<template>
    <h1>🍞 VUE-DK-TOAST 🍞</h1>
    <Playground
        v-model:duration.number="duration"
        v-model:text="text"
        v-model:styles="styles"
        v-model:slotsLeft="slots.left"
        v-model:slotsRight="slots.right"
    />
    <CodePreview :text="text" :duration="duration" :styles="styles" :slots="slots" />
</template>

<script>
import Playground from './components/Playground/Playground.vue'
import CodePreview from './components/CodePreview.vue'

export default {
    name: 'App',

    components: { Playground, CodePreview },

    data: () => ({
        styles: {},
        duration: 5000,
        text: 'Hello there!',
        slots: { left: '🍞', right: '🍞' }
    })
}
</script>

<style>
#app {
    display: grid;
    grid-template-columns: 45vw 45vw;
    grid-template-rows: 100px auto;
    justify-content: center;
    margin: 40px 0;
    min-height: 100vh;
}

h1 {
    grid-column: 1 / 3;
}

@media only screen and (max-width: 950px) {
    #app {
        grid-template-columns: 100%;
    }
}
</style>
