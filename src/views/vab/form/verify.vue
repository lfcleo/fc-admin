<template>
    <el-main>
        <el-card shadow="never" header="字符验证码(静态)">
            <div class="form-box">
                <div class="card1">
                    <h3>静止</h3>
                    <el-form class="el-form" label-width="100px" label-suffix=" :" :model="fromModel1">
                        <el-form-item label="验证码" prop="codeValue">
                            <el-input placeholder="请输入下方验证码" v-model="fromModel1.codeValue" clearable></el-input>
                            <fc-char-verify ref="fcCharVerify1" style="margin-top: 5px;"></fc-char-verify>
                            <el-button type="primary" link
                                @click="refreshClick1">点击图片可刷新按钮，当然也可以像这样自定义个按钮点击刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="verify1"> 验证 </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="card1">
                    <h3>动画（防OCR识别，对视觉障碍人员不友好，慎用。）</h3>
                    <el-form class="el-form" label-width="100px" label-suffix=" :" :model="fromModel2">
                        <el-form-item label="验证码" prop="codeValue">
                            <el-input placeholder="请输入下方验证码" v-model="fromModel2.codeValue" clearable></el-input>
                            <fc-char-verify ref="fcCharVerify2" style="margin-top: 5px;"
                                :is-animation="true"></fc-char-verify>
                            <el-button type="primary" link
                                @click="refreshClick2">点击图片可刷新按钮，当然也可以像这样自定义个按钮点击刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="verify2"> 验证 </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <el-card shadow="never" header="字符验证码(动态获取)" style="margin-top: 20px;">
            <div class="form-box">
                <div class="card1">
                    <h3>获取字符串类型</h3>
                    <el-form label-width="100px" label-suffix=" :" :model="fromModel3">
                        <el-form-item label="验证码" prop="codeValue">
                            <el-input placeholder="请输入下方验证码" v-model="fromModel3.codeValue" clearable></el-input>
                            <fc-char-verify ref="fcCharVerify3" :requestApi="charVerifyApi"
                                style="margin-top: 5px;"></fc-char-verify>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="verify3"> 验证 </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="card1">
                    <h3>获取Data URL Base64类型</h3>
                    <el-form label-width="100px" label-suffix=" :" :model="fromModel4">
                        <el-form-item label="验证码" prop="codeValue">
                            <el-input placeholder="请输入下方验证码" v-model="fromModel4.codeValue" clearable></el-input>
                            <fc-char-verify ref="fcCharVerify4" :requestApi="charVerifyImgApi"
                                style="margin-top: 5px;"></fc-char-verify>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="verify4"> 验证 </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <el-card shadow="never" header="文字验证码" style="margin-top: 20px;">
            <fc-word-verify @resultCallback="verifyCallback"></fc-word-verify>
        </el-card>

    </el-main>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from "element-plus";
import { charVerifyApi, charVerifyImgApi } from '@/api/modules/auth';
import FcCharVerify from '@/components/fcCharVerify/index.vue'


const fromModel1 = reactive({
    codeValue: ""
});

const fromModel2 = reactive({
    codeValue: ""
});

const fromModel3 = reactive({
    codeValue: ""
});

const fromModel4 = reactive({
    codeValue: ""
});

// fcCharVerify 实例
const fcCharVerify1 = ref<InstanceType<typeof FcCharVerify>>();
const fcCharVerify2 = ref<InstanceType<typeof FcCharVerify>>();
const fcCharVerify3 = ref<InstanceType<typeof FcCharVerify>>();
const fcCharVerify4 = ref<InstanceType<typeof FcCharVerify>>();

//验证
const verify1 = () => {
    if (fcCharVerify1.value?.code == fromModel1.codeValue) {
        ElMessage({
            type: "success",
            message: "验证成功"
        });
    } else {
        ElMessage({
            type: "error",
            message: "验证失败"
        });
    }
}
const verify2 = () => {
    if (fcCharVerify2.value?.code == fromModel2.codeValue) {
        ElMessage({
            type: "success",
            message: "验证成功"
        });
    } else {
        ElMessage({
            type: "error",
            message: "验证失败"
        });
    }
}
const verify3 = () => {
    if (fcCharVerify3.value?.code == fromModel3.codeValue) {
        ElMessageBox.confirm('动态获取验证一般是请求服务器做验证，这里字符类型本地判断了.', '验证成功', {
            type: 'success'
        })
    } else {
        ElMessageBox.confirm('动态获取验证一般是请求服务器做验证，这里字符类型本地判断了.', '验证失败', {
            type: 'error'
        })
    }
}
const verify4 = () => {
    ElMessageBox.confirm('动态获取验证一般是请求服务器做验证，这里模拟', '验证成功', {
        type: 'success'
    })
}
// 刷新
const refreshClick1 = () => {
    fcCharVerify1.value?.refresh()
}
const refreshClick2 = () => {
    fcCharVerify2.value?.refresh()
}

const verifyCallback = (result: boolean) => {
    if (result) {
        ElMessage({
            type: "success",
            message: "验证成功"
        });
    } else {
        ElMessage({
            type: "error",
            message: "验证失败"
        });
    }
}
</script>

<style scoped>
.form-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;

    .card1 {
        flex: 1;

        &:last-child {
            margin-left: 20px;
        }
    }

    .el-form {
        margin-top: 10px;
    }
}
</style>