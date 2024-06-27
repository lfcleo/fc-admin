<template>
    <el-main>
        <el-card shadow="never" header="单图片上传">
            <div class="upload-list">
                <fc-upload-img v-model:image-url="avatar1" :requestApi="uploadImg" :file-size="3"
                    @update:imageUrl="handleImageUrlUpdate">
                    <template #tip> 上传图片最大为 3M </template>
                </fc-upload-img>

                <fc-upload-img v-model:image-url="avatar2" :requestApi="uploadImg" :drag="false" border-radius="50%">
                    <template #empty>
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <span>请上传头像</span>
                    </template>
                    <template #tip> 圆形组件（禁止拖拽上传） </template>
                </fc-upload-img>

                <fc-upload-img v-model:image-url="avatar3" :requestApi="uploadImg" width="250px">
                    <template #empty>
                        <el-icon>
                            <Picture />
                        </el-icon>
                        <span>请上传 Banner 图</span>
                    </template>
                    <template #tip> 长方形组件（可拖拽上传） </template>
                </fc-upload-img>

                <fc-upload-img v-model:image-url="avatar4" :requestApi="uploadImg" disabled>
                    <template #tip> 无图（禁用上传） </template>
                </fc-upload-img>

                <fc-upload-img v-model:image-url="avatar5" :requestApi="uploadImg" disabled>
                    <template #tip> 有图（禁用编辑、删除） </template>
                </fc-upload-img>

                <fc-upload-img v-model:image-url="avatar6" :requestApi="uploadImg" :cropper="true"
                    @update:imageUrl="handleImageUrlUpdate">
                    <template #tip> 启用图片裁剪 </template>
                </fc-upload-img>

                <fc-upload-img v-model:image-url="avatar7" :requestApi="uploadImg" :comporess="true"
                    @update:imageUrl="handleImageUrlUpdate">
                    <template #tip> 上传前压缩图片 </template>
                </fc-upload-img>
            </div>
        </el-card>

        <el-card shadow="never" header="多图片上传" style="margin-top: 20px;">
            <div class="upload-list" style="margin-top: 20px;">
                <fc-upload-imgs v-model:file-list="fileList1" :requestApi="uploadImg" width="250px" :sortable="true">
                    <template #empty>
                        <el-icon>
                            <Picture />
                        </el-icon>
                        <span>请上传图片</span>
                    </template>
                    <template #tip> 图片拖拽排序,拖拽上传 </template>
                </fc-upload-imgs>
            </div>
        </el-card>

        <!-- 表单使用 -->
        <div class="form-box">
            <div class="card">
                <el-alert title="图片上传组件在 form 表单中使用，上传之后成功会自动重新校验" type="warning" effect="dark" :closable="false" />
                <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="fromModel1">
                    <el-form-item label="用户头像" prop="avatar">
                        <fc-upload-img v-model:image-url="fromModel1.avatar" :requestApi="uploadImg" width="135px"
                            height="135px" :file-size="3">
                            <template #empty>
                                <el-icon>
                                    <Avatar />
                                </el-icon>
                                <span>请上传头像</span>
                            </template>
                            <template #tip> 头像大小不能超过 3M </template>
                        </fc-upload-img>
                    </el-form-item>
                    <el-form-item label="用户照片" prop="photo">
                        <fc-upload-imgs v-model:file-list="fromModel1.photo" :requestApi="uploadImg" :limit="3"
                            height="140px" width="140px" border-radius="50%">
                            <template #empty>
                                <el-icon>
                                    <Picture />
                                </el-icon>
                                <span>请上传照片</span>
                            </template>
                            <template #tip> 最多上传 3 张照片 </template>
                        </fc-upload-imgs>
                    </el-form-item>
                    <el-form-item label="用户姓名" prop="username">
                        <el-input v-model="fromModel1.username" placeholder="请填写用户姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button> 取消 </el-button>
                        <el-button type="primary" @click="submit"> 确定 </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card">
                <el-alert title="图片上传组件在 form 表单中使用，如果该表单禁用，则上传组件会自动禁用" type="warning" effect="dark"
                    :closable="false" />
                <el-form label-width="100px" label-suffix=" :" disabled :model="fromModel2">
                    <el-form-item label="用户头像" prop="avatar">
                        <fc-upload-img v-model:image-url="fromModel2.avatar" :requestApi="uploadImg" width="135px"
                            height="135px" :file-size="3">
                            <template #empty>
                                <el-icon>
                                    <Avatar />
                                </el-icon>
                                <span>请上传头像</span>
                            </template>
                            <template #tip> 头像大小不能超过 3M </template>
                        </fc-upload-img>
                    </el-form-item>
                    <el-form-item label="用户照片" prop="photo">
                        <fc-upload-imgs v-model:file-list="fromModel2.photo" :requestApi="uploadImg" :limit="3"
                            height="140px" width="140px" border-radius="50%">
                            <template #empty>
                                <el-icon>
                                    <Picture />
                                </el-icon>
                                <span>请上传照片</span>
                            </template>
                            <template #tip> 最多上传 3 张照片 </template>
                        </fc-upload-imgs>
                    </el-form-item>
                    <el-form-item label="用户姓名" prop="username">
                        <el-input v-model="fromModel2.username" placeholder="请填写用户姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button> 取消 </el-button>
                        <el-button type="primary" @click="submit"> 确定 </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-main>
</template>

<script setup lang='ts'>
import { uploadImg } from '@/api/modules/auth';
import { ref, reactive } from 'vue'
import { FormInstance } from "element-plus";

const avatar1 = ref("");
const avatar2 = ref("");
const avatar3 = ref("");
const avatar4 = ref("");
const avatar5 = ref("https://img1.baidu.com/it/u=3859759748,2585219095&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1717520400&t=35e2f8898b6a2610aacf6ec0dc618dcb");
const avatar6 = ref("");
const avatar7 = ref("");

// 监听图片地址改变，比如更换图片/删除图片
const handleImageUrlUpdate = (newValue: string) => {
    console.log(newValue)
}

const fileList1 = ref([
    {
        name: "img1",
        url: "https://img1.baidu.com/it/u=3859759748,2585219095&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1717520400&t=35e2f8898b6a2610aacf6ec0dc618dcb"
    },
    {
        name: "img1",
        url: "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
    }
]);

const rules = reactive({
    avatar: [{ required: true, message: "请上传用户头像" }],
    photo: [{ required: true, message: "请上传用户照片" }],
    username: [{ required: true, message: "请填写用户姓名" }],
});

const fromModel1 = ref({
    avatar: "",
    photo: [{ name: "img", url: "https://img1.baidu.com/it/u=3859759748,2585219095&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1717520400&t=35e2f8898b6a2610aacf6ec0dc618dcb" }],
    username: "",
});
const fromModel2 = ref({
    avatar: "",
    photo: [{ name: "img", url: "https://img1.baidu.com/it/u=3859759748,2585219095&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1717520400&t=35e2f8898b6a2610aacf6ec0dc618dcb" }],
    username: "",
    idCard: "",
    email: ""
});
const ruleFormRef = ref<FormInstance>();
const submit = () => {
    ruleFormRef.value!.validate(valid => {
        console.log("校验规则结果：", valid);
    });
};
</script>

<style scoped>
.upload-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 90%;
    margin: 10px 0;
}

.form-box {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;

    .card {
        background-color: #fff;
        flex: 1;
        padding: 20px;
        border-radius: 10px;

        &:last-child {
            margin-left: 20px;
        }

        .el-form {
            margin-top: 20px;
            width: 100%;
        }
    }
}
</style>