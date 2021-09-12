<template>
    <RecycleScroller
            class="scroller"
            :buffer="100"
            key-field="id"
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
        data() {
            return {
                vscrollData: {

                }
            }
        },
        props: {
            ...props
        },
        computed: {
            simpleArray,
            itemsWithSize() {
                const result = []
                const { items, keyField, simpleArray } = this
                console.log('gsditemsWithSize', keyField, simpleArray)
                const sizes = this.vscrollData.sizes
                for (let i = 0; i < items.length; i++) {
                    const item = items[i]
                    const id = simpleArray ? i : item[keyField]
                    let size = 40
                    result.push({
                        item,
                        id,
                        size,
                    })
                }
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
