<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="6">
                <el-card shadow="never" header="常用">
                    <fc-qr-code content="test测试"></fc-qr-code>
                </el-card>
            </el-col>
            <el-col :lg="6">
                <el-card shadow="never" header="带Logo（Logo大小可设置）">
                    <fc-qr-code content="FC-Admin" logo="/img/logo.png" :iconSize="30"></fc-qr-code>
                </el-card>
            </el-col>

            <el-col :lg="6">
                <el-card shadow="never" header="自定义颜色/大小">
                    <fc-qr-code content="FC-Admin" :size="160"
                        :options="{ color: { light: '#FFBF60FF' } }"></fc-qr-code>
                </el-card>
            </el-col>
            <el-col :lg="6">
                <el-card shadow="never" header="下载二维码图片">
                    <fc-qr-code ref="qrRef" content="FC-Admin"></fc-qr-code>
                    <el-button type="primary" @click="downLoadQRCode">下载二维码</el-button>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FcQrCode from '@/components/fcQrCode/index.vue'

const qrRef = ref<InstanceType<typeof FcQrCode> | null>(null)

const downLoadQRCode = () => {
    if (!qrRef.value) return
    qrRef.value.downLoadQRCode()
}

</script>