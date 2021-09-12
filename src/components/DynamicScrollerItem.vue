<script>
    export default {
        name: "DynamicScrollerItem",
        mounted () {
            if (this.vscrollData.active) {
                this.updateSize()
            }
        },
        inject: [
            'vscrollData'
        ],
        props: {
            item: {
                required: true,
            },
            tag: {
                type: String,
                default: 'div',
            },
            active: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            updateSize () {
                if (this.finalActive) {
                    if (this.$_pendingSizeUpdate !== this.id) {
                        this.computeSize(this.id)
                    }
                }
            },
            computeSize (id) {
                this.$nextTick(() => {
                    if (this.id === id) {
                        this.applySize('50', '50')
                    }
                })
            },
            applySize (width, height) {
                const size = Math.round(height)
                if (size && this.size !== size) {
                    this.$set(this.vscrollData.sizes, this.id, size)
                    console.log('gsdvscrollData', this.vscrollData)
                }
            }
        },
        computed: {
            id () {
                return this.vscrollData.simpleArray ? this.index : this.item[this.vscrollData.keyField]
            },
            finalActive () {
                return this.active && this.vscrollData.active
            },
            size () {
                return 0
            }
        },
        render (h) {
            return h(this.tag, this.$slots.default)
        }
    }
</script>
