<template>
    <h1>vue-dk-toast</h1>

    <code id="code-preview">
        <pre>
    this.$toast('{{ text }}', {
        duration: {{ duration }},
        styles: {
            <div id="preview-styles">
            <div v-for="style in displayStyles" :key="style">{{ style }}</div>
            </div>
        },
        slot: `<div id="preview-slot">{{ slot }}</div>
    </pre>
        <pre>
        `
    });
    </pre
        >
    </code>

    <div id="duration" class="property">
        <label>Duration:</label>
        <div id="duration-slider">
            <input type="range" min="1000" max="100000" step="100" v-model.number="duration" />
            {{ duration }}
        </div>
    </div>
    <div id="text" class="property">
        <label>Text:</label>
        <input type="text" v-model="text" :class="{ valid: valid, invalid: valid === false }" />
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
    <div id="icon" class="property">
        <label>Slot:</label>
        <textarea v-model="slot" :class="{ valid: valid, invalid: valid === false }" />
        <p>
            Any valid HTML can go here. Fontawesome and Material Icons are loaded into this demo,
            give it a try:
            <code @click="copyIcon(0)" class="icon-examples"
                >&lt;i class="fa fa-thumbs-up"&gt;&lt;/i&gt;</code
            >
            <code @click="copyIcon(1)" class="icon-examples"
                >&lt;span class="material-icons">thumb_up&lt;/span></code
            >
            <small>
                Note: <code class="code-note">&lt;span&gt;</code> and
                <code class="code-note">&lt;i&gt;</code> are
                <code class="code-note">position: absolute;</code> by default.
            </small>
        </p>
    </div>
    <button @click="toast()" id="create-toast">Create Toast</button>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            duration: 1000,
            positionX: 'right',
            positionY: 'bottom',
            styles: {},
            styleProperty: '',
            styleValue: '',
            text: '',
            slot: '',
            valid: null,
        };
    },

    computed: {
        displayStyles: function() {
            return Object.keys(this.styles).map(style => {
                return `${style}: ${this.styles[style]};`;
            });
        },
    },

    methods: {
        toast() {
            if (!this.text && !this.slot) this.valid = false;
            else this.valid = true;

            this.$toast(this.text, {
                duration: this.duration,
                styles: this.styles,
                slot: this.slot,
            });
            console.log(this.styles);
        },
        copyIcon(library) {
            this.slot =
                library === 0
                    ? '<i class="fa fa-thumbs-up"></i>'
                    : '<span class="material-icons">thumb_up</span>';
        },
        addRule() {
            this.styles[this.styleProperty] = this.styleValue;
        },
        filterRule(style) {
            delete this.styles[style.split(':')[0]];
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

input,
textarea {
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 2px;
    resize: vertical;
}
button,
[type='submit'] {
    cursor: pointer;
}
input,
button {
    font: 18px Avenir, Helvetica, Arial, sans-serif;
}

.property {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid;
    border-radius: 5px;
    box-shadow: 0 1px 5px -3px rgba(0, 0, 0, 0.8);
}

label {
    width: 100%;
    text-align: left;
    font-size: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

#code-preview {
    position: fixed;
    text-align: left;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    max-width: calc((100vw - 600px) / 2);
    text-overflow: ellipsis;
    overflow: hidden;
}
#code-preview pre {
    margin: 0;
}
#code-preview pre:nth-of-type(2) {
    margin-top: -26px;
}

#preview-styles {
    display: inline-flex;
    flex-direction: column;
}

#preview-slot {
    white-space: pre-line;
    max-width: 180px;
    padding-left: 92px;
}

#duration-slider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
#duration-slider input {
    cursor: pointer;
    flex: 1;
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
    width: 44%;
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
    font-size: 14px;
}

#create-toast {
    margin-bottom: 40px;
    width: 100%;
    max-width: 250px;
    font-size: 20px;
}

.invalid {
    border: 1px solid #ff0000;
}
.valid {
    border: 1px solid #90ee90;
}

@media only screen and (max-width: 950px) {
    #code-preview {
        display: none;
    }
}
</style>
