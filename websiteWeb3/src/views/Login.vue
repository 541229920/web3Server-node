<script lang="ts" setup>
import { ref } from 'vue'
import { type FormInst, type FormItemInst, type FormItemRule, useMessage, type FormRules } from 'naive-ui'
import axios from 'axios'
import router from '@/router';

interface ModelType {
    username: string | null
    password: string | null
}
const modelRef = ref<ModelType>({
    username: null,
    password: null,
})
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const model = modelRef
const message = useMessage()

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
            axios.post('http://localhost:8080/post/login', model.value).then(res => {
                message.success('登录成功')
                // router.push('/')
                console.log(res)
            }).catch(err => {
                message.error('登录失败')
            })
        } else {
            message.error('登录失败')
        }
    })
}


const toRegis = () => {
    router.push('/regis')
}

</script>

<template>
    <div class="bg">
        <div class="regis">
            <div class="regisTable">
                <n-h1 class="registitle">登录</n-h1>
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
                        <n-row :gutter="[0, 24]">
                            <n-col :span="24">

                                <div class="login-butEvent">
                                    <n-button :disabled="model.username === null" round type="primary"
                                        @click="handleValidateButtonClick">
                                        登录
                                    </n-button>
                                    <n-button round @click="toRegis">没有账户？快去注册一个吧！</n-button>
                                    <n-button round>忘记密码</n-button>
                                   
                                </div>
                            </n-col>
                        </n-row>
                    </n-form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('../assets/RegisLogin.less');
</style>