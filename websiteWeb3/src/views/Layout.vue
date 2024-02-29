<template>
    <div class="header">
        <div class="wallet"><span>登录用户:{{sasasa}}</span></div>
        <header>
            <compHeader />
        </header>
    </div>

    <main>
        <RouterView />
    </main>
</template>

<script lang="ts" setup>
import compHeader from '@/components/comp_header.vue'
import '@/assets/Layout.less'


</script>