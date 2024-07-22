<!--
* @Description: 表单表格
* @Version: 1.0.1
* @Author: Leo https://github.com/leo-lfc
* @Date: 2024-07-16 09:21:21
* @LastEditTime: 2024-07-16 09:21:21
-->
<template>
    <div class="fc-form-table" ref="fcFormTable">
        <el-table ref="tableRef" v-bind="$attrs" :data="processTableData" :border="border" :row-key="rowKey">
            <slot></slot>
            <el-table-column type="index" width="50" fixed="left" align="center">
                <template #header>
                    <el-button v-if="!hideAdd" type="primary" icon="Plus" size="small" circle
                        @click="addRow()"></el-button>
                </template>
                <template #default="scope">
                    <div :class="['fc-form-table-handle', 'fc-form-table-handle-delete']">
                        <span>{{ scope.$index + 1 }}</span>
                        <el-button type="danger" icon="Delete" size="small" plain circle
                            @click="delRow(scope.$index)"></el-button>
                    </div>
                </template>
            </el-table-column>

            <template v-for="item in tableColumns" :key="item">
                <el-table-column v-bind="item" :align="item.align ?? 'center'"
                    v-if="item.type && columnTypes.includes(item.type)">
                    <template #default>
                        <el-tag v-if="item.type == 'sort'" class="move">
                            <el-icon>
                                <DCaret />
                            </el-icon>
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column v-bind="item" :align="item.align ?? 'center'" v-if="!item.type && item.prop">
                    <!-- 自定义表格头部内容，slot的格式为 item.prop+Header,例如：#idHeader-->
                    <template #header="scope">
                        <slot v-if="$slots[item.prop] + 'Header'" :name="item.prop + 'Header'" v-bind="scope" />
                    </template>
                    <!-- 自定义表格内容，slot的格式为 item.prop,例如：#id-->
                    <template #default="scope">
                        <slot v-if="$slots[item.prop]" :name="item.prop" v-bind="scope" />
                    </template>
                </el-table-column>
            </template>
            <!-- 插入表格最后一行之后的插槽 -->
            <template #append>
                <slot name="append" />
            </template>
            <!-- 无数据 -->
            <template #empty>
                <el-empty :description="emptyText" :image-size="100"></el-empty>
            </template>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ElTable } from "element-plus";
import Sortable from "sortablejs";

// 表格列设置类型
export type TypeProps = "index" | "sort";

export interface FTColumnProps<T = any>
    extends Partial<Omit<TableColumnCtx<T>, "type" | "children" | "renderCell" | "renderHeader">> {
    type?: TypeProps; // 列类型
}

export interface FcFormTableModel {
    columns: FTColumnProps[];               // 列配置项  ==> 必传
    data: any[];                            // table data 数据 ==> 必传
    dataTemplate: any;                      // 默认数据模板
    border?: boolean;                       // 是否带有纵向边框 ==> 非必传（默认为true）
    rowKey?: string;                        // 行数据的 Key，用来优化 Table 的渲染，所指定的 id ==> 非必传（默认为 id）
    emptyText?: string;                     // 空数据展示提示文字 ==> 非必传，默认为暂无数据
    hideAdd?: boolean;                      // 是否隐藏新增按钮，默认否
}

const props = withDefaults(defineProps<FcFormTableModel>(), {
    border: true,
    rowKey: "id",
    emptyText: "暂无数据",
    hideAdd: false
});

const emit = defineEmits<{
    dargSort: [{ newIndex?: number; oldIndex?: number }];
}>();

const tableRef = ref<InstanceType<typeof ElTable>>();           // table 实例
const tableColumns = reactive<FTColumnProps[]>(props.columns);  // 接收 columns 并设置为响应式
const columnTypes: TypeProps[] = ["index", "sort"];             // column 列类型
const data = ref(props.data)

onMounted(() => {
    dragSort();
})

// 处理表格数据
const processTableData = computed({
    get() {
        return data.value
    },
    set(newValue: any[]) {
        data.value = newValue
    },
});

// 拖拽排序
const dragSort = () => {
    const tbody = document.querySelector(".el-table__body-wrapper tbody") as HTMLElement;
    Sortable.create(tbody, {
        handle: ".move",
        animation: 300,
        ghostClass: "ghost",
        onEnd({ newIndex, oldIndex }) {
            const tempList = [...processTableData.value]
            const [removedItem] = tempList.splice(oldIndex!, 1);
            tempList.splice(newIndex!, 0, removedItem);
            data.value = []
            nextTick(() => {
                data.value = tempList
            });
            emit("dargSort", { newIndex, oldIndex });
        }
    });
};

// 新增数据
const addRow = (row?: any) => {
    const data = row ?? JSON.parse(JSON.stringify(props.dataTemplate))
    processTableData.value.push(data)
}

// 删除数据
const delRow = (index: number) => {
    processTableData.value.splice(index, 1)
}

// 暴露给父组件的参数和方法 (外部需要什么，都可以从这里暴露出去)
defineExpose({
    element: tableRef,              // table实例
    tableData: processTableData,    // 数据
    addRow,
    delRow
});
</script>

<style scoped>
.fc-form-table {
    width: 100%;
}

.fc-form-table .fc-form-table-handle {
    text-align: center;
}

.fc-form-table .fc-form-table-handle span {
    display: inline-block;
}

.fc-form-table .fc-form-table-handle button {
    display: none;
}

.fc-form-table .hover-row .fc-form-table-handle-delete span {
    display: none;
}

.fc-form-table .hover-row .fc-form-table-handle-delete button {
    display: inline-block;
}

.fc-form-table .move {
    text-align: center;
    font-size: 14px;
    margin-top: 3px;
}
</style>