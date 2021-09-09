<template>
   <div>
       <div v-for="(item, index) of list">
           <!--{{item.name}}-->
           <img :src="item.url">
       </div>
   </div>
</template>

<script>
    let listTemp = []
    for (let i = 0; i < 2000; i++) {
        listTemp.push({name: 'gsd' + i, id: i, url: 'https://avatars.githubusercontent.com/u/495429?v=4' + '?' + Math.random()})
    }
    export default {
        name: "MyDemo1",
        data() {
            return {
                list: listTemp
            }
        }
    }
</script>

<style scoped>

</style>
