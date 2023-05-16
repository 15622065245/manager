const customer = {
    routes: [
        {
            path: "/customer/list",
            name: "customer",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "互动管理",
                        path: "",
                    },
                    {
                        name: "客服留言",
                        path: "/customer/list",
                    },
                ],
            },
            component: () => import("@/project/views/customer/list"),
        },{
            path: "/customer/show/:id",
            name: "customerShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "互动管理",
                        path: "",
                    },
                    {
                        name: "客服留言",
                        path: "/customer/list",
                    },
                    {
                        name: "客服留言详情",
                        path: "/customer/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/customer/show"),
        },
    ],
}
export default customer
