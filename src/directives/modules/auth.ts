import { Directive, DirectiveBinding } from 'vue';
import { useMenuStore } from "@/store/modules/menu";

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="'xxx'"）
 */
export const auth: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
        const permissions = useMenuStore().permissions;
        if (permissions.includes('ALL')) {
            return
        }

        if (!permissions.some((permission) => permission === binding.value)) {
            el.parentNode?.removeChild(el);
        }
    },
};

/**
 * 用户权限指令
 * @directive 多个权限验证，满足一个则显示（v-auths="['xxx','xxx']"）
 */
export const auths: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
        const permissions = useMenuStore().permissions;
        if (permissions.includes('ALL')) {
            return
        }

        const requiredPermissions: string[] = binding.value;

        // 使用Array.prototype.some提高效率，避免不必要的遍历
        const hasPermission = requiredPermissions.some(permission => permissions.includes(permission));

        if (!hasPermission) {
            el.parentNode?.removeChild(el);
        }
    },
};

/**
 * 用户权限指令
 * @directive 多个权限验证，全部满足则显示（v-auths-all="['xxx','xxx']"）
 */
export const authsAll: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
        const permissions = useMenuStore().permissions;
        if (permissions.includes('ALL')) {
            return
        }

        const requiredPermissions: string[] = binding.value;

        if (!requiredPermissions.every(element => permissions.includes(element))) {
            el.parentNode?.removeChild(el);
        }
    },
};