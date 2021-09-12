<template>
    <RecycleScroller
            class="scroller"
            :buffer="100"
            key-field="id"
            :min-item-size="minItemSize"
            :items="itemsWithSize">
        <template slot-scope="{ item: itemWithSize, index, active }">
            <slot
              v-bind="{
              item: itemWithSize.item,
              index,
              active,
              itemWithSize
                }"
            />
        </template>
    </RecycleScroller>
</template>

<script>
    import { props, simpleArray } from './common'
    export default {
        name: "MyDemo2",
        provide () {
            return {
                vscrollData: this.vscrollData
            }
        },
        data() {
            return {
                vscrollData: {
                    sizes: {},
                    active: true,
                    keyField: this.keyField,
                    simpleArray: false
                }
            }
        },
        props: {
            ...props,
            minItemSize: {
                type: [Number, String],
                required: true,
            }
        },
        computed: {
            simpleArray,
            itemsWithSize() {
                const result = []
                const { items, keyField, simpleArray } = this
                console.log('gsditemsWithSize', keyField, simpleArray)
                const sizes = this.vscrollData.sizes
                console.log('gsdsizes', sizes)
                for (let i = 0; i < items.length; i++) {
                    const item = items[i]
                    const id = simpleArray ? i : item[keyField]
                    let size = sizes[id]
                    result.push({
                        item,
                        id,
                        size,
                    })
                }
                console.log('gsdresult', result)
                return  result
            }
        }
    }
</script>

<style scoped>
    .scroller {
        height: 100%;
    }

    .user {
        height: 32%;
        padding: 0 12px;
        display: flex;
        align-items: center;
    }
</style>
