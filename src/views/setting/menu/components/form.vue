<template>
    <el-container>
        <el-header style="padding-bottom: 10px;height: auto;">
            <div class="left-panel"></div>
            <div class="right-panel">
                <el-button v-role="['admin']" class="addBtn" type="primary" @click="submitClick">提 交</el-button>
                <el-button icon="Close" circle @click="() => { emit('cancel') }" />
            </div>
        </el-header>
        <el-main style="padding-top: 10px;">
            <el-row :gutter="40">
                <el-col :lg="12">
                    <h3 class="margin-bottom-10">{{ menuModel.meta.title || '新增菜单' }}</h3>
                    <el-form :model="menuModel" ref="formRef" label-width="90px" label-position="left">
                        <el-form-item label="显示标题" prop="meta.title" :rules="{ required: true, message: '请输入菜单显示标题' }">
                            <el-input v-model="menuModel.meta.title" clearable placeholder="菜单显示标题"
                                :maxlength="6"></el-input>
                        </el-form-item>
                        <el-form-item label="上级菜单" prop="meta.title">
                            <el-select v-model="props.parentMenu[0].id" disabled style="width: 240px">
                                <el-option v-for="item in props.parentMenu" :key="item.id" :label="item.title"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-radio-group v-model="menuType" @change="menuTypeChange">
                                <el-radio-button label="菜单" value="MENU" />
                                <el-radio-button label="按钮" value="BUTTON" />
                                <el-radio-button label="外链" value="LINK" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="名称" prop="name" :rules="{ required: true, message: '请输入菜单名称' }">
                            <el-input v-model="menuModel.name" clearable placeholder="菜单名称"></el-input>
                            <div class="el-form-item-msg">系统唯一且与内置组件名一致，否则导致缓存失效</div>
                        </el-form-item>
                        <el-form-item label="菜单图标" prop="meta.icon">
                            <fc-icon-select v-model="menuModel.meta.icon" clearable></fc-icon-select>
                        </el-form-item>
                        <el-form-item label="路由地址" prop="path" :rules="{ required: true, message: '请输入路由地址' }">
                            <el-input v-model="menuModel.path" clearable
                                :placeholder="menuType ? '以http或https开头的外部连接网址' : '路由地址'"></el-input>
                        </el-form-item>
                        <el-form-item label="重定向" prop="redirect">
                            <el-input v-model="menuModel.redirect" clearable placeholder="重定向的路由地址"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单高亮" prop="active">
                            <el-input v-model="menuModel.meta.active" clearable placeholder=""></el-input>
                            <div class="el-form-item-msg">子节点或详情页需要高亮的上级菜单路由地址</div>
                        </el-form-item>
                        <el-form-item label="视图" prop="component">
                            <el-input v-model="menuModel.component" clearable placeholder="">
                                <template #prepend>views/</template>
                            </el-input>
                            <div class="el-form-item-msg">如父节点、外链等没有视图的菜单不需要填写</div>
                        </el-form-item>
                        <el-form-item label="页面缓存" prop="meta.isKeepAlive">
                            <el-switch v-model="menuModel.meta.isKeepAlive" />
                            <div class="el-form-item-msg">缓存后每次切换标签页，页面内容不会重新加载</div>
                        </el-form-item>
                        <el-form-item label="是否隐藏" prop="meta.isHide">
                            <el-switch v-model="menuModel.meta.isHide" />
                            <div class="el-form-item-msg">菜单不显示在导航中，但用户依然可以访问，例如详情页</div>
                        </el-form-item>
                        <el-form-item label="整页路由" prop="isFull">
                            <el-switch v-model="menuModel.meta.isFull" />
                        </el-form-item>
                        <el-form-item label="固定标签页" prop="isAffix">
                            <el-switch v-model="menuModel.meta.isAffix" />
                        </el-form-item>
                        <el-form-item label="标签" prop="meta.tag">
                            <el-input v-model="menuModel.meta.tag" clearable placeholder="最长6个字"
                                :maxlength="6"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :lg="12" class="parme-list">
                    <h3 class="margin-bottom-10">参数设置</h3>
                    <div class="parame-type">
                        <div>参数类型</div>
                        <el-radio-group class="margin-bottom-10" v-model="parameType">
                            <el-radio-button label="query" value="query" />
                            <el-radio-button label="params" value="params" />
                        </el-radio-group>
                    </div>
                    <fc-form-table stripe ref="ftRef" :data="parameList" :columns="columns"
                        :data-template="dataTemplate">
                        <template #key="scope">
                            <el-input v-model="scope.row.key" placeholder="请输入参数key"></el-input>
                        </template>
                        <template #value="scope">
                            <el-input :disabled="parameType == 'params' ? true : false" v-model="scope.row.value"
                                placeholder="请输入参数值"></el-input>
                        </template>
                    </fc-form-table>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';
import { FormInstance } from 'element-plus'
import { FTColumnProps } from '@/components/fcFormTable/index.vue'
import FcFormTable from '@/components/fcFormTable/index.vue'

interface PropsModel {
    parentMenu: [{ title: string, id: number }],   //上层路由菜单的标题和id
    menuModel: Menu.MenuOptions,
}

// formTable模型
interface ftModel {
    key: string;
    value: string;
}

const props = defineProps<PropsModel>();
const { menuModel } = toRefs(props)
const menuType = ref(false)                 //菜单类型，默认false是菜单，true是外链
const parameType = ref('query')             //参数类型，query 和 params
const formRef = ref<FormInstance>()         //form实例
const ftRef = ref<InstanceType<typeof FcFormTable>>();  //fc-form-table实例
// 表单表格配置项
const columns = reactive<FTColumnProps<ftModel>[]>([
    { prop: "key", label: "参数key" },
    { prop: "value", label: "参数值value" },
]);
// fc-form-table的默认模板
const dataTemplate = reactive<ftModel>({
    key: '',
    value: '',
});
// fc-form-table所需的值
const parameList = reactive<ftModel[]>([])
const emit = defineEmits(['submit', 'cancel']); //定义emit

// 菜单类型变化监听,是否是外链
const menuTypeChange = (value: string) => {
    menuModel.value.meta.type = value
}

// 提交按钮响应方法
const submitClick = async () => {
    //校验
    await formRef.value?.validate((valid) => {
        if (valid) {
            //判断是否设置了默认参数
            if (parameList.length > 0) {
                let qString = '';
                //判断参数类型，是query还是params
                if (parameType.value == 'query') {
                    //query形式，把参数拼接为 ?id=123&title=%E6%A0%87%E9%A2%98 这种形式
                    qString = '?'
                    parameList.forEach((param, index) => {
                        qString += `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`;   //键值进行URL编码，以避免特殊字符导致问题
                        if (index < parameList.length - 1) {
                            qString += '&';
                        }
                    });
                } else {
                    //query形式，把参数拼接为 /:id/:title 这种形式
                    parameList.forEach(param => {
                        qString += `/:${param.key}`;
                    });
                }
                menuModel.value.path += qString
            }
            //如果校验通过，提交菜单数据，参数类型，参数数据
            emit('submit');
        }
    })
}

</script>

<style scoped>
.margin-20 {
    margin: 20px;
}

.margin-bottom-10 {
    margin-bottom: 10px;
}

.parme-list {
    border-left: 1px solid #eee;
}

.parame-type {
    display: flex;
    align-items: center;

    div {
        height: 32px;
        font-size: 14px;
        margin-right: 20px;
    }
}
</style>