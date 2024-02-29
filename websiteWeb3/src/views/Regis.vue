<script setup lang="ts">
import { getMetaMaskAddress, CheckEventAxios,FormObjData} from '@/uitls/RegisLogin'

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
          <button @click="CheckEventAxios('regis')">注册</button>
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