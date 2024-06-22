import { Directive, DirectiveBinding } from 'vue';
import timeTool from '@/utils/time'

// 时间转换计算，刚刚/几分钟前/年月日指令
export const time: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
        const dateTimeString = binding.value;
        if (!dateTimeString) return
        //计算时间格式
        el.textContent = timeTool.getFormateTime(dateTimeString)
    },
};

// 获取年月日时间指令
export const timeYMD: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
        const dateTimeString = binding.value;
        if (!dateTimeString) return
        //计算时间格式
        el.textContent = timeTool.getYMD(dateTimeString)
    },
};

// 获取年月日时分时间指令
export const timeYMDHM: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
        const dateTimeString = binding.value;
        if (!dateTimeString) return
        //计算时间格式
        el.textContent = timeTool.getYMDHM(dateTimeString)
    },
};
