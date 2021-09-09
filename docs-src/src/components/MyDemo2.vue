<template>
    <div style="height: 800px">
        <RecycleScroller
                class="scroller"
                :items="list"
                :item-size="400"
                key-field="id"
                v-slot="{ item }"
        >
            <div class="user">
                <!--{{ item.name }}-->
                <img :src="item.url">
            </div>
        </RecycleScroller>
    </div>
</template>

<script>
    let listTemp = []
    for (let i = 0; i < 2000; i++) {
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
