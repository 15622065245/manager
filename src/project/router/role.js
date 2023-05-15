const role = {
    routes: [
        {
            path: "/role/list",
            name: "role",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "系统管理",
                        path: "",
                    },
                    {
                        name: "角色权限",
                        path: "/role/list",
                    },
                ],
            },
            component: () => import("@/project/views/role/list"),
        },
        {
            path: "/role/show/:id",
            name: "roleShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "系统管理",
                        path: "",
                    },
                    {
                        name: "角色权限",
                        path: "/role/list",
                    },
                    {
                        name: "权限设置",
                        path: "/role/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/role/show"),
        },
    ],
}
export default role
