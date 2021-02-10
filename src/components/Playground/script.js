import { sanitize } from 'dompurify'

export default {
    name: 'Playground',

    emits: [
        'update:duration',
        'update:text',
        'update:styles',
        'update:slotsLeft',
        'update:slotsRight',
        'update:class-name',
        'update:type'
    ],

    props: {
        duration: { type: Number, required: true },
        text: { type: String, required: true },
        styles: { type: Object, required: true },
        slotsLeft: { type: String, required: true },
        slotsRight: { type: String, required: true },
        className: { type: String, required: true },
        type: { type: String, required: true }
    },

    data: () => ({
        positionX: 'right',
        positionY: 'bottom',
        styleProperty: '',
        styleValue: '',
        valid: null
    }),

    computed: {
        displayStyles: function() {
            return Object.keys(this.styles).map(style => {
                return `${style}: ${this.styles[style]};`
            })
        }
    },

    methods: {
        toast() {
            if (!this.text && !this.slotsLeft && !this.slotsRight) this.valid = false
            else this.valid = true

            this.$toast(this.text, {
                duration: this.duration,
                styles: this.styles,
                slotLeft: sanitize(this.slotsLeft),
                slotRight: sanitize(this.slotsRight),
                class: this.className,
                type: this.type
            })
        },

        copyIcon(library, pos) {
            const icon =
                library === 0
                    ? '<i class="fa fa-thumbs-up"></i>'
                    : '<span class="material-icons">thumb_up</span>'

            this.$emit(`update:slots${pos}`, icon)
        },

        copyClass(className) {
            this.$emit('update:class-name', className)
        },

        copyType(type) {
            this.$emit('update:type', type)
        },

        addRule() {
            if (!this.styleValue || !this.styleProperty) return

            const tempStyles = this.styles
            tempStyles[this.styleProperty] = this.styleValue

            this.$emit('update:styles', tempStyles)
        },

        filterRule(style) {
            const tempStyles = this.styles

            delete tempStyles[style.split(':')[0]]
            this.$emit('update:styles', tempStyles)
        }
    }
}
