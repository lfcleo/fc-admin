<!--
* @Description: 树形筛选器
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-06-11 13:01:32
* @LastEditTime: 2024-06-11 13:01:32
-->
<template>
    <div class="card filter">
        <h4 v-if="title" class="title sle">
            {{ title }}
        </h4>
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
        <el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
            <el-tree ref="treeRef" default-expand-all :node-key="name" :data="multiple ? treeData : treeAllData"
                :show-checkbox="multiple" :check-strictly="false" :current-node-key="!multiple ? selected : ''"
                :highlight-current="!multiple" :expand-on-click-node="false" :check-on-click-node="multiple"
                :props="defaultProps" :filter-node-method="filterNode" :default-checked-keys="multiple ? selected : []"
                @node-click="handleNodeClick" @check="handleCheckChange">
                <template #default="scope">
                    <div class="custom-tree-node">
                        <span class="el-tree-node__label">
                            <slot :row="scope">
                                {{ scope.node.label }}
                            </slot>
                        </span>
                        <span style="margin-left: 30px;margin-right: 8px;">
                            <slot name="option" :row="scope"></slot>
                        </span>
                    </div>
                </template>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch, onBeforeMount, nextTick } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
    requestApi?: (data?: any) => Promise<any>;  // 请求分类数据的 api ==> 非必传
    data?: { [key: string]: any }[];            // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
    title?: string;                             // treeFilter 标题 ==> 非必传
    name?: string;                                // 选择的id ==> 非必传，默认为 “id”
    label?: string;                             // 显示的label ==> 非必传，默认为 “label”
    multiple?: boolean;                         // 是否为多选 ==> 非必传，默认为 false
    defaultValue?: any;                         // 默认选中的值 ==> 非必传
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
    name: "id",
    label: "label",
    multiple: false
});

const defaultProps = {
    children: "children",
    label: props.label
};

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();
const setSelected = () => {
    if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
    else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(() => {
    setSelected();
    if (props.requestApi) {
        getData()
    }
});

// 获取数据
const getData = async () => {
    const { data } = await props.requestApi!();
    treeData.value = data;
    treeAllData.value = [{ id: "0", [props.label]: "全部" }, ...data];
}

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
    () => props.defaultValue,
    () => nextTick(() => setSelected()),
    { deep: true, immediate: true }
);

watch(
    () => props.data,
    () => {
        if (props.data?.length) {
            treeData.value = props.data;
            treeAllData.value = [{ id: "0", [props.label]: "全部" }, ...props.data];
        }
    },
    { deep: true, immediate: true }
);

const filterText = ref("");
watch(filterText, val => {
    treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, _data: { [key: string]: any }, node: any) => {
    if (!value) return true;
    let parentNode = node.parent,
        labels = [node.label],
        level = 1;
    while (level < node.level) {
        labels = [...labels, parentNode.label];
        parentNode = parentNode.parent;
        level++;
    }
    return labels.some(label => label.indexOf(value) !== -1);
};

// emit
const emit = defineEmits<{
    change: [value: any];
}>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
    if (props.multiple) return;
    emit("change", data[props.name]);
};

// 多选
const handleCheckChange = () => {
    emit("change", treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef, getData });
</script>

<style scoped lang="scss">
.card {
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-radius: 6px;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
}

.filter {
    box-sizing: border-box;
    // width: 220px;
    height: 100%;
    padding: 18px;
    margin-right: 10px;

    .title {
        margin: 0 0 15px;
        font-size: 18px;
        font-weight: bold;
        color: var(--el-color-info-dark-2);
        letter-spacing: 0.5px;
    }

    .el-input {
        margin: 0 0 15px;
    }

    .el-scrollbar {
        :deep(.el-tree) {
            height: 80%;
            overflow: auto;

            .el-tree-node__content {
                height: 33px;
            }
        }

        :deep(.el-tree--highlight-current) {
            .el-tree-node.is-current>.el-tree-node__content {
                background-color: var(--el-color-primary-light-7);

                // .el-tree-node__label,
                // .el-tree-node__expand-icon {
                //     color: #fff;
                // }

                .is-leaf {
                    color: transparent;
                }
            }
        }
    }
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>