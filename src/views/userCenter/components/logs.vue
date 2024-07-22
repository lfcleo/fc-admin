<template>
    <el-card shadow="never" header="近7天操作记录">
        <fc-table ref="fcTableRef" rowKey="name" :data="data" :columns="columns">
            <template #code="scope">
                <el-tag>{{ scope.row.code }}</el-tag>
            </template>
        </fc-table>
    </el-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ColumnProps } from "@/components/fcTable/model"

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
    { type: "index", label: "序号", width: 80 },
    { prop: "title", label: "业务名称" },
    { prop: "ip", label: "IP" },
    { prop: "code", label: "结果" },
    { prop: "time", label: "创建时间" },
]);

const data = reactive([
    {
        title: "修改用户 lolowan",
        ip: "211.187.11.18",
        code: "成功",
        time: "2022-10-10 08:41:17"
    },
    {
        title: "用户登录",
        ip: "211.187.11.18",
        code: "成功",
        time: "2022-10-10 08:21:51"
    }
])
</script>