<template>
    <DynamicScroller
            :items="items"
            :min-item-size="54"
            class="scroller"
    >
        <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
                    :item="item"
                    :active="active"
                    :size-dependencies="[
          item.name,
        ]"
                    :data-index="index"
            >
                <div class="avatar">
                    <img
                            :src="item.url"
                            :key="item.url"
                            alt="avatar"
                            class="image"
                    >
                </div>
                <div class="text">{{ item.name }}</div>
            </DynamicScrollerItem>
        </template>
    </DynamicScroller>
</template>

<script>
    let listTemp = []
    let url = ''
    for (let i = 0; i < 2000; i++) {
        url = (i%2 === 0 ? 'https://avatars.githubusercontent.com/u/16269252?v=4' + '?' + Math.random() : 'https://avatars.githubusercontent.com/u/495429?v=4' + '?' + Math.random())
        listTemp.push({name: 'gsd' + i, id: i,size: 20 + Math.random()*20, url: url})
    }
    export default {
        name: "MyDemo4",
        data() {
            return {
                items: listTemp
            }
        }
    }
</script>

<style scoped>
    .scroller {
        height: 100%;
    }
</style>
