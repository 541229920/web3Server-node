<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Form {
  address: String,
  user: String,
  password: String
}
const FormObjData = ref<Form>({})

const getMetaMaskAddress = () => {
  if (window.ethereum) {
    window.ethereum.request({
      method: 'eth_requestAccounts'
    }).then(result => {
      FormObjData.value.address = result[0]
    })
  }
}

const CheckEventAxios = () => {
  console.log(FormObjData.value)
  axios.post('http://localhost:8080/post/regis', FormObjData.value).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

</script>

<template>
  <div class="regis">
    <div class="regisTable">
      <div class="Table">
        <div>欢迎登陆 xPanse Ctypro!</div>
        <div class="Input">
          <div class="TableInput">
            <span>用户名</span>
            <p><input type="text" v-model="FormObjData.user"></p>
          </div>
          <div class="TableInput">
            <span>密码</span>
            <p><input type="text" v-model="FormObjData.password"></p>
          </div>
        </div>

        <div class="btnEvent">
          <button @click="getMetaMaskAddress()">绑定MetaMask</button>
          <button @click="CheckEventAxios()">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.regisTable {
  height: 240px;
  width: 400px;
  background: #9e9e9e;
  position: fixed;
  top: calc(50% - 120px);
  left: calc(50% - 200px);
  display: flex;
  align-items: center;
  justify-content: center;

  .Table {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    .btnEvent{
      display: flex;
      justify-content: space-between;
    }
  }
}

p {
  margin: 0;
  padding: 0;
}
</style>