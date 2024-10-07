<template>
    <el-main>
        <el-card>
            <div>表格详情页面</div>
            <div>此页面不在菜单栏中展示，把动态路由的meta.isHide设置为true</div>
            <div>页面跳转传值和vue-router中一致</div>
            <div>路由参数params:{{ route.params }}</div>
            <div>查询参数query:{{ route.query }}</div>
        </el-card>
    </el-main>
</template>

<script setup lang='ts'>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped></style>