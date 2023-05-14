const systemMessage = {
    routes: [
        {
            path: "/systemMessage/list",
            name: "systemMessage",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "消息管理",
                        path: "",
                    },
                    {
                        name: "系统消息管理",
                        path: "/systemMessage/list",
                    },
                ],
            },
            component: () => import("@/project/views/system-message/list"),
        },{
            path: "/systemMessage/show",
            name: "systemMessageShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "消息管理",
                        path: "",
                    },
                    {
                        name: "系统消息管理",
                        path: "/systemMessage/list",
                    },
                    {
                        name: "系统消息详情",
                        path: "/systemMessage/show",
                    },
                ],
            },
            component: () => import("@/project/views/system-message/show"),
        },
    ],
}
export default systemMessage
