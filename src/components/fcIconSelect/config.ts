//图标选择器配置
import * as ElIcon from '@element-plus/icons-vue'
import * as FcIcons from '@/assets/icons/index.ts'

export const tabs = [
    '默认',
    '扩展'
]

export const dataList = [
    Object.keys(ElIcon),
    Object.keys(FcIcons).map(str => 'FcIcon' + str)
]

