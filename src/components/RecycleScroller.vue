<template>
    <div
            class="vue-recycle-scroller"
            :class="{ready: 'ready'}">
        <div class="vue-recycle-scroller__slot">
            <slot
                    name="before"
            />
        </div>
        <div
                :style="{'minHeight': totalSize + 'px' }"
                class="vue-recycle-scroller__item-wrapper">
            <div
                v-for="(view, index) of pool"
                :key="index"
                :style="ready ? { transform: `translateY(${view.position}px)` } : null"
                class="vue-recycle-scroller__item-view">
                <slot :item="view.item"></slot>
            </div>
        </div>
        <div class="vue-recycle-scroller__slot">
            <slot
                    name="after"
            />
        </div>
    </div>
</template>

<script>
    import {props, simpleArray} from "./common";
    import config from '../config'
    export default {
        name: "RecycleScroller",
        props: {
            ...props,
            buffer: {
                type: Number,
                default: 200,
            },
            itemSize: {
                type: Number,
                default: null,
            },
            typeField: {
                type: String,
                default: 'type',
            },
            emitUpdate: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                pool: [],
                totalSize: 0,
                ready: false
            }
        },
        computed: {
            simpleArray
        },
        created () {
            this.$_startIndex = 0
            this.$_endIndex = 0
            this.$_views = new Map()
            this.$_unusedViews = new Map()
        },
        mounted () {
            this.$nextTick(() => {
                this.updateVisibleItems(true)
                this.ready = true
            })
        },
        methods: {
            handleResize: function handleResize() {
                console.log('gsdhandleResize')
            },
            handleVisibilityChange: function handleVisibilityChange(isVisible, entry) {
                console.log('gsdhandleVisibilityChange')
            },
            addView (pool, index, item, key, type) {
                const view = {
                    item,
                    position: 0,
                }
                pool.push(view)
                return view
            },
            updateVisibleItems (checkItem, checkPositionDiff = false) {
                const views = this.$_views
                const unusedViews = this.$_unusedViews
                const keyField = this.simpleArray ? null : this.keyField
                const itemSize = this.itemSize
                const items = this.items
                const count = items.length
                const pool = this.pool
                let startIndex, endIndex
                let totalSize
                const typeField = this.typeField
                if (!count) {
                    startIndex = endIndex = totalSize = 0
                } else {
                    const scroll = this.getScroll()
                    if (checkPositionDiff) {

                    }
                    this.$_lastUpdateScrollPosition = scroll.start
                    const buffer = this.buffer
                    scroll.start -= buffer  // 300 -> 100
                    scroll.end += buffer // 900 -> 1100
                    if (itemSize === null) {
                        // TODO
                    }else {
                        startIndex = ~~(scroll.start / itemSize) // 310/50 -> 6
                        endIndex = Math.ceil(scroll.end / itemSize) // 1020/50 -> 21

                        startIndex < 0 && (startIndex = 0)
                        endIndex > count && (endIndex = count)

                        totalSize = count * itemSize
                    }
                    console.log('gsdupdateVisibleItems', totalSize, scroll.start, scroll.end, scroll, startIndex, endIndex)
                }
                if (endIndex - startIndex > config.itemsLimit) {
                    this.itemsLimitError()
                }
                this.totalSize = totalSize

                let view
                const continuous = startIndex <= this.$_endIndex && endIndex >= this.$_startIndex
                if (this.$_continuous !== continuous) {
                    console.log('gsdcontinuous',this.$_continuous, continuous)
                    if (continuous) {
                        views.clear()
                        unusedViews.clear()
                        for (let i = 0, l = pool.length; i < l; i++) {
                        }
                    }
                    this.$_continuous = continuous
                } else if (continuous) {

                }
                const unusedIndex = continuous ? null : new Map()
                let item, type, unusedPool
                for (let i = startIndex; i < endIndex; i++) {
                    item = items[i]
                    const key = keyField ? item[keyField] : item
                    if (key == null) {
                        throw new Error(`Key is ${key} on item (keyField is '${keyField}')`)
                    }
                    view = views.get(key)
                    if (!view) {
                        type = item[typeField]
                        unusedPool = unusedViews.get(type)
                        if (continuous) {
                            if (unusedPool && unusedPool.length) {

                            } else {
                                view = this.addView(pool, i, item, key, type)
                            }
                        } else {
                        }
                        views.set(key, view)
                    } else {
                    }
                    if (itemSize === null) {

                    } else {
                        view.position = i * itemSize
                    }
                }
                this.$_startIndex = startIndex
                this.$_endIndex = endIndex
                console.log('gsdpool', pool)
                if (this.emitUpdate) this.$emit('update', startIndex, endIndex)
                return {
                    continuous,
                }
            },
            itemsLimitError () {
                throw new Error('Rendered items limit reached')
            },
            getScroll () {
                const { $el: el } = this
                let scrollState
                scrollState = {
                    start: el.scrollTop, // scrollTop 值是这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量
                    end: el.scrollTop + el.clientHeight, // clientHeight 它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距
                }
                console.log('gsdscrollState', scrollState)
                return scrollState
            }
        }
    }
</script>

<style scoped>

</style>
