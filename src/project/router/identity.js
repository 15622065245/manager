const identity = {
    routes: [
        {
            path: "/identity/list",
            name: "identity",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "用户管理",
                        path: "",
                    },
                    {
                        name: "身份认证",
                        path: "/identity/list",
                    },
                ],
            },
            component: () => import("@/project/views/identity/list"),
        },{
            path: "/identity/show",
            name: "identityShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "用户管理",
                        path: "",
                    },
                    {
                        name: "身份认证列表",
                        path: "/identity/list",
                    },
                    {
                        name: "身份认证详情",
                        path: "/identity/show",
                    },
                ],
            },
            component: () => import("@/project/views/identity/show"),
        },
    ],
}
export default identity
