// 用户登录请求参数模型
export interface AuthRequestModel {
    username: string;
    password: string;
}

//Auth返回数据模型，返回token和用户信息
export interface AuthModel {
    token: string;
    userInfo: UserInfoModel;
}

/**
 * 用户模型
 */
export interface UserInfoModel {
    userId: string;
    userName: string;
    dashboard: string;
    roles: string[];
};

/**
 * 动态路由和权限模型
 */
export interface MenuPermissionsModel {
    menu: Menu.MenuOptions[];
    permissions: string[];
}

/**
 * 任务模型
 */
export interface TaskModel {
    id: string;
    taskName: string;
    type: string;
    result: string;
    state: string;
    stateName: string;
    createDate: string;
}

/**
 * 消息模型
 */
export interface MsgModel {
    id: number;
    type: string;
    avatar: string;
    title: string;
    describe: string;
    link: string;
    time: string;
}