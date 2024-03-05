<template>
  <n-message-provider 
  :locale="zhCN" :date-locale="dateZhCN"

  >
    <n-config-provider 
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
    :theme="darkTheme"
    >
      <RouterView />
    </n-config-provider>
  </n-message-provider>
</template>
<script lang="ts" setup>
  import { NConfigProvider } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'
  import { darkTheme } from 'naive-ui'
  </script>