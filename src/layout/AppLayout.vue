<!-- src\layout\AppLayout.vue -->
<template>
    <el-container>
        <el-aside :class="{show: !store.isCollapse}">
            <AppMenu />
        </el-aside>
        <el-container>
            <el-header>
                <AppHeader />
            </el-header>
            <el-main>
                <!-- 子路由出口 -->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts"> 
import AppMenu from "./AppMenu/index.vue";
import AppHeader from "./AppHeader/index.vue";
import { useStore } from "@/store";

const store = useStore();

</script>

<style scoped lang="less">
.el-container {
    height: 100vh;
}
.el-header {
    background-color: #fff;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-aside {
    width: 60px;
    background-color: #304156;
    transition: width 0.3s;
    overflow: hidden;
}

.el-aside.show {
    width: 200px;
}
.el-main {
    background-color: #e9eef3;
}
</style>
