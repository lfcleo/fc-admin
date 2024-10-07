<!--
* @Description: 字符验证
* @Version: 1.0.0
* @Author: Leo https://github.com/leo-lfc
* @Date: 2024-07-10 10:31:52
* @LastEditTime: 2024-07-10 10:31:52
-->
<template>
    <div class="canvas-box" :style="{ height: contentHeight + 'px' }" v-loading="loading" @click="refresh">
        <canvas :id="canvasId" class="id-canvas" :width="contentWidth" :height="contentHeight"></canvas>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, watch, ref, onUnmounted } from "vue";
import { generateUUID } from "@/utils/uuid";

interface CharVerifyModel {
    requestApi?: (params: any) => Promise<any>; // 请求验证码数据的 api ==> 和requestApi选择一个
    codeLength?: number;                // 验证码字符串长度
    fontSizeMin?: number;               // 字体最小值
    fontSizeMax?: number;               // 字体最大值
    backgroundColorMin?: number;        // 验证码图片背景色最小值
    backgroundColorMax?: number;        // 验证码图片背景色最小值
    dotColorMin?: number;               // 背景干扰点最小值
    dotColorMax?: number;               // 背景干扰点最小值
    contentWidth?: number;              // 容器宽度
    contentHeight?: number;             // 容器高度
    isAnimation?: boolean;              // 是否有动画效果，防止OCR识别，但对有视觉障碍的人员来说不友好
}
const props = withDefaults(defineProps<CharVerifyModel>(), {
    codeLength: 4,
    fontSizeMin: 25,
    fontSizeMax: 35,
    backgroundColorMin: 200,
    backgroundColorMax: 220,
    dotColorMin: 60,
    dotColorMax: 120,
    contentWidth: 100,
    contentHeight: 40,
    isAnimation: false
});

const canvasId = ref("charVerify" + generateUUID());    //防止页面有多个字符串验证码，导致canvasId一致的问题
const codeChars = ref("23456789abcdefjhjkmnpqrstuvwxyz");
const loading = ref(false)
const code = ref("")

onMounted(() => {
    if (props.requestApi) {
        getCodeData()
        return
    }
    makeCode();
    startAnimation()
});

onUnmounted(() => {
    stopAnimation()
})

watch(
    () => code.value,
    () => {
        startAnimation()
    }
);

const animationFrameId = ref<number | null>(null);
const isAnimating = ref(false);

const startAnimation = () => {
    if (!isAnimating.value && props.isAnimation) {
        animationFrameId.value = requestAnimationFrame(drawPic);
        isAnimating.value = true;
    } else {
        animationFrameId.value = requestAnimationFrame(drawPic);
    }
};

const stopAnimation = () => {
    if (isAnimating.value) {
        cancelAnimationFrame(animationFrameId.value!);
        isAnimating.value = false;
    }
};

//随机生成字符串
const makeCode = () => {
    for (let i = 0; i < props.codeLength; i++) {
        code.value += codeChars.value[randomNum(0, codeChars.value.length)];
    }
};

//判断是否为Data URL Base64编码的图像
const isDataImageBase64 = (str: string): boolean => {
    // png, jpg, jpeg, gif, svg
    const regex = /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,/;
    return regex.test(str);
}

// 网络请求获取code
const getCodeData = async () => {
    try {
        loading.value = true
        const api = props.requestApi!;
        const data = await api({});
        if (isDataImageBase64(data.data)) {
            drawImg(data.data)
        } else {
            code.value = data.data;
            drawPic();
        }
        loading.value = false
    } catch (error) {
        loading.value = false
    }
};

// 生成一个随机数
const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

// 生成一个随机的颜色
const randomColor = (min: number, max: number) => {
    let r = randomNum(min, max);
    let g = randomNum(min, max);
    let b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
};

const drawPic = () => {
    let canvas = document.getElementById(canvasId.value) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.textBaseline = "bottom";
    // 清除画布
    ctx.clearRect(0, 0, props.contentWidth, props.contentHeight);
    // 绘制背景
    ctx.fillStyle = "#e6ecfd";
    ctx.fillRect(0, 0, props.contentWidth, props.contentHeight);
    // 绘制文字
    for (let i = 0; i < code.value.length; i++) {
        drawText(ctx, code.value[i], i);
    }
    drawLine(ctx);
    drawDot(ctx);
    if (isAnimating.value && props.isAnimation) {
        animationFrameId.value = requestAnimationFrame(drawPic);
    }
};

const drawText = (ctx: CanvasRenderingContext2D, txt: string, i: number) => {
    ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
    ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei"; // 随机生成字体大小
    // let x = (i + 1) * (props.contentWidth / (code.value.length + 1));
    // let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
    // const deg = randomNum(-30, 30);
    let x = (i + 1) * (props.contentWidth / (code.value.length + 1)) + Math.sin(1);
    let y = randomNum(props.fontSizeMax, props.contentHeight - 5) + Math.cos(1);
    const deg = randomNum(-30, 30) + Math.sin(1);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
};

const drawLine = (ctx: any) => {
    // 绘制干扰线
    for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = randomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
        ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
        ctx.stroke();
    }
};

const drawDot = (ctx: any) => {
    // 绘制干扰点
    for (let i = 0; i < 30; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight), 1, 0, 2 * Math.PI);
        ctx.fill();
    }
};

//绘制 Data URL Base64编码的图像
const drawImg = (imageSrc: string) => {
    let canvas = document.getElementById(canvasId.value) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.textBaseline = "bottom";

    // 创建一个新的Image对象  
    const img = new Image();
    img.onload = () => {

        // 清除画布
        ctx.clearRect(0, 0, props.contentWidth, props.contentHeight);
        // 绘制背景
        ctx.fillRect(0, 0, props.contentWidth, props.contentHeight);

        // 将图像绘制到Canvas上  
        ctx.drawImage(img, 0, 0);
    };
    img.src = imageSrc; // 设置图像源  
}

const refresh = () => {
    code.value = ""
    if (props.requestApi) {
        getCodeData()
        return
    }
    makeCode()
}

// 暴露给父组件使用
defineExpose({ code, refresh });

</script>

<style scoped></style>