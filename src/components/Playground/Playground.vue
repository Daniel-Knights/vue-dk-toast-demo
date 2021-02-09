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
                    :value="duration"
                    @input="$emit('update:duration', $event.target.value)"
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
                :value="text"
                @input="$emit('update:text', $event.target.value)"
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
                :value="slotsLeft"
                @input="$emit('update:slotsLeft', $event.target.value)"
                :class="{ valid: valid, invalid: valid === false }"
            />
            <p>
                Any valid HTML can go here. Fontawesome and Material Icons are loaded into
                this demo, give it a try:
                <code @click="copyIcon(0, 'Left')" class="icon-examples"
                    >&lt;i class="fa fa-thumbs-up"&gt;&lt;/i&gt;</code
                >
                <code @click="copyIcon(1, 'Left')" class="icon-examples"
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
                :value="slotsRight"
                @input="$emit('update:slotsRight', $event.target.value)"
                :class="{ valid: valid, invalid: valid === false }"
            />
            <p>
                Same as <code class="code-note">slotLeft</code> but positioned to the
                right
                <code @click="copyIcon(0, 'Right')" class="icon-examples"
                    >&lt;i class="fa fa-thumbs-up"&gt;&lt;/i&gt;</code
                >
                <code @click="copyIcon(1, 'Right')" class="icon-examples"
                    >&lt;span class="material-icons">thumb_up&lt;/span></code
                >
            </p>
        </div>
        <button @click="toast()" id="create-toast">CREATE TOAST</button>
    </main>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
