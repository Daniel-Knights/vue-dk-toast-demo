import DOMPurify from 'dompurify';

export default {
  name: 'Playground',

  emits: [
    'update:duration',
    'update:text',
    'update:styles',
    'update:slotsLeft',
    'update:slotsRight',
    'update:className',
    'update:type',
    'update:positionX',
    'update:positionY',
    'update:disableClick',
    'update:href',
    'update:targetBlank',
  ],

  props: {
    duration: { type: Number, required: true },
    text: { type: String, required: true },
    styles: { type: Object, required: true },
    slotsLeft: { type: String, required: true },
    slotsRight: { type: String, required: true },
    className: { type: String, required: true },
    type: { type: String, required: true },
    positionX: { type: String, required: true },
    positionY: { type: String, required: true },
    disableClick: { type: Boolean, required: true },
    href: { type: String, required: true },
    targetBlank: { type: Boolean, required: true },
  },

  data: () => ({
    styleProperty: '',
    styleValue: '',
    valid: null,
  }),

  computed: {
    displayStyles: function () {
      return Object.keys(this.styles).map((style) => {
        return `${style}: ${this.styles[style]};`;
      });
    },
  },

  methods: {
    toast() {
      if (!this.text && !this.slotsLeft && !this.slotsRight) this.valid = false;
      else this.valid = true;

      this.$toast(this.text, {
        duration: this.duration || false,
        styles: this.styles,
        slotLeft: DOMPurify.sanitize(this.slotsLeft),
        slotRight: DOMPurify.sanitize(this.slotsRight),
        class: this.className.split(' '),
        type: this.type,
        positionX: this.positionX,
        positionY: this.positionY,
        disableClick: this.disableClick,
        link: {
          href: this.href,
          targetBlank: this.targetBlank,
        },
      });
    },

    copyIcon(library, pos) {
      const icon =
        library === 0
          ? '<i class="fa fa-thumbs-up"></i>'
          : '<span class="material-icons">thumb_up</span>';

      this.$emit(`update:slots${pos}`, icon);
    },

    copyClass(className) {
      this.$emit('update:className', className);
    },

    copyType(type) {
      this.$emit('update:type', type);
    },

    addRule() {
      if (!this.styleValue || !this.styleProperty) return;

      const tempStyles = this.styles;
      tempStyles[this.styleProperty] = this.styleValue;

      this.$emit('update:styles', tempStyles);
    },

    filterRule(style) {
      const tempStyles = this.styles;

      delete tempStyles[style.split(':')[0]];
      this.$emit('update:styles', tempStyles);
    },
  },
};
