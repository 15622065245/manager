const account = {
    routes: [
        {
            path: "/account/list",
            name: "account",
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
                        name: "账号管理",
                        path: "/account/list",
                    },
                ],
            },
            component: () => import("@/project/views/account/list"),
        },
    ],
}
export default account
