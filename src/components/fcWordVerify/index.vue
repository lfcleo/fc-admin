<!--
* @Description: 点击文字验证
* @Version: 1.0.0
* @Author: Leo https://github.com/leo-lfc
* @Date: 2024-07-11 13:53:12
* @LastEditTime: 2024-07-11 13:53:12
-->

<template>
    <div>
        <div class="top" :style="{ width: parentWidth + 'px' }">
            <p>请按照 <span>‘{{ textRank }}’</span> 的顺序点击</p>
            <el-button type="primary" link @click="refreshClick">看不清,换一组</el-button>
        </div>
        <div class='perustarkistus'>
            <img :src="imageSrc" :style="{ width: parentWidth + 'px', height: parentHeight + 'px' }" alt="">
            <div v-for="(item, indexS) in getTextPositionData" :key="indexS" :style="{
                left: item.x + 'px',
                top: item.y + 'px',
                width: textWidth + 'px',
                height: textWidth + 'px',
                transform: `rotate(${item.transform}deg)`,
                fontSize: 25 + 'px',
                lineHeight: `${textWidth}px`,
                color: randomColor(50, 160),
            }" class="positionDiv" @click="textClickFun(item.text)">
                <span class="wordSpan">{{ item.text }}</span>
                <span class="clickSpan" v-if="item.rank !== null">{{ item.rank +
                    1 }}</span>
            </div>
            <div class="wrodVerify-result" v-if="isVerifySuccess"
                :style="{ width: parentWidth + 'px', height: parentHeight + 'px' }">
                <el-result icon="success" title="验证成功"></el-result>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'

interface textPositionType {
    x: number;
    y: number;
    width: number;
    height: number;
    transform: number;
    text: string;
}
interface wordVerifyModel {
    clickTextNum?: number;   // 需要点击的个数，必须比生成文字的个数小
    textNum?: number;        // 生成文字的个数，必须比需要点击的个数大
    textWidth?: number;      // 文字的宽度
    parentWidth?: number;    // 组件宽度
    parentHeight?: number;   // 组件高度
    angleRange?: number;     // 旋转角度范围 例如值为90 就是-90~90
}
const props = withDefaults(defineProps<wordVerifyModel>(), {
    clickTextNum: 4,
    textNum: 6,
    textWidth: 35,
    parentWidth: 320,
    parentHeight: 160,
    angleRange: 90,
});
// 用来随机选择文字
const textString = '凭趟押王玉抹凶超护报抢趁凳抬出击披越趋跳叉又边友及反双达悟辽发辣悄叔取受变辪辫叙磁槽蛛蛙蛇韵音蛋槐蛾磨蛮砌砍码霸露研砖婶云御泰京亭亮泉亩泊享交泄亦产得徐亡菠徒亿穗武委姐姑箱钓姓钞姜薯钟薪管箭箩钉始针薄沉莫忙仪们代沃令以志沙任忍份忌沟仿莲仰心刑灰灯灭刊火分切慕刃刀蹲炒躁炕勺勾勿勤炉炊炎勒龙炸点身躬炼龟躲勇龄勉躺炮炭励劲劳商眠易眯星眨啊昆昂昌眼昏明啦省显昼看眉春'
// 背景图片列表
const bgPictures = [
    '/img/verify/1-320x160.jpg',
    '/img/verify/2-320x160.jpg',
    '/img/verify/3-320x160.jpg',
    '/img/verify/4-320x160.jpg',
    '/img/verify/5-320x160.jpg',
]

const textRank = ref('')            // 文本顺序
const clickTextRank = ref('')       // 点击文本的顺序
const textPosition = reactive({
    textPositionData: [] as textPositionType[]
})                                  // 文本生成的位置
const imageSrc = ref('')            // 背景图片url地址
const isVerifySuccess = ref(false)    // 验证成功

// emit
const emit = defineEmits<{
    resultCallback: [value: boolean];
}>();

onBeforeMount(() => {
    imageSrc.value = bgPictures[Math.floor(Math.random() * bgPictures.length)]
    changeSelectImage()
})

watch(clickTextRank, () => {
    if (clickTextRank.value.length === props.clickTextNum) {
        if (clickTextRank.value === textRank.value) {
            isVerifySuccess.value = true
            emit("resultCallback", true);
        } else {
            emit("resultCallback", false);
            refreshClick()
        }
    }
})

//随机数生成  第一个参数所需字符串长度   第二个参数需要生成的数量 
const getRandomUniqueIndexes = (max: number, count: number) => {
    const indexes: number[] = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}

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

// 文字点击事件
const textClickFun = (text: string) => {
    if (clickTextRank.value.includes(text)) {
        clickTextRank.value = clickTextRank.value.replace(text, '')
    } else {
        clickTextRank.value += text
    }
}

// 检测两个矩形是否重叠的函数
const isOverlapping = (rect1: textPositionType, rect2: textPositionType) => {
    return !(
        rect1.x + rect1.width <= rect2.x ||
        rect2.x + rect2.width <= rect1.x ||
        rect1.y + rect1.height <= rect2.y ||
        rect2.y + rect2.height <= rect1.y
    );
}
// 生成随机位置的函数
const generateRandomPosition = (existingPositions: textPositionType[], parentWidth: number, parentHeight: number, elementWidth: number, elementHeight: number) => {
    let position;
    let overlap;

    do {
        overlap = false;
        position = {
            x: Math.floor(Math.random() * (parentWidth - elementWidth)),
            y: Math.floor(Math.random() * (parentHeight - elementHeight)),
            width: elementWidth,
            height: elementHeight,
            transform: Math.floor(Math.random() * (props.angleRange + props.angleRange + 1)) - props.angleRange,
            text: ''
        };

        // 检查新位置是否与现有位置重叠
        for (const existing of existingPositions) {
            if (isOverlapping(position, existing)) {
                overlap = true;
                break;
            }
        }
    } while (overlap);

    return position;
}
const changeSelectImage = () => {
    const newPositions: textPositionType[] = [];  // 用来生成文字定位信息
    // （所需字符串的长度）    textNum：生成点击文字的个数
    let textOptionArr = getRandomUniqueIndexes(textString.length, props.textNum)
    let textSelectString = ''  // 文本顺序
    for (let i = 0; i < props.textNum; i++) {
        // 位置信息     图片宽度    图片高度    文本宽度
        const newPosition = generateRandomPosition(newPositions, props.parentWidth, props.parentHeight, props.textWidth, props.textWidth);
        newPositions.push({ ...newPosition, text: textString[textOptionArr[i]] });
        textSelectString += textString[textOptionArr[i]]
    }
    textRank.value = textSelectString.slice(0, props.clickTextNum)
    // console.log('newPositions', newPositions)
    textPosition.textPositionData = newPositions
}

const getTextPositionData = computed(() => {
    const data: any = []
    textPosition.textPositionData.forEach(item => {
        const rankIndex = clickTextRank.value.indexOf(item.text);
        data.push({
            ...item,
            rank: rankIndex !== -1 ? rankIndex : null
        });
    });
    return data
})

const refreshClick = () => {
    isVerifySuccess.value = false
    clickTextRank.value = ''
    imageSrc.value = bgPictures[Math.floor(Math.random() * bgPictures.length)]
    changeSelectImage()
}

</script>

<style lang="scss" scoped>
.top {
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    span {
        font-weight: 700;
    }
}

.perustarkistus {
    margin-top: 5px;
    position: relative;

    div.positionDiv {
        position: absolute;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        z-index: 1;

        .wordSpan {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
            text-shadow: 2px 2px 4px #fff;
            // background-color: rgba(255, 255, 255, .7);
        }

        .clickSpan {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
            color: var(--el-color-white);
            background-color: var(--el-color-primary);
            border-radius: 35px;
        }
    }

    .wrodVerify-result {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        z-index: 2;
        background: var(--el-mask-color);
    }
}
</style>
