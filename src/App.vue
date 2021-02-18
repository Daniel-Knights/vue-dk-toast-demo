<template>
    <h1>🍞 VUE-DK-TOAST 🍞</h1>
    <Playground
        v-model:duration.number="duration"
        v-model:text="text"
        v-model:styles="styles"
        v-model:slotsLeft="slots.left"
        v-model:slotsRight="slots.right"
        v-model:className="className"
        v-model:type="type"
        v-model:positionX="positionX"
        v-model:positionY="positionY"
        v-model:disableClick="disableClick"
        v-model:href="link.href"
        v-model:targetBlank="link.targetBlank"
    />
    <CodePreview
        :text="text"
        :duration="duration"
        :styles="styles"
        :slots="slots"
        :className="className"
        :type="type"
        :positionX="positionX"
        :positionY="positionY"
        :disableClick="disableClick"
        :link="link"
    />
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
        slots: { left: '🍞', right: '🍞' },
        className: 'toast',
        type: '',
        positionX: '',
        positionY: '',
        disableClick: false,
        link: { href: '', targetBlank: false }
    })
}
</script>

<style lang="scss">
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
