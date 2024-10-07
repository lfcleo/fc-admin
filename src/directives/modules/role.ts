import { Directive, DirectiveBinding } from 'vue';
import { useAuthStore } from "@/store/modules/auth";

/**
 * 角色权限指令
 * @directive 角色权限验证，满足一个则显示（v-role="['xxx','xxx']"）
 */
const role: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
        const roles = useAuthStore().userInfo.roles;
        if (roles.includes('ALL')) {
            return
        }
        const requiredPermissions: string[] = binding.value;
        // 使用Array.prototype.some提高效率，避免不必要的遍历
        const hasPermission = requiredPermissions.some(permission => roles.includes(permission));

        if (!hasPermission) {
            el.parentNode?.removeChild(el);
        }
    },
};

export default role;