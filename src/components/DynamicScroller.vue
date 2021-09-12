<template>
    <RecycleScroller
            class="scroller"
            :buffer="100"
            :items="items">
        <template slot-scope="{ item: itemWithSize, index, active }">
            <slot
              v-bind="{
              item: itemWithSize,
              index,
              active,
              itemWithSize
                }"
            />
        </template>
    </RecycleScroller>
</template>

<script>
    import { props } from './common'
    export default {
        name: "MyDemo2",
        data() {
            return {
            }
        },
        props: {
            ...props
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
