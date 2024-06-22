<template>
    <el-main>
        <div class="query-card">
            <fc-query :showLength="3" :formItems="formItems" @search="handleSearch" @reset="handleReset"
                @enterKey="handleSearch"></fc-query>
        </div>
        <el-card shadow="never" style="margin-top: 20px;">
            <div>搜索数据：{{ requestData }}</div>
        </el-card>
    </el-main>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const formItems = ref<any>([
    {
        type: 'input',
        label: '输入框',
        placeholder: '请输入名字',
        field: 'name',
    },
    {
        type: 'select',
        label: '下拉(单选)',
        placeholder: '请选择类型',
        field: 'type1',
        options: [
            {
                value: '1',
                label: '类型1',
            },
            {
                value: '2',
                label: '类型2',
            }
        ]
    },
    {
        type: 'select',
        label: '下拉(多选)',
        placeholder: '请选择类型',
        field: 'type2',
        selectMultiple: true,
        options: [
            {
                value: '1',
                label: '类型1',
            },
            {
                value: '2',
                label: '类型2',
            }
        ]
    },
    {
        type: 'date',
        label: '日期(天)',
        placeholder: '请选择日期',
        field: 'date1',
        dateType: 'date',
        dateShortcuts: [
            {
                text: '今天',
                value: new Date(),
            },
            {
                text: '昨天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24)
                    return date
                },
            },
            {
                text: '一周前',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                    return date
                },
            },
        ],
        dateDisabled: (time: Date) => {
            return time.getTime() > Date.now()
        }
    },
    {
        type: 'date',
        label: '日期(范围)',
        placeholder: '请选择日期',
        field: 'date2',
        dateType: 'daterange',
    },
    {
        type: 'date',
        label: '日期时间',
        placeholder: '请选择日期时间',
        field: 'date3',
        dateType: 'datetime',
        dateFormat: 'YYYY-MM-DD hh:mm:ss',
        dateShortcuts: [
            {
                text: '今天',
                value: new Date(),
            },
            {
                text: '昨天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24)
                    return date
                },
            },
            {
                text: '一周前',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                    return date
                },
            },
        ],
        dateDisabled: (time: Date) => {
            return time.getTime() > Date.now()
        }
    },
])

const requestData = ref<any>()

const handleSearch = (formData: any) => {
    console.log(formData, '搜索表单')
    requestData.value = formData
}

const handleReset = () => {
    console.log('重置表单')
}
</script>

<style scoped></style>