<!--
* @Description: 图表
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-25 11:08:02
* @LastEditTime: 2024-05-25 11:08:02
-->
<template>
    <div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>

<script setup lang="ts" name="ECharts">
import { ref, onMounted, onBeforeUnmount, watch, computed, markRaw, nextTick, onActivated } from "vue";
import { EChartsType, ECElementEvent } from "echarts/core";
import echarts, { ECOption } from "./config";

interface Props {
    option: ECOption;
    renderer?: "canvas" | "svg";
    resize?: boolean;
    theme?: Object | string;
    width?: number | string;
    height?: number | string;
    onClick?: (event: ECElementEvent) => any;
}

const props = withDefaults(defineProps<Props>(), {
    renderer: "canvas",
    resize: true
});

const echartsStyle = computed(() => {
    return props.width || props.height
        ? { height: props.height + "px", width: props.width + "px" }
        : { height: "100%", width: "100%" };
});

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>();
const chartInstance = ref<EChartsType>();

const draw = () => {
    if (chartInstance.value) {
        chartInstance.value.setOption(props.option, { notMerge: true });
    }
};

watch(props, () => {
    draw();
});

const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event);

const init = () => {
    if (!chartRef.value) return;
    chartInstance.value = echarts.getInstanceByDom(chartRef.value);

    if (!chartInstance.value) {
        chartInstance.value = markRaw(
            echarts.init(chartRef.value, props.theme, {
                renderer: props.renderer
            })
        );
        chartInstance.value.on("click", handleClick);
        draw();
    }
};

const resize = () => {
    if (chartInstance.value && props.resize) {
        chartInstance.value.resize({ animation: { duration: 300 } });
    }
};

onMounted(() => {
    nextTick(() => init());
});

onActivated(() => {
    if (chartInstance.value) {
        chartInstance.value.resize();
    }
});

onBeforeUnmount(() => {
    chartInstance.value?.dispose();
});

defineExpose({
    getInstance: () => chartInstance.value,
    resize,
    draw
});
</script>
