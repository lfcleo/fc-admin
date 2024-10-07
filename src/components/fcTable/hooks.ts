import { reactive, computed, toRefs, ref } from "vue";
import { TableModel } from "./model";

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * */
export const useTable = (
    api?: (params: any) => Promise<any>,
    initParam: object = {},
    isPageable: boolean = true,
    dataCallBack?: (data: any) => any,
    requestError?: (error: any) => void
) => {

    const state = reactive<TableModel.StatePropsModel>({
        // 表格数据
        tableData: [],
        // 分页数据
        pageable: {
            // 当前页数
            page: 1,
            // 每页显示条数
            pageSize: 20,
            // 总条数
            total: 0
        },
        // 查询参数(只包括查询)
        searchParam: {},
        // // 初始化默认的查询参数
        // searchInitParam: {},
        // 总参数(包含分页和查询参数)
        totalParam: {},
        //是否加载完毕
        loading: false
    });

    /**
     * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
     * */
    const pageParam = computed({
        get: () => {
            return {
                page: state.pageable.page,
                pageSize: state.pageable.pageSize
            };
        },
        set: (_newVal: any) => {
        }
    });

    /**
     * @description 获取表格数据
     * @return void
     * */
    const getTableList = async () => {
        if (!api) return;
        try {
            state.loading = true
            // 先把初始化参数和分页参数放到总参数里面
            Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {});
            let { data } = await api({ ...state.totalParam });
            dataCallBack && (data = dataCallBack(data));
            state.tableData = isPageable ? data.list : data;
            // 解构后台返回的分页数据 (如果有分页更新分页信息)
            if (isPageable) {
                const { page, pageSize, total } = data;
                updatePageable({ page, pageSize, total });
            }
            state.loading = false
        } catch (error) {
            requestError && requestError(error);
            state.loading = false
        }
    };

    /**
     * @description 更新查询参数
     * @return void
     * */
    const updatedTotalParam = () => {
        state.totalParam = {};
        // 处理查询参数，可以给查询参数加自定义前缀操作
        let nowSearchParam: TableModel.StatePropsModel["searchParam"] = {};
        // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
        for (let key in state.searchParam) {
            // 某些情况下参数为 false/0 也应该携带参数
            if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
                nowSearchParam[key] = state.searchParam[key];
            }
        }
        Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
    };

    /**
     * @description 更新分页信息
     * @param {Object} pageable 后台返回的分页数据
     * @return void
     * */
    const updatePageable = (pageable: TableModel.PageableModel) => {
        Object.assign(state.pageable, pageable);
    };

    /**
     * @description 表格数据查询
     * @return void
     * */
    const search = () => {
        state.pageable.page = 1;
        updatedTotalParam();
        getTableList();
    };

    /**
     * @description 表格数据重置
     * @return void
     * */
    const reset = () => {
        state.pageable.page = 1;
        // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
        // state.searchParam = { ...state.searchInitParam };
        state.searchParam = {}
        updatedTotalParam();
        getTableList();
    };

    /**
     * @description 每页条数改变
     * @param {Number} val 当前条数
     * @return void
     * */
    const handleSizeChange = (val: number) => {
        state.pageable.page = 1;
        state.pageable.pageSize = val;
        getTableList();
    };

    /**
     * @description 当前页改变
     * @param {Number} val 当前页
     * @return void
     * */
    const handleCurrentChange = (val: number) => {
        state.pageable.page = val;
        getTableList();
    };

    return {
        ...toRefs(state),
        getTableList,
        search,
        reset,
        handleSizeChange,
        handleCurrentChange,
        updatedTotalParam
    };
}

/**
 * @description 表格多选数据操作
 * @param {String} rowKey 当表格可以多选时，所指定的 id
 * */
export const useSelection = (rowKey: string = "id") => {
    const isSelected = ref<boolean>(false);
    const selectedList = ref<{ [key: string]: any }[]>([]);

    // 当前选中的所有 keys 数组
    const selectedListKeys = computed((): string[] => {
        let keys: string[] = [];
        selectedList.value.forEach(item => keys.push(item[rowKey]));
        return keys;
    });

    /**
     * @description 多选操作
     * @param {Array} rowArr 当前选择的所有数据
     * @return void
     */
    const selectionChange = (rowArr: { [key: string]: any }[]) => {
        rowArr.length ? (isSelected.value = true) : (isSelected.value = false);
        selectedList.value = rowArr;
    };

    return {
        isSelected,
        selectedList,
        selectedListKeys,
        selectionChange
    };
};