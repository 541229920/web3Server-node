<template>
    <div>
        <!-- <button @click="gettrxAddress">获取信息</button> -->
    </div>

    <ul>
        <li v-for="(item, index) in getData" :key="index">
            {{ item.hash }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref, watch, onMounted } from 'vue';
const getData = ref<any[]>([])


const gettrxAddress = async () => {
    await axios.post('http://localhost:8080/post/trx').then(res => {
        getData.value = res.data.data
        console.log(getData.value.data)
    })
}
onMounted(() => {
    gettrxAddress()
})


watch(getData, (newdata, olddata) => {
    getData.value = newdata
})

</script>

<style scoped lang="less"></style>