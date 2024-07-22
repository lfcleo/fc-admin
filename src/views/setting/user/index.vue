<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button class="addBtn" type="primary" icon="Plus" @click="addUserClick">新增用户</el-button>
            </div>
            <div class="right-panel">
                <el-input placeholder="用户昵称" clearable></el-input>
                <el-button type="primary" icon="Search"></el-button>
            </div>
        </el-header>
        <el-main class="nopadding">
            <fc-table ref="fcTableRef" :indent="20" :requestApi="getUserListApi" :columns="columns">
                <template #avatar="scope">
                    <el-avatar :size="50" src="/img/avatar.jpg" v-if="scope.row.userId == 1" />
                    <el-avatar :size="50" src="/img/avatar2.gif" v-else-if="scope.row.userId == 2" />
                    <el-avatar :size="50" src="/img/avatar3.gif" v-else />
                </template>
                <template #status="scope">
                    <el-switch v-model="scope.row.status" />
                </template>
                <template #roles="scope">
                    <el-select v-model="scope.row.roles" :disabled="scope.row.userId == 1 ? true : false" multiple
                        placeholder="请选择角色权限" @visible-change="setRole($event, scope.row)"
                        @remove-tag="delRole($event, scope.row)" style="width: 240px">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.code" />
                    </el-select>
                </template>
                <!-- 表格操作 -->
                <template #options="scope">
                    <el-button type="primary" icon="Edit" link @click="editClick(scope.row)">编辑</el-button>
                    <el-button type="primary" icon="Refresh" link>重置密码</el-button>
                    <el-button type="danger" link>删除</el-button>
                </template>
            </fc-table>
        </el-main>

        <!-- 弹出框 -->
        <el-dialog v-model="dialogFormVisible" :title="formData.userId ? '编辑用户' : '新建用户'" width="500"
            @closed="dialogClosed">
            <el-form :model="formData" label-width="auto">
                <el-form-item label="用户头像" prop="avatar">
                    <fc-upload-img v-model:image-url="formData.avatar" :requestApi="uploadImg" :drag="false"
                        border-radius="50%">
                        <template #empty>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                            <span>请上传头像</span>
                        </template>
                    </fc-upload-img>
                </el-form-item>
                <el-form-item label="昵 称" prop="userName">
                    <el-input v-model="formData.userName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮 箱" prop="email">
                    <el-input v-model="formData.email" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formData.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-switch v-model="formData.status" />
                </el-form-item>
                <el-form-item label="角色权限" prop="status">
                    <el-select v-model="formData.roles" :disabled="formData.userId == 1 ? true : false" multiple
                        placeholder="请选择角色权限" @visible-change="setRole($event, formData)"
                        @remove-tag="delRole($event, formData)" style="width: 240px">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.code" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { getUserListApi, getRoleList1Api } from '@/api/modules/system';
import { ColumnProps, FcTableInstance } from "@/components/fcTable/model"
import { UserModel, RoleModel } from "@/models/systemModel";
import { uploadImg } from '@/api/modules/auth';
import { ElMessage } from "element-plus";

const columns = reactive<ColumnProps<UserModel>[]>([
    { prop: "avatar", label: "头像", width: 100 },
    { prop: "userId", label: "ID", width: 80 },
    { prop: "userName", label: "昵称" },
    { prop: "email", label: "邮箱" },
    { prop: "phone", label: "手机号" },
    { prop: "roles", label: "角色权限", width: 280 },
    { prop: "status", label: "启用" },
    { prop: "options", label: "操作", width: 280, fixed: "right" }
]);
const fcTableRef = ref<FcTableInstance>();  // fcTabel 实例
const formData = ref<UserModel>({
    userId: 0,
    userName: '',
    avatar: '',
    email: '',
    phone: '',
    status: false,
    roles: [],
})
const dialogFormVisible = ref(false)
const roleList = ref<RoleModel[]>()

onMounted(() => {
    getRoleList()   // 获取角色列表
})

// 获取角色列表
const getRoleList = async () => {
    const rList = await getRoleList1Api()
    roleList.value = rList.data
}

// 新增用户
const addUserClick = () => {
    dialogFormVisible.value = true
}

// 编辑用户信息
const editClick = (row: UserModel) => {
    formData.value = row
    dialogFormVisible.value = true
}

// 修改权限
const setRole = (visible: boolean, row: UserModel) => {
    if (row.roles.length == 0) {
        ElMessage({
            type: "error",
            message: "必须有1个默认角色权限"
        });
        return
    }
    if (dialogFormVisible.value) return  //dialog弹窗设置的无需提交数据，弹窗点击确定的时候再提交数据
    if (!visible) {
        ElMessage({
            type: "success",
            message: "设置角色" + row.roles
        });
    }
}

// 删除权限
const delRole = (tagValue: any, row: UserModel) => {
    if (row.roles.length == 0) {
        row.roles = [tagValue]
        ElMessage({
            type: "error",
            message: "必须有1个默认角色权限"
        });
    }
}

// 关闭dialog，重新赋值
const dialogClosed = () => {
    formData.value = {
        userId: 0,
        userName: '',
        avatar: '',
        email: '',
        phone: '',
        status: false,
        roles: [],
    }
}

</script>

<style scoped></style>