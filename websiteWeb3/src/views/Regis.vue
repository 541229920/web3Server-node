<script setup lang="ts">

import { ref } from 'vue'
import { type FormInst, type FormItemInst, type FormItemRule, useMessage, type FormRules } from 'naive-ui'
import axios from 'axios'
import router from '@/router';

interface ModelType {
  username: string | null
  password: string | null
  reenteredPassword: string | null
  metamaskAddress: string | null
}

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const modelRef = ref<ModelType>({
  username: null,
  password: null,
  reenteredPassword: null,
  metamaskAddress: null
})
const model = modelRef


const getMetaMaskAddress = () => {
  if (window.ethereum) {
    window.ethereum.request({
      method: 'eth_requestAccounts'
    }).then((result: (string | null)[]) => {
      modelRef.value.metamaskAddress = result[0]
    })
  }
}


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
      axios.post('http://localhost:8080/post/regis', model.value).then(res => {
        if (res.data.isValid) {
          message.success(res.data.message)
          router.push('/login')
        } else {
          message.warning(res.data.message)
        }
      }).catch(err => {
        console.log(err)
        message.error('注册失败')
      })
    } else {
      message.error('注册失败')
    }
  })
}

const loginin = () => {
  router.push({
    name: 'login'
  })
}

</script>

<template>
  <div class="bg">
    <div class="regis">
      <div class="regisTable">
        <n-h1 class="registitle">注册</n-h1>
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
                  <div class="metamaskEvent">
                    <n-button class="metamask" round @click="getMetaMaskAddress">连接小狐狸</n-button>
                  </div>
                  <div class="regins">
                    <n-button round type="primary" @click="loginin">
                      有账号，去登录
                    </n-button>
                    <n-button :disabled="model.username === null" round type="primary"
                      @click="handleValidateButtonClick">
                      注册
                    </n-button>
                  </div>
                </div>
                <p v-if="model.metamaskAddress" class="metamaskAddress"> Wallet Address：{{
            model.metamaskAddress.slice(0, 5) }}***{{ model.metamaskAddress.slice(-5)}}</p>
                <p v-else></p>
              </n-col>
            </n-row>
          </n-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('../assets/RegisLogin.less');
</style>