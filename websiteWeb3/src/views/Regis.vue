<script setup lang="ts">
import { getMetaMaskAddress, CheckEventAxios, FormObjData } from '@/uitls/RegisLogin'
import { defineComponent, ref } from 'vue'
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules
} from 'naive-ui'
import axios from 'axios'
import router from '@/router';

interface ModelType {
  username: string | null
  password: string | null
  reenteredPassword: string | null
}

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const modelRef = ref<ModelType>({
  username: null,
  password: null,
  reenteredPassword: null
})
const model = modelRef
const validatePasswordStartWith = (
  rule: FormItemRule,
  value: string
): boolean => {
  return (
    !!modelRef.value.password &&
    modelRef.value.password.startsWith(value) &&
    modelRef.value.password.length >= value.length
  )
}

const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
  return value === modelRef.value.password
}

const rules: FormRules = {
  username: [
    {
      required: true,
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}

const handlePasswordInput = () => {
  if (modelRef.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}
const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('验证成功')
      axios.post('http://localhost:8080/post/regis', FormObjData.value).then(res => {
        console.log(res)

      }).catch(err => {
        console.log(err)
      })

    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}

</script>

<template>
  <div class="bg">
    <div class="regis">
      <div class="regisTable">
        <div class="logo"></div>
        <div class="Table">
          <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="username" label="用户名">
              <n-input v-model:value="model.username" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item path="password" label="密码">
              <n-input v-model:value="model.password" type="password" @input="handlePasswordInput"
                @keydown.enter.prevent />
            </n-form-item>
            <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
              <n-input v-model:value="model.reenteredPassword" :disabled="!model.password" type="password"
                @keydown.enter.prevent />
            </n-form-item>
            <n-row :gutter="[0, 24]">
              <n-col :span="24">

                <div class="butEvent">
                  <n-button round @click="getMetaMaskAddress">连接小狐狸</n-button><span class="metamaskAddress">{{
            FormObjData.address }}</span>
                  <div style="display: flex; justify-content: flex-end">
                    <n-button :disabled="model.username === null" round type="primary"
                      @click="handleValidateButtonClick">
                      注册
                    </n-button>
                  </div>
                </div>
              </n-col>
            </n-row>
          </n-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@w: 640px;
@h: 280px;

.regisTable {
  width: @w;
  position: fixed;
  top: calc(50% - @h );
  left: calc(50% - @w /2);
  background: #00000077;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 10px 10px 50px #00000077;
  padding: 40px;
  color: white;

  .logo {
    margin: 20px auto;
    width: 260px;
    height: 60px;
    background: url('../images/header_logo/logo white.png')no-repeat;
    background-size: contain;
    background-position: center center;
  }

  .Table {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;



    .Input {
      font-size: 16px;
      margin: 0 auto;
    }

    span {
      min-width: max-content;
      display: inline-block;
    }
  }
}

.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: url('../images/wallhaven-1pwq23.png') no-repeat;
  background-size: cover;
}

.butEvent {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .metamaskAddress {

    flex-grow: 1;
    margin-left: 10px;
  }
}
</style>