<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="8">
                <el-card shadow="never">
                    <fc-echarts :height="300" :option="option1"></fc-echarts>
                </el-card>
            </el-col>
            <el-col :lg="8">
                <el-card shadow="never">
                    <fc-echarts :height="300" :option="option2"></fc-echarts>
                </el-card>
            </el-col>
            <el-col :lg="8">
                <el-card shadow="never">
                    <fc-echarts :height="300" :option="option3"></fc-echarts>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card shadow="never">
                    <fc-echarts :height="600" :option="option4"></fc-echarts>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card shadow="never">
                    <fc-echarts :height="600" :option="option5"></fc-echarts>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script setup lang="ts">
import { ECOption } from '@/components/fcEcharts/config';

const option1: ECOption = {
    title: {
        text: "柱状图",
        textStyle: {
            color: "#a1a1a1"
        }
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        }
    },
    legend: {
        textStyle: {
            color: "#a1a1a1"
        }
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
    },
    xAxis: [
        {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisLabel: {
                color: "#a1a1a1"
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                color: "#a1a1a1"
            }
        }
    ],
    series: [
        {
            name: "Direct",
            type: "bar",
            emphasis: {
                focus: "series"
            },
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: "Email",
            type: "bar",
            stack: "Ad",
            emphasis: {
                focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: "Union Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
                focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: "Video Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
                focus: "series"
            },
            data: [150, 232, 201, 154, 190, 330, 410]
        }
    ]
};

const option2: ECOption = {
    title: {
        text: "折线图",
        textStyle: {
            color: "#a1a1a1"
        }
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#6a7985"
            }
        }
    },
    legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct"],
        textStyle: {
            color: "#a1a1a1"
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
    },
    xAxis: [
        {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisLabel: {
                color: "#a1a1a1"
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                color: "#a1a1a1"
            }
        }
    ],
    series: [
        {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [320, 332, 301, 334, 390, 330, 320]
        }
    ]
};

const option3: ECOption = {
    title: {
        text: "雷达图",
        textStyle: {
            color: "#a1a1a1"
        }
    },
    legend: {
        data: ["Allocated Budget", "Actual Spending"],
        textStyle: {
            color: "#a1a1a1"
        }
    },
    radar: {
        shape: 'circle',
        indicator: [
            { name: "Sales", },
            { name: "Administration", },
            { name: "Information Technology", },
            { name: "Customer Support", },
            { name: "Development", },
            { name: "Marketing", }
        ]
    },
    series: [
        {
            name: "Budget vs spending",
            type: "radar",
            data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: "Allocated Budget"
                },
                {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: "Actual Spending"
                }
            ]
        }
    ]
};

const option4: ECOption = {
    title: {
        text: "饼图",
        textStyle: {
            color: "#a1a1a1"
        }
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        left: "center",
        top: "bottom",
        data: ["rose 1", "rose 2", "rose 3", "rose 4"],
        textStyle: {
            color: "#a1a1a1"
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
            name: "Radius Mode",
            type: "pie",
            radius: [60, 280],
            center: ["50%", "50%"],
            roseType: "radius",
            itemStyle: {
                borderRadius: 5
            },
            label: {
                show: true
            },
            emphasis: {
                label: {
                    show: true
                }
            },
            data: [
                { value: 10, name: "rose 1" },
                { value: 8, name: "rose 2" },
                { value: 8, name: "rose 3" },
                { value: 8, name: "rose 4" },
            ]
        }
    ]
};

const option5: ECOption = {
    title: {
        text: "嵌套环形图",
        textStyle: {
            color: "#a1a1a1"
        }
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        data: ["Direct", "Email", "Baidu", "Google"],
        textStyle: {
            color: "#a1a1a1"
        }
    },
    series: [
        {
            name: "Access From",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
                position: "inner",
                fontSize: 14
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1548, name: "Search Engine" },
                { value: 775, name: "Direct" },
                { value: 679, name: "Marketing", selected: true }
            ]
        },
        {
            name: "Access From",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
                length: 30
            },
            label: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#F6F8FC",
                borderColor: "#8C8D8E",
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                    a: {
                        color: "#6E7079",
                        lineHeight: 22,
                        align: "center"
                    },
                    hr: {
                        borderColor: "#8C8D8E",
                        width: "100%",
                        borderWidth: 1,
                        height: 0
                    },
                    b: {
                        color: "#4C5058",
                        fontSize: 14,
                        fontWeight: "bold",
                        lineHeight: 33
                    },
                    per: {
                        color: "#fff",
                        backgroundColor: "#4C5058",
                        padding: [3, 4],
                        borderRadius: 4
                    }
                }
            },
            data: [
                { value: 1048, name: "Baidu" },
                { value: 335, name: "Direct" },
                { value: 310, name: "Email" },
                { value: 251, name: "Google" },
            ]
        }
    ]
};

</script>