<!--
* @Description: 二维码
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-25 11:08:02
* @LastEditTime: 2024-05-25 11:08:02
-->
<template>
    <div :style="QRCodeStyle">
        <canvas :style="QRCodeStyle" :id="canvasId"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import QRCode, { type QRCodeRenderersOptions } from "qrcode";
import { generateUUID } from "@/utils/uuid";

interface QRCodeProps {
    size?: number; // 二维码大小 ==> 默认200
    iconSize?: number; // 二维码图标大小 ==> 默认40
    content: string; // 二维码内容 ==> 必填
    logo?: string; // 二维码logo ==> 默认无
    options?: QRCodeRenderersOptions; // 二维码配置 ==> 默认无
    errorLevel?: "L" | "M" | "Q" | "H"; // 二维码容错级别 ==> 默认H
}

// 接收父组件参数并设置默认值
const props = withDefaults(defineProps<QRCodeProps>(), {
    size: 200,
    iconSize: 40,
    errorLevel: "H"
});

const qrCodeUrl = ref<string>("");
const canvasId = ref("canvas" + generateUUID());    //防止页面有多个二维码，导致canvasId一致的问题

const QRCodeStyle = computed(() => {
    return {
        width: props.size + "px",
        height: props.size + "px"
    };
});

// 生成二维码
const initQRCode = async () => {
    const canvasRef: any = await QRCode.toCanvas(document.getElementById(canvasId.value), props.content, {
        width: props.size,
        margin: 2,
        errorCorrectionLevel: props.errorLevel,
        ...props.options
    });
    if (props.logo) {
        const ctx = canvasRef.getContext("2d");
        const iconBgW = props.iconSize + 5;
        const iconBgH = props.iconSize + 5;
        const iconBgX = (canvasRef.width - iconBgW) / 2;
        const iconBgY = (canvasRef.width - iconBgH) / 2;
        ctx.fillStyle = "#fff";
        ctx.fillRect(iconBgX, iconBgY, iconBgW, iconBgH);
        // logo
        const iconX = (canvasRef.width - props.iconSize) / 2;
        const iconY = (canvasRef.width - props.iconSize) / 2;
        const image = new Image();
        image.crossOrigin = "Anonymous"; // 设置图片的跨域属性
        image.onload = () => {
            ctx.drawImage(image, iconX, iconY, props.iconSize, props.iconSize);
            qrCodeUrl.value = canvasRef.toDataURL();
        };
        image.src = props.logo;
    } else {
        qrCodeUrl.value = canvasRef.toDataURL();
    }
};

// 下载二维码
const downLoadQRCode = (fileName: string = generateUUID(), fileType: string = ".png") => {
    const exportFile = document.createElement("a");
    exportFile.style.display = "none";
    exportFile.download = `${fileName}${fileType}`;
    exportFile.href = qrCodeUrl.value;
    document.body.appendChild(exportFile);
    exportFile.click();
    // 去除下载对 url 的影响
    document.body.removeChild(exportFile);
};

onMounted(() => {
    initQRCode();
});

defineExpose({
    downLoadQRCode
});
</script>