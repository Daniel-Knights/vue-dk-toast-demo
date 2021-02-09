<template>
    <div id="code-preview">
        <code @click="copyCode($event)">
            <div>this.$toast('{{ text }}', {</div>
            <div class="preview-inner">
                <div>duration: {{ duration }},</div>
                <div v-if="Object.keys(styles).length">
                    <div>
                        styles: {
                    </div>
                    <div class="preview-values">
                        <div v-for="style in displayStyles" :key="style">{{ style }}</div>
                    </div>
                    <div>
                        },
                    </div>
                </div>
                <div v-if="slots.left">
                    <div>
                        slotLeft: `
                    </div>
                    <div class="preview-values">{{ slots.left }}</div>
                    <div>`,</div>
                </div>
                <div v-if="slots.right">
                    <div>
                        slotRight: `
                    </div>
                    <div class="preview-values">{{ slots.right }}</div>
                    <div>`</div>
                </div>
            </div>
            <div>
                });
            </div>
        </code>
    </div>
</template>

<script>
export default {
    name: 'App',

    props: {
        text: { type: String, required: true },
        duration: { type: Number, required: true },
        styles: { type: Object, required: true },
        slots: { type: Object, required: true }
    },

    computed: {
        displayStyles: function() {
            return Object.keys(this.styles).map(style => {
                return `${style}: ${this.styles[style]};`
            })
        }
    },

    methods: {
        copyCode(e) {
            navigator.clipboard.writeText(e.target.innerText)
            this.$toast('Copied!')
        }
    }
}
</script>

<style>
#code-preview {
    display: block;
    position: absolute;
    top: 50vh;
    left: calc(50vw + 100px);
    width: 30vw;
    height: fit-content;
    text-align: left;
    font-size: 1.5em;
    word-wrap: break-word;
    letter-spacing: 1px;
    border-radius: 5px;
}

#code-preview code {
    cursor: pointer;
    display: block;
    position: fixed;
    margin: 0 auto;
    padding-top: 20px;
    width: 400px;
    hyphens: auto;
    transform: translateY(-50%);
}

#code-preview div {
    pointer-events: none;
    display: block;
    hyphens: auto;
}

#code-preview code::before {
    content: '📋COPY';
    position: absolute;
    top: 0;
    left: 50%;
    width: fit-content;
    opacity: 0;
    transform: translate(-50%, 0);
    transition: all 0.15s;
}
#code-preview code:hover::before {
    opacity: 1;
    transform: translate(-50%, -50%);
}

.preview-inner {
    padding-left: 30px;
}
.preview-values {
    padding-left: 30px;
}

@media only screen and (max-width: 950px) {
    #app {
        grid-template-columns: 100%;
    }

    #code-preview {
        display: none;
    }
}
</style>
