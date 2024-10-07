<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card shadow="never" class="welcome">
                    <el-avatar size="large" src="/img/avatar.jpg" />
                    <div class="tip-body">
                        <div class="tip-title">{{ getTipTitle() }}</div>
                        <div class="tip-desc">
                            <a target="_balnk" href="https://github.com/lfcleo/fc-admin"> FC-Admin</a>
                            使用了最新的Vue3、 Vite、Element-Plus、TypeScript、Pinia等主流技术开发。
                            <a target="_balnk" href="https://doc.fcadmin.fun"> 文档地址 </a>。
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-card shadow="never" class="vab-card vab-card-primary">
                    <fc-statistic title="总销量" value="123456.78" prefix="¥" groupSeparator style="color: white;">
                        <fc-trend v-model="trendValue1"></fc-trend>
                    </fc-statistic>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-card shadow="never" class="vab-card">
                    <fc-statistic title="今日净利润" value="123456.78" prefix="¥" groupSeparator>
                        <fc-trend v-model="trendValue1"></fc-trend>
                    </fc-statistic>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-card shadow="never" class="vab-card">
                    <fc-statistic title="总成交" value="456789.88" prefix="¥" groupSeparator>
                        <fc-trend v-model="trendValue1"></fc-trend>
                    </fc-statistic>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-card shadow="never" class="vab-card">
                    <fc-statistic title="订单量" value="7890" suffix="单" groupSeparator>
                        <fc-trend v-model="trendValue2"></fc-trend>
                    </fc-statistic>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-card shadow="never" class="vab-card">
                    <template #header>
                        <div class="vab-card-header">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <div>待处理</div>
                            <el-badge :value="12"></el-badge>
                        </div>
                    </template>
                    <template #default>
                        <div>处理信息1</div>
                        <div>处理信息2</div>
                        <div>处理信息3</div>
                        <div>处理信息4</div>
                    </template>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-card shadow="never" class="vab-card">
                    <template #header>
                        <div class="vab-card-header">
                            <el-icon>
                                <Message />
                            </el-icon>
                            <div>信息</div>
                        </div>
                        <el-tag type="success">当前版本：{{ packageJson.version }}。更新时间：2024-10-06</el-tag>
                    </template>
                    <template #default>
                        <el-descriptions border :column="3">
                            <el-descriptions-item label="vue">
                                {{ packageJson.dependencies.vue }}
                            </el-descriptions-item>
                            <el-descriptions-item label="element-plus">
                                {{ packageJson.dependencies['element-plus'] }}
                            </el-descriptions-item>
                            <el-descriptions-item label="pinia">
                                {{ packageJson.dependencies.pinia }}
                            </el-descriptions-item>
                            <el-descriptions-item label="vue-router">
                                {{ packageJson.dependencies['vue-router'] }}
                            </el-descriptions-item>
                            <el-descriptions-item label="axios">
                                {{ packageJson.dependencies.axios }}
                            </el-descriptions-item>
                            <el-descriptions-item label="vue-i18n">
                                {{ packageJson.dependencies['vue-i18n'] }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </template>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-card shadow="never" class="vab-card">
                    <template #header>
                        <div class="vab-card-header">
                            <el-icon>
                                <DataLine />
                            </el-icon>
                            <div>分析概览</div>
                        </div>
                    </template>
                    <template #default>
                        <fc-echarts style="height: 300px;" :option="lineOption"></fc-echarts>
                    </template>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-card shadow="never" class="vab-card">
                    <template #header>
                        <div class="vab-card-header">
                            <el-icon>
                                <DataAnalysis />
                            </el-icon>
                            <div>数据统计</div>
                        </div>
                    </template>
                    <template #default>
                        <fc-echarts style="height: 300px;" :option="columnOption"></fc-echarts>
                    </template>
                </el-card>
            </el-col>
        </el-row>
    </el-main>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth';
import packageJson from '../../../package.json'
import { ECOption } from '@/components/fcEcharts/config';
import { onMounted, ref } from 'vue';
import { getDashboardDataApi } from '@/api/modules/dashboard'

const authStore = useAuthStore()
const lineOption = ref<ECOption>({})
const columnOption = ref<ECOption>({})
const trendValue1 = ref(7.7)
const trendValue2 = ref(-6.7)

onMounted(() => {
    getData()
})

const getData = async () => {
    let data = await getDashboardDataApi();
    lineOption.value = data.data.lineChart as ECOption
    columnOption.value = data.data.columnChart as ECOption
}

const getTipTitle = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
        return '上午好，' + authStore.userInfo.userName + '。元气满满的早晨，加油哦。';
    } else if (hour >= 12 && hour < 18) {
        return '中午好，' + authStore.userInfo.userName + '。忙碌了一上午，记得吃午饭哦。';
    } else {
        return '晚上好，' + authStore.userInfo.userName + '。睡觉要有好梦。';
    }
}

</script>

<style scoped>
.welcome :deep(.el-card__body) {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: var(--el-color-white) linear-gradient(120deg, var(--el-color-primary-light-9) 10%, var(--el-color-white)) no-repeat;
}

.welcome .tip-body {
    margin-left: 20px;
}

.welcome .tip-body .tip-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
}

.welcome .tip-body .tip-desc {
    margin-top: 3px;
}

.welcome .tip-body .tip-desc a {
    color: var(--el-color-primary);
}

.vab-card :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    font-size: 14px;
}

.vab-card-primary {
    color: var(--el-color-white);
    background: linear-gradient(90deg, var(--el-color-primary-light-4), var(--el-color-primary));
}

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

.vab-card .vab-card-header .el-icon {
    margin-right: 5px;
    color: var(--el-color-primary);
}
</style>