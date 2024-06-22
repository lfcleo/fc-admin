<template>
    <el-main>
        <el-alert title="使用的是wangEditor，做了一层封装，更多工具栏和编辑器配置：https://www.wangeditor.com/v5/toolbar-config.html"
            type="success" style="margin-bottom:20px;"></el-alert>
        <el-card shadow="never">
            <el-button type="primary" @click="dialogVisible = true"> 源内容 </el-button>
            <el-row :gutter="20">
                <el-col :lg="12">
                    <fc-wang-editor v-model:value="content" :imgApi="uploadImg" :videoApi="uploadVideo" height="600px"
                        mode="simple"></fc-wang-editor>
                </el-col>
                <el-col :lg="12">
                    <el-scrollbar class="preview" max-height="640px">
                        <p v-html="content"></p>
                    </el-scrollbar>

                </el-col>
            </el-row>
        </el-card>
        <el-dialog v-model="dialogVisible" title="源内容" width="1300px" top="50px">
            <div>{{ content }}</div>
        </el-dialog>
    </el-main>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { uploadImg, uploadVideo } from "@/api/modules/auth";

const dialogVisible = ref(false);
const content = ref("");
</script>

<style scoped>
.el-button {
    margin-bottom: 20px;
}

.preview {
    padding: 20px;
    border: 1px solid #c3c3c3;
}

:deep(.el-dialog__body) {
    height: 700px !important;
    overflow: auto;
}
</style>