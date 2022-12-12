<!-- src\layout\AppHeader\ToggleSidebar.vue -->
<template>
    <el-icon>
        <component
            :is="store.isCollapse ? 'expand' : 'fold'"
            @click="handleCollapse"
        />
    </el-icon>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();

// 因为没有其他地方可以修改侧边栏状态
// 所以这里直接修改
const handleCollapse = () => {
    store.isCollapse = !store.isCollapse;
};
</script>

<style scoped></style>
