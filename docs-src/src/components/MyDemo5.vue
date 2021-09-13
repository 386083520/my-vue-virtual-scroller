<template>
    <DynamicScroller
            :items="list"
            :min-item-size="54"
            class="scroller">
        <template v-slot="{ item, index, active }">
            <!--<div>{{item.name}}</div>-->
            <DynamicScrollerItem
                    style="word-break: break-all"
               :active="active"
               :item="item">
                <div>{{item.name}}</div>
            </DynamicScrollerItem>
        </template>
    </DynamicScroller>
</template>

<script>
    let listTemp = []
    for (let i = 0; i < 20000; i++) {
        listTemp.push({name: 'gsd'.repeat(i) + i, id: i, url: 'https://avatars.githubusercontent.com/u/495429?v=4' + '?' + Math.random()})
    }
    export default {
        name: "MyDemo5",
        data() {
            return {
                list: listTemp
            }
        }
    }
</script>

<style scoped>
.scroller{
    height: 100%;
}
</style>
