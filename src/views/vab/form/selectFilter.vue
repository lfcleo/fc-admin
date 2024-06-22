<template>
    <el-main>
        <el-card shadow="never" header="分类筛选器">
            <fc-select-filter :data="filterData" :default-values="filterResult"
                @change="changeFilter"></fc-select-filter>
        </el-card>
        <el-card shadow="never" header="返回值" style="margin-top: 15px;">
            <pre>返回值: {{ filterResult }}</pre>
        </el-card>
    </el-main>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const filterResult = ref({ state: "1", type: ["1", "3"] });

const changeFilter = (val: typeof filterResult.value) => {
    filterResult.value = val;
};

const filterData = [
    {
        title: "物流状态(单)",
        key: "state",
        options: [
            {
                label: "全部",
                value: ""
            },
            {
                label: "已下单",
                value: "1",
                icon: "ShoppingCart"
            },
            {
                label: "已发货",
                value: "2",
                icon: "Van"
            },
            {
                label: "已签收",
                value: "3",
                icon: "Edit"
            },
            {
                label: "已退回",
                value: "4",
                icon: "Guide"
            },
            {
                label: "已完成",
                value: "5",
                icon: "CircleCheck"
            }
        ]
    },
    {
        title: "商品类型(多)",
        key: "type",
        multiple: true,
        options: [
            {
                label: "全部",
                value: ""
            },
            {
                label: "食品类",
                value: "1"
            },
            {
                label: "服装类",
                value: "2"
            },
            {
                label: "家具类",
                value: "3"
            },
            {
                label: "日用品类",
                value: "4"
            }
        ]
    }
];
</script>

<style scoped></style>