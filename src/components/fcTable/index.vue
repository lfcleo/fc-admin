<!--
* @Description: 表格
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-25 11:08:02
* @LastEditTime: 2024-05-25 11:08:02
-->
<template>
    <div class="fc-table-box" :style="{ 'height': _height }" ref="fcTableMain" v-loading="loading">
        <div class="fc-table" :style="{ 'height': _table_height }">
            <el-table ref="tableRef" v-bind="$attrs" :data="processTableData" :border="border" :row-key="rowKey"
                @selection-change="selectionChange">
                <slot></slot>
                <template v-for="item in tableColumns" :key="item">
                    <el-table-column v-bind="item" :align="item.align ?? 'center'"
                        :reserve-selection="item.type == 'selection'" :selectable="selectable"
                        v-if="item.type && columnTypes.includes(item.type)">
                        <template #default="scope">
                            <template v-if="item.type == 'expand'">
                                <slot :name="item.type" v-bind="scope" />
                            </template>
                            <el-radio v-if="item.type == 'radio'" v-model="radio" :label="scope.row[rowKey]">
                                <i></i>
                            </el-radio>
                            <el-tag v-if="item.type == 'sort'" class="move">
                                <el-icon>
                                    <DCaret />
                                </el-icon>
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column v-bind="item" :align="item.align ?? 'center'"
                        v-if="!item.type && item.prop && !item.isHide">
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
        <!-- 底部视图 -->
        <div :class="pagination || showColumnBtn || showRefreshBtn ? 'fc-table-bottom' : ''">
            <!-- 按钮组 -->
            <div class="bottom-left">
                <!-- 动态列 -->
                <el-popover v-if="showColumnBtn" placement="top-start" :width="600" trigger="click" :hide-after="0">
                    <template #reference>
                        <el-button v-if="showRefreshBtn" icon="Operation" circle @click="" />
                    </template>
                    <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                        <div style="font-size: 16px;">列设置</div>
                        <el-button class="addBtn" type="primary" @click="resetColumn">重置</el-button>
                    </div>
                    <el-table :data="columnTableData" class-name="column-table" row-key="label">
                        <el-table-column v-slot="scope" align="center" label="" width="60">
                            <el-tag :class="scope.row.fixed ? '' : 'column-move'"
                                :type="scope.row.fixed ? 'info' : 'primary'">
                                <el-icon>
                                    <DCaret />
                                </el-icon>
                            </el-tag>
                        </el-table-column>
                        <el-table-column v-slot="scope" prop="isHide" align="center" label="隐藏">
                            <el-switch v-model="scope.row.isHide"></el-switch>
                        </el-table-column>
                        <el-table-column prop="label" align="center" label="列名" />
                        <el-table-column v-slot="scope" prop="width" align="center" label="宽度">
                            <el-input v-model="scope.row.width" placeholder="自动"></el-input>
                        </el-table-column>
                        <el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
                            <el-switch v-model="scope.row.sortable"></el-switch>
                        </el-table-column>
                        <template #empty>
                            <el-empty description="暂无可配置的列" :image-size="100"></el-empty>
                        </template>
                    </el-table>
                </el-popover>
                <!-- 刷新按钮 -->
                <el-button v-if="showRefreshBtn" icon="Refresh" circle @click="getTableList" />
            </div>
            <slot name="toolButtons"></slot>
            <!-- 分页组件 -->
            <slot name="pagination">
                <div v-if="pagination">
                    <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                        :current-page="pageable.page" :page-size="pageable.pageSize" :total="pageable.total"
                        :page-sizes="pageSizes" @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"></el-pagination>
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { ElTable } from "element-plus";
import { useTable, useSelection } from './hooks'
import { ColumnProps, TypeProps } from "./model";
import Sortable from "sortablejs";

export interface FcTableSelectModel {
    columns: ColumnProps[];                     // 列配置项  ==> 必传
    data?: any[];                               // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
    requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
    initParam?: any;                            // 初始化请求参数 ==> 非必传（默认为{}）
    requestError?: (params: any) => void;       // 表格 api 请求错误监听 ==> 非必传
    dataCallback?: (data: any) => any;          // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    pagination?: boolean;                       // 是否需要分页组件 ==> 非必传（默认为true）
    pageSizes?: number[];                       // 每页显示个数选择器的选项设置 ==> 非必传 默认[10, 20, 50, 100]
    height?: number;                            // 整体视图高度，默认100%
    border?: boolean;                           // 是否带有纵向边框 ==> 非必传（默认为true）
    rowKey?: string;                            // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    emptyText?: string;                         // 空数据展示提示文字 ==> 非必传，默认为暂无数据
    showbottomView?: boolean;                   // 是否显示底部试图 ==> 非必传（默认为true）
    showRefreshBtn?: boolean;                   // 是否需要刷新按钮 ==> 非必传（默认为true）
    showColumnBtn?: boolean;                    // 是否需要列设置按钮 ==> 非必传（默认为true）
    selectable?: (row: any, index: number) => boolean;  //决定这一行的 CheckBox 是否可以勾选,仅对 type=selection 的列有效，同官方的selectable
}
const props = withDefaults(defineProps<FcTableSelectModel>(), {
    initParam: {},
    pagination: true,
    border: false,
    pageSizes: () => [10, 20, 50, 100],
    rowKey: "id",
    emptyText: "暂无数据",
    showbottomView: true,
    showRefreshBtn: true,
    showColumnBtn: true,
});
const tableRef = ref<InstanceType<typeof ElTable>>();    // table 实例
// 表格操作 Hooks   searchInitParam,
const { tableData, pageable, loading, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
    useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback, props.requestError);
// 表格多选 Hooks
const { selectionChange, selectedList, selectedListKeys, isSelected } = useSelection(props.rowKey);
const radio = ref("");          // 单选值
const tableColumns = ref<ColumnProps[]>(props.columns);                        // 接收 columns 并设置为响应式
const columnTypes: TypeProps[] = ["selection", "radio", "index", "expand", "sort"]; // column 列类型

// 监听页面 initParam 改变，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });
// 定义 emit 事件
const emit = defineEmits<{
    dargSort: [{ newIndex?: number; oldIndex?: number }];
}>();

onMounted(() => {
    // tableColumns.value = JSON.parse(JSON.stringify(props.columns))
    dragSort();
    if (props.requestApi) {
        getTableList()
    }
})

// 拖拽排序
const dragSort = () => {
    const tbody = document.querySelector(".el-table__body-wrapper tbody") as HTMLElement;
    Sortable.create(tbody, {
        handle: ".move",
        animation: 300,
        onEnd({ newIndex, oldIndex }) {
            const [removedItem] = processTableData.value.splice(oldIndex!, 1);
            processTableData.value.splice(newIndex!, 0, removedItem);
            emit("dargSort", { newIndex, oldIndex });
        }
    });

    if (props.showColumnBtn) {
        const tbody1 = document.querySelector(".column-table .el-table__body-wrapper tbody") as HTMLElement;
        Sortable.create(tbody1, {
            handle: ".column-move",
            animation: 300,
            onEnd({ newIndex, oldIndex }) {
                const [removedItem] = tableColumns.value.splice(oldIndex!, 1);
                tableColumns.value.splice(newIndex!, 0, removedItem);
            }
        });
    }
};

// 处理表格数据
const processTableData = computed(() => {
    if (!props.data) return tableData.value;
    if (!props.pagination) return props.data;
    return props.data.slice(
        (pageable.value.page - 1) * pageable.value.pageSize,
        pageable.value.pageSize * pageable.value.page
    );
});
const _height = computed(() => {
    return props.height ? props.height + 'px' : '100%'
})
const _table_height = computed(() => {
    return !props.pagination && !props.showRefreshBtn && !props.showColumnBtn ? "100%" : "calc(100% - 56px)"
})
// 过滤行配置，有type的属性
const columnTableData = computed(() => {
    return tableColumns.value.filter(item => !item.hasOwnProperty('type'));
})
const resetColumn = () => {
    tableColumns.value = JSON.parse(JSON.stringify(props.columns))
}

// 暴露给父组件的参数和方法 (外部需要什么，都可以从这里暴露出去)
defineExpose({
    element: tableRef,
    tableData: processTableData,    //表格数据
    radio,                          //表格单选的数据
    pageable,                       //分页信息，包含：page:当前页数; pageSize:每页展示数量; total:总共条数;
    getTableList,                   //获取表格数据请求方法，只有传入requestApi时才有用
    isSelected,                     //是否选择数据，type=selection时有用
    selectedList,                   //选择数据列表数组，type=selection时有用
    selectedListKeys,               //选择数据列表的ID数组，type=selection时有用
    search,                         //搜索方法
    searchParam,                    //搜索参数
    reset,                          //重置参数，初始化方法
    loading,                        //是否正在加载中
});

</script>

<style scoped lang="scss">
.fc-table-box,
.fc-table {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;

    // el-table 表格样式
    .el-table {
        flex: 1;

        table {
            width: 100%;
        }

        .el-table__header th {
            height: 45px;
            font-size: 15px;
            font-weight: bold;
            color: var(--el-text-color-primary);
            background: var(--el-fill-color-light);
        }

        .el-table__row {
            height: 45px;
            font-size: 14px;

            .move {
                cursor: move;

                .el-icon {
                    cursor: move;
                }
            }
        }

        // 设置 el-table 中 header 文字不换行，并省略
        .el-table__header .el-table__cell>.cell {
            white-space: wrap;
        }

        // 解决表格数据为空时样式不居中问题(仅在element-plus中)
        .el-table__empty-block {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .table-empty {
                line-height: 30px;
            }
        }

        // table 中 image 图片样式
        .table-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    // 表格 pagination 样式
    .el-pagination {
        display: flex;
        justify-content: flex-end;
        margin: 12px 20px;
    }
}

/* el-table 组件大小 */
.el-table--small {
    .el-table__header th {
        height: 40px !important;
        font-size: 14px !important;
    }

    .el-table__row {
        height: 40px !important;
        font-size: 13px !important;
    }
}

.el-table--large {
    .el-table__header th {
        height: 50px !important;
        font-size: 16px !important;
    }

    .el-table__row {
        height: 50px !important;
        font-size: 15px !important;
    }
}

// 底部组件
.fc-table-bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .bottom-left {
        margin-left: 20px;
        margin-right: 10px;
        height: 56px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
}
</style>