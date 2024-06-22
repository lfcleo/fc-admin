/**
 * 防抖指令
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__: () => any;
}
const debounce: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback 需是 function";
        }
        let timer: ReturnType<typeof setTimeout> | null = null;
        el.__handleClick__ = function () {
            if (timer) {
                clearInterval(timer);
            }
            timer = setTimeout(() => {
                binding.value();
            }, 500);
        };
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener("click", el.__handleClick__);
    }
};

export default debounce;