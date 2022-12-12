<!-- src\layout\AppHeader\index.vue -->
<template>
  <el-space size="large">
    <ToggleSidebar />
    <Breadcrumb />
  </el-space>
</template>

<script setup lang="ts">
import ToggleSidebar from './ToggleSidebar.vue'
import Breadcrumb from './Breadcrumb.vue'
</script>

<style scoped lang="less" >
i {
  font-size: 19px;
  cursor: pointer;
}
</style>

