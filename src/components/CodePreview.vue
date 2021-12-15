<template>
  <div id="code-preview">
    <code @click="copyCode($event)">
      <div>this.$toast('{{ text }}', {</div>
      <div class="preview-inner">
        <div>duration: {{ duration || false }},</div>
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
        <div v-if="className">
          <div>class: '{{ className }}',</div>
        </div>
        <div v-if="type">
          <div>type: '{{ type }}',</div>
        </div>
        <div v-if="positionX">
          <div>positionX: '{{ positionX }}',</div>
        </div>
        <div v-if="positionY">
          <div>positionY: '{{ positionY }}',</div>
        </div>
        <div v-if="disableClick">
          <div>disableClick: {{ disableClick }},</div>
        </div>
        <div v-if="link.href">
          <div>
            link: {
          </div>
          <div class="preview-values">href: '{{ link.href }}',</div>
          <div class="preview-values">targetBlank: {{ link.targetBlank }}</div>
          <div>}</div>
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
  name: 'CodePreview',

  props: {
    text: { type: String, required: true },
    duration: { type: Number, required: true },
    styles: { type: Object, required: true },
    slots: { type: Object, required: true },
    className: { type: String, required: true },
    type: { type: String, required: true },
    positionX: { type: String, required: true },
    positionY: { type: String, required: true },
    disableClick: { type: Boolean, required: true },
    link: { type: Object, required: true },
  },

  computed: {
    displayStyles: function() {
      return Object.keys(this.styles).map((style) => {
        return `${style}: ${this.styles[style]};`;
      });
    },
  },

  methods: {
    copyCode(e) {
      navigator.clipboard.writeText(e.target.innerText);
      this.$toast('Copied!');
    },
  },
};
</script>

<style lang="scss">
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

  code {
    cursor: pointer;
    display: block;
    position: fixed;
    margin: 0 auto;
    padding-top: 20px;
    width: 400px;
    hyphens: auto;
    transform: translateY(-50%);

    &::before {
      content: '📋COPY';
      position: absolute;
      top: 0;
      left: 50%;
      width: fit-content;
      opacity: 0;
      transform: translate(-50%, 0);
      transition: all 0.15s;
    }

    &:hover::before {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  div {
    pointer-events: none;
    display: block;
    hyphens: auto;
  }
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
