<template>
    <RecycleScroller
            class="scroller"
            :itemSize="500"
            :buffer="100"
            :items="list">
        <template v-slot:default="props">
            <div>
                {{props.item.name}}
            </div>
        </template>
    </RecycleScroller>
</template>

<script>
    let listTemp = []
    for (let i = 0; i < 200; i++) {
        listTemp.push({name: 'gsd' + i, id: i, url: 'https://avatars.githubusercontent.com/u/495429?v=4' + '?' + Math.random()})
    }
    export default {
        name: "MyDemo2",
        data() {
            return {
                list: listTemp
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
