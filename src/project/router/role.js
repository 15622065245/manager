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
    ],
}
export default role
