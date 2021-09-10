<template>
    <div class="vue-recycle-scroller">
        <div class="vue-recycle-scroller__slot">
            <slot
                    name="before"
            />
        </div>
        <div class="vue-recycle-scroller__item-wrapper">
            <div
                v-for="(view, index) of pool"
                :key="index"
                class="vue-recycle-scroller__item-view">
                <slot :item="view"></slot>
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
    import {props} from "./common";
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
            }
        },
        data() {
            return {
                pool: [],
                totalSize: 0
            }
        },
        created () {

        },
        mounted () {
            this.$nextTick(() => {
                this.updateVisibleItems(true)
            })
        },
        methods: {
            updateVisibleItems (checkItem, checkPositionDiff = false) {
                const itemSize = this.itemSize
                const items = this.items
                const count = items.length
                let startIndex, endIndex
                let totalSize
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
