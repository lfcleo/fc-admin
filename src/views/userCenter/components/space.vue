<template>
    <el-card shadow="never" header="当前已用量">
        <el-progress :text-inside="true" :stroke-width="20" :color="color" :percentage="value" :format="format" />
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :lg="6">
                <el-card shadow="never">
                    <fc-statistic title="文档" value="7.41" suffix="GB" groupSeparator></fc-statistic>
                </el-card>
            </el-col>
            <el-col :lg="6">
                <el-card shadow="never">
                    <fc-statistic title="图片" value="12.90" suffix="GB" groupSeparator></fc-statistic>
                </el-card>
            </el-col>
            <el-col :lg="6">
                <el-card shadow="never">
                    <fc-statistic title="视音频" value="68.79" suffix="MB" groupSeparator></fc-statistic>
                </el-card>
            </el-col>
            <el-col :lg="6">
                <el-card shadow="never">
                    <fc-statistic title="其他" value="17.58" suffix="GB" groupSeparator></fc-statistic>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const value = ref(39.58)
const color = reactive([
    { color: '#67C23A', percentage: 40 },
    { color: '#E6A23C', percentage: 60 },
    { color: '#F56C6C', percentage: 80 },
])

const format = (percentage: number) => {
    return percentage + "G"
}
</script>