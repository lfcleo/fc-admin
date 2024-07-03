<template>
    <el-container>
        <el-header>
            <div>
                FC-Admin 基于 Vue3、TypeScript、Vite、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。组件会持续更新。以后也会出一些常用的功能。
            </div>
        </el-header>
        <el-main>
            <el-card shadow="never" class="vab-card">
                <template #header>
                    <div class="vab-card-header">
                        <div>平台信息</div>
                    </div>
                    <el-tag type="success">当前版本：{{ packageJson.version }}。更新时间：2024-6-22</el-tag>
                </template>
                <template #default>
                    <el-descriptions :column="2" border>
                        <el-descriptions-item label="Gitee" label-align="left">
                            <el-link type="primary" href="https://gitee.com/lfcleo/fc-admin" target="_blank">
                                Gitee </el-link>
                        </el-descriptions-item>
                        <el-descriptions-item label="Github" label-align="left">
                            <el-link type="primary" href="https://github.com/lfcleo/fc-admin" target="_blank">
                                Github </el-link>
                        </el-descriptions-item>
                        <el-descriptions-item label="文档地址" label-align="left">
                            <el-link type="primary" href="http://121.196.239.128:2234" target="_blank"> 文档地址
                            </el-link>
                        </el-descriptions-item>
                        <el-descriptions-item label="预览地址" label-align="left">
                            <el-link type="primary" href="http://121.196.239.128:1234" target="_blank"> 预览地址 </el-link>
                        </el-descriptions-item>
                    </el-descriptions>
                </template>
            </el-card>
            <el-card shadow="never" class="vab-card" style="margin-top: 20px;">
                <template #header>
                    <div class="vab-card-header">
                        <div>生产环境依赖</div>
                    </div>
                </template>
                <template #default>
                    <el-descriptions :column="3" border>
                        <el-descriptions-item v-for="(value, key) in packageJson.dependencies" :key="key" width="400px"
                            :label="key">
                            <el-tag type="info">
                                {{ value }}
                            </el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                </template>
            </el-card>
            <el-card shadow="never" class="vab-card" style="margin-top: 20px;">
                <template #header>
                    <div class="vab-card-header">
                        <div>开发环境依赖</div>
                    </div>
                </template>
                <template #default>
                    <el-descriptions :column="3" border>
                        <el-descriptions-item v-for="(value, key) in packageJson.devDependencies" :key="key"
                            width="400px" :label="key">
                            <el-tag type="info">
                                {{ value }}
                            </el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                </template>
            </el-card>
        </el-main>
    </el-container>
</template>

<script setup lang='ts'>
import packageJson from '../../../package.json'

</script>

<style scoped>
.vab-card :deep(.el-card__header) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.vab-card .vab-card-header {
    display: flex;
    align-items: center;
}
</style>