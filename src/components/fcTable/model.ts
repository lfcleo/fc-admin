import { ComponentPublicInstance, Ref } from "vue";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { FcTableSelectModel } from "@/components/fcTable/index.vue";
import FcTable from "@/components/fcTable/index.vue";

export namespace TableModel {
    export interface PageableModel {
        page: number;
        pageSize: number;
        total: number;
    }
    export interface StatePropsModel {
        tableData: any[];
        pageable: PageableModel;
        searchParam: {
            [key: string]: any;
        };
        // searchInitParam: {
        //     [key: string]: any;
        // };
        totalParam: {
            [key: string]: any;
        };
        icon?: {
            [key: string]: any;
        };
        loading: boolean;
    }
}
/** 以下是表格列设置类型 */
export type TypeProps = "index" | "selection" | "radio" | "expand" | "sort";

export interface ColumnProps<T = any>
    extends Partial<Omit<TableColumnCtx<T>, "type" | "children" | "renderCell" | "renderHeader">> {
    type?: TypeProps; // 列类型
    tag?: boolean | Ref<boolean>; // 是否是标签展示
    isHide?: boolean | Ref<boolean>; // 是否显示在表格当中
}

export type FcTableInstance = Omit<InstanceType<typeof FcTable>, keyof ComponentPublicInstance | keyof FcTableSelectModel>;