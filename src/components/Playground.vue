<template>
    <main id="content">
        <div id="duration" class="property">
            <label>Duration:</label>
            <div id="duration-slider">
                <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="100"
                    v-model.number="duration"
                />
                <span>
                    {{ duration }}
                </span>
            </div>
        </div>
        <div id="text" class="property">
            <label>Text:</label>
            <input
                type="text"
                v-model="text"
                :class="{ valid: valid, invalid: valid === false }"
            />
        </div>
        <form @submit.prevent="addRule()" id="styles" class="property">
            <label>Styles:</label>
            <div id="styles-inputs">
                <input type="text" v-model="styleProperty" />:
                <input type="text" v-model="styleValue" />;
            </div>
            <input type="submit" value="Add Rule" />
            <div id="code-styles">
                <div v-for="style in displayStyles" :key="style" class="code-style">
                    <code>{{ style }}</code
                    ><i @click="filterRule(style)" class="fa fa-times"></i>
                </div>
            </div>
        </form>
        <div class="property">
            <label>Slot-Left:</label>
            <textarea
                v-model="slots.left"
                :class="{ valid: valid, invalid: valid === false }"
            />
            <p>
                Any valid HTML can go here. Fontawesome and Material Icons are loaded into
                this demo, give it a try:
                <code @click="copyIcon(0, 'left')" class="icon-examples"
                    >&lt;i class="fa fa-thumbs-up"&gt;&lt;/i&gt;</code
                >
                <code @click="copyIcon(1, 'left')" class="icon-examples"
                    >&lt;span class="material-icons">thumb_up&lt;/span></code
                >
                <small>
                    Note: <code class="code-note">&lt;span&gt;</code> and
                    <code class="code-note">&lt;i&gt;</code> are
                    <code class="code-note">position: absolute;</code> by default.
                </small>
            </p>
        </div>
        <div class="property">
            <label>Slot-Right:</label>
            <textarea
                v-model="slots.right"
                :class="{ valid: valid, invalid: valid === false }"
            />
            <p>
                Same as <code class="code-note">slotLeft</code> but positioned to the
                right
                <code @click="copyIcon(0, 'right')" class="icon-examples"
                    >&lt;i class="fa fa-thumbs-up"&gt;&lt;/i&gt;</code
                >
                <code @click="copyIcon(1, 'right')" class="icon-examples"
                    >&lt;span class="material-icons">thumb_up&lt;/span></code
                >
            </p>
        </div>
        <button @click="toast()" id="create-toast">CREATE TOAST</button>
    </main>
</template>

<script>
import { sanitize } from 'dompurify'

export default {
    name: 'Playground',

    data() {
        return {
            duration: 5000,
            positionX: 'right',
            positionY: 'bottom',
            styles: {},
            styleProperty: '',
            styleValue: '',
            text: 'Hello there!',
            slots: { left: '🍞', right: '🍞' },
            valid: null
        }
    },

    computed: {
        displayStyles: function() {
            return Object.keys(this.styles).map(style => {
                return `${style}: ${this.styles[style]};`
            })
        }
    },

    methods: {
        toast() {
            if (!this.text && !this.slots.left && !this.slots.right) this.valid = false
            else this.valid = true

            this.$toast(this.text, {
                duration: this.duration,
                styles: this.styles,
                slotLeft: sanitize(this.slots.left),
                slotRight: sanitize(this.slots.right)
            })
        },
        copyIcon(library, pos) {
            this.slots[pos] =
                library === 0
                    ? '<i class="fa fa-thumbs-up"></i>'
                    : '<span class="material-icons">thumb_up</span>'
        },
        addRule() {
            if (!this.styleValue || !this.styleProperty) return

            this.styles[this.styleProperty] = this.styleValue
        },
        filterRule(style) {
            delete this.styles[style.split(':')[0]]
        }
    }
}
</script>

<style>
.property {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 20px auto;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 8px -2px rgb(0 0 0);
}

p {
    margin-top: 10px;
}
p .icon-examples {
    cursor: pointer;
    display: block;
    white-space: pre-wrap;
    margin: 10px auto;
    max-width: 340px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}
p .icon-examples:hover {
    color: #6db8f5;
    background: rgba(0, 0, 0, 0.8);
}
p .code-note {
    padding: 2px 5px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #6db8f5;
    border-radius: 5px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
}

#styles [type='submit'] {
    margin: 10px auto;
    width: 150px;
}
#styles-inputs input {
    width: 40%;
}
#code-styles {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.code-style {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: left;
    width: 50%;
    padding: 2px;
}
.code-style code {
    width: 100%;
}
.code-style i {
    cursor: pointer;
    position: absolute;
    right: 0;
    font-size: 1em;
}

#create-toast {
    margin-bottom: 40px;
    width: 100%;
    max-width: 250px;
}
</style>
