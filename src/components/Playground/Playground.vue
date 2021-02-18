<template>
    <main id="content">
        <div id="duration" class="property">
            <label>duration:</label>
            <div id="duration-slider">
                <input
                    type="range"
                    min="0"
                    max="100000"
                    step="100"
                    :value="duration"
                    @input="$emit('update:duration', $event.target.value)"
                />
                <span>
                    {{ duration || false }}
                </span>
            </div>
        </div>
        <div id="text" class="property">
            <label>text:</label>
            <input
                type="text"
                :value="text"
                @input="$emit('update:text', $event.target.value)"
                :class="{ valid: valid, invalid: valid === false }"
            />
        </div>
        <form @submit.prevent="addRule()" id="styles" class="property">
            <label>styles:</label>
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
            <label>slotLeft:</label>
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
            <label>slotRight:</label>
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
        <div class="property">
            <label>class:</label>
            <input
                :value="className"
                @input="$emit('update:className', $event.target.value)"
                type="text"
            />
            <p>
                <code @click="copyClass('huge')" class="icon-examples"
                    >.huge { padding: 100px; }</code
                >
            </p>
        </div>
        <div class="property">
            <label>type:</label>
            <input
                :value="type"
                @input="$emit('update:type', $event.target.value)"
                type="text"
            />
            <p>
                Add a type of <code class="code-note">error</code> to make the background
                red and text white:
                <code @click="copyType('error')" class="icon-examples"
                    >&lt;div class="dk__toast dk__error"...</code
                >
            </p>
            <p>
                Or a type of <code class="code-note">success</code> to make the background
                green and text white:
                <code @click="copyType('success')" class="icon-examples"
                    >&lt;div class="dk__toast dk__success"...</code
                >
            </p>
            <p>
                Or a type of <code class="code-note">passive</code> to make the background
                blue and text white:
                <code @click="copyType('passive')" class="icon-examples"
                    >&lt;div class="dk__toast dk__passive"...</code
                >
            </p>
        </div>
        <div class="property">
            <label>positionX:</label>
            <select @change="$emit('update:positionX', $event.target.value)">
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right" selected>right</option>
            </select>
        </div>
        <div class="property">
            <label>positionY:</label>
            <select @change="$emit('update:positionY', $event.target.value)">
                <option value="top">top</option>
                <option value="bottom" selected>bottom</option>
            </select>
        </div>
        <div class="property">
            <label>disableClick:</label>
            <select
                @change="
                    $emit(
                        'update:disableClick',
                        $event.target.value === 'true' ? true : false
                    )
                "
            >
                <option value="true">true</option>
                <option value="false" selected>false</option>
            </select>
        </div>
        <div class="property">
            <label>link:</label>
            <div class="full-width">
                href:
                <input @input="$emit('update:href', $event.target.value)" type="text" />
            </div>
            <div class="full-width">
                targetBlank:
                <select
                    @change="
                        $emit(
                            'update:targetBlank',
                            $event.target.value === 'true' ? true : false
                        )
                    "
                >
                    <option value="true">true</option>
                    <option value="false" selected>false</option>
                </select>
            </div>
        </div>
        <button @click="toast()" id="create-toast">CREATE TOAST</button>
    </main>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
