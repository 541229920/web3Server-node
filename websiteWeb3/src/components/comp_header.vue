<template>
    <header class="container hrStyle">
        <nav>
            <div class="logo"></div>
            <div class="mediumlogo"></div>
            <div class="routerlinks">
                <RouterLink to="/">首页</RouterLink>
                <RouterLink to="/news">资讯</RouterLink>
                <RouterLink to="/file">文件</RouterLink>
                <RouterLink to="/about">关于</RouterLink>
            </div>
        </nav>
        <nav>
            <n-dropdown trigger="hover" :options="options" @select="handleSelect">
                <n-tag>
                    {{ ShowUserName() }}
                    <template #avatar>
                        <n-avatar :src="assestSrc.UserPhotoUrl('photo')" />
                    </template>
                </n-tag>
            </n-dropdown>
        </nav>
    </header>
</template>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import { AssestSrc } from '@/uitls/assestSrc';

import router from '@/router';

import '@/assets/header.less';

const assestSrc = new AssestSrc()
const message = useMessage()
const route = useRoute()

const options = [
    {
        label: '个人资料',
        key: '个人资料'
    },
    {
        label: '退出登录',
        key: '退出登录'
    }
]
const handleSelect = (key: string | number) => {
    switch (key) {
        case '个人资料':
            router.push('/')
            break;
        case '退出登录':
            router.push('/login')
            message.success(key)
            break;
    }
}

const userInfo = route.params
const ShowUserName = () => {
    if (!userInfo.address) {
        return userInfo.username
    } else {
        return `${userInfo.address.slice(0, 3) + '****' + userInfo.address.slice(-5)}`
    }
}
</script>
