<template>
    <el-main>
        <el-alert title="一个非常简单的组件, 目的就是省去重复写样式, 支持千分符/前后缀等." type="success" style="margin-bottom:20px;"></el-alert>
        <el-row :gutter="15">
            <el-col :lg="8">
                <el-card shadow="never">
                    <fc-statistic title="标题" value="112893" description="介绍" tips="Tips" groupSeparator></fc-statistic>
                </el-card>
            </el-col>
            <el-col :lg="8">
                <el-card shadow="never">
                    <fc-statistic title="今日净利润" value="112893.00" prefix="¥" groupSeparator>
                        <fc-trend v-model="trendValue1"></fc-trend>
                    </fc-statistic>
                </el-card>
            </el-col>
            <el-col :lg="8">
                <el-card shadow="never">
                    <fc-statistic title="留言" value="112893" suffix="条" groupSeparator>
                        <fc-trend v-model="trendValue2"></fc-trend>
                    </fc-statistic>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const trendValue1 = ref(7.7)
const trendValue2 = ref(-18.9)
</script>