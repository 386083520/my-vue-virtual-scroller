<template>
   <div>
       <div v-for="(item, index) of list">
           {{item.name}}
       </div>
   </div>
</template>

<script>
    let listTemp = []
    for (let i = 0; i < 100; i++) {
        listTemp.push({name: 'gsd' + i, id: i})
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
