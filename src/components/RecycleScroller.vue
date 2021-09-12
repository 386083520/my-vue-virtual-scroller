<template>
    <div
            class="vue-recycle-scroller"
            :class="{ready: 'ready'}"
            v-observe-visibility="handleVisibilityChange"
            @scroll.passive="handleScroll">
        <div class="vue-recycle-scroller__slot">
            <slot
                    name="before"
            />
        </div>
        <div
                :style="{'minHeight': totalSize + 'px' }"
                class="vue-recycle-scroller__item-wrapper">
            <div
                v-for="view of pool"
                :key="view.nr.id"
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
        <ResizeObserver @notify="handleResize" />
    </div>
</template>

<script>
    import {props, simpleArray} from "./common";
    import config from '../config'
    import { ResizeObserver } from 'vue-resize'
    import { ObserveVisibility } from 'vue-observe-visibility'

    let uid = 0
    export default {
        name: "RecycleScroller",
        components: {
            ResizeObserver,
        },
        directives: {
            ObserveVisibility,
        },
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
            this.$_scrollDirty = false
        },
        mounted () {
            this.$nextTick(() => {
                this.updateVisibleItems(true)
                this.ready = true
            })
        },
        methods: {
            handleScroll (event) {
                console.log('gsdhandleScroll')
                if (!this.$_scrollDirty) {
                    this.$_scrollDirty = true
                    requestAnimationFrame(() => {
                        this.$_scrollDirty = false
                        console.log('gsdrequestAnimationFrame')
                        const { continuous } = this.updateVisibleItems(false, true)
                    })
                }
            },
            handleResize: function handleResize() {
                console.log('gsdhandleResize')
            },
            handleVisibilityChange: function handleVisibilityChange(isVisible, entry) {
                console.log('gsdhandleVisibilityChange',isVisible, entry)
                if(this.ready) {
                    if (isVisible) {
                        this.$emit('visible')
                        requestAnimationFrame(() => {
                            this.updateVisibleItems(false)
                        })
                    }else {
                        this.$emit('hidden')
                    }
                }
            },
            addView (pool, index, item, key, type) {
                const view = {
                    item,
                    position: 0,
                }
                const nonReactive = {
                    id: uid++,
                    index,
                    used: true,
                    key,
                    type,
                }
                Object.defineProperty(view, 'nr', {
                    configurable: false,
                    value: nonReactive,
                })
                pool.push(view)
                return view
            },
            unuseView (view, fake = false) {
                const unusedViews = this.$_unusedViews
                const type = view.nr.type
                let unusedPool = unusedViews.get(type)
                if (!unusedPool) {
                    unusedPool = []
                    unusedViews.set(type, unusedPool)
                }
                unusedPool.push(view)
                if (!fake) {
                    view.nr.used = false
                    view.position = -9999
                    this.$_views.delete(view.nr.key)
                }
                console.log('gsdunusedPool', unusedPool)
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
                        let positionDiff = scroll.start - this.$_lastUpdateScrollPosition
                        if (positionDiff < 0) positionDiff = -positionDiff
                        if (positionDiff < itemSize) {
                            return {
                                continuous: true,
                            }
                        }
                    }
                    console.log('gsdcheckPositionDiff')
                    this.$_lastUpdateScrollPosition = scroll.start
                    const buffer = this.buffer
                    scroll.start -= buffer  // 300 -> 100
                    scroll.end += buffer // 900 -> 1100
                    if (itemSize === null) {
                        // TODO
                    }else {
                        startIndex = ~~(scroll.start / itemSize)
                        endIndex = Math.ceil(scroll.end / itemSize)

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
                console.log('gsdcontinuous', continuous)
                if (this.$_continuous !== continuous) {
                    console.log('gsdcontinuous',this.$_continuous, continuous)
                    if (continuous) {
                        views.clear()
                        unusedViews.clear()
                        for (let i = 0, l = pool.length; i < l; i++) {
                            // TODO
                            view = pool[i]
                            this.unuseView(view)
                        }
                    }
                    this.$_continuous = continuous
                } else if (continuous) {
                    for (let i = 0, l = pool.length; i < l; i++) {
                        view = pool[i]
                        if (view.nr.used) {
                            if (checkItem) {
                            }
                            if (
                                view.nr.index === -1 ||
                                view.nr.index < startIndex ||
                                view.nr.index >= endIndex
                            ) {
                                this.unuseView(view)
                                console.log('gsdunusedViews', unusedViews)
                            }
                        }
                    }
                }
                const unusedIndex = continuous ? null : new Map()
                let item, type, unusedPool
                let v
                for (let i = startIndex; i < endIndex; i++) {
                    item = items[i]
                    const key = keyField ? item[keyField] : item
                    if (key == null) {
                        throw new Error(`Key is ${key} on item (keyField is '${keyField}')`)
                    }
                    view = views.get(key)
                    if (!view) {
                        type = item[typeField]
                        console.log('gsd!view', unusedViews, unusedPool)
                        unusedPool = unusedViews.get(type)
                        if (continuous) {
                            if (unusedPool && unusedPool.length) {
                                console.log('gsdunusedPool2', unusedPool)
                                view = unusedPool.pop()
                                view.item = item
                                view.nr.used = true
                                view.nr.index = i
                                view.nr.key = key
                                view.nr.type = type
                            } else {
                                view = this.addView(pool, i, item, key, type)
                                console.log('gsdview', view)
                            }
                        } else {
                            v = unusedIndex.get(type) || 0
                            if (!unusedPool || v >= unusedPool.length) {
                                view = this.addView(pool, i, item, key, type)
                                this.unuseView(view, true)
                                unusedPool = unusedViews.get(type)
                            }
                            view = unusedPool[v]
                            view.item = item
                            view.nr.used = true
                            view.nr.index = i
                            view.nr.key = key
                            view.nr.type = type
                            unusedIndex.set(type, v + 1)
                            v++
                            console.log('gsdv', v, view)
                            console.log('gsdunusedPool3', unusedPool)
                        }
                        views.set(key, view)
                        console.log('gsdviews', views)
                    } else {
                        view.nr.used = true
                        view.item = item
                    }
                    if (itemSize === null) {

                    } else {
                        view.position = i * itemSize
                        console.log('gsdposition', i, itemSize)
                    }
                }
                console.log('gsdpool', pool)
                console.log('gsdviews', views)
                this.$_startIndex = startIndex
                this.$_endIndex = endIndex
                if (this.emitUpdate) this.$emit('update', startIndex, endIndex)
                clearTimeout(this.$_sortTimer)
                this.$_sortTimer = setTimeout(this.sortViews, 300)
                return {
                    continuous,
                }
            },
            itemsLimitError () {
                throw new Error('Rendered items limit reached')
            },
            getScroll () {
                console.log('gsdthis', this)
                const { $el: el } = this
                let scrollState
                scrollState = {
                    start: el.scrollTop, // scrollTop 值是这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量
                    end: el.scrollTop + el.clientHeight, // clientHeight 它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距
                }
                console.log('gsdscrollState', scrollState)
                return scrollState
            },
            sortViews () {
                this.pool.sort((viewA, viewB) => viewA.nr.index - viewB.nr.index)
                console.log('gsdpool2', this.pool)
            }
        }
    }
</script>

<style scoped>
.vue-recycle-scroller{
    position: relative;
    overflow-y: auto;
}

.vue-recycle-scroller.ready .vue-recycle-scroller__item-view {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
}
</style>
