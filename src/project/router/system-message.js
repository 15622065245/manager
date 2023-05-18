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
            path: "/systemMessage/show/:id",
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
                        path: "/systemMessage/show/:id",
                    },
                ],
                props: true
            },
            component: () => import("@/project/views/system-message/show"),
        },{
            path: "/systemMessage/create",
            name: "systemMessageCreate",
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
                        name: "新建推送",
                        path: "/systemMessage/create",
                    },
                ],
            },
            component: () => import("@/project/views/system-message/create"),
        },{
            path: "/systemMessage/add/:id",
            name: "systemMessageAdd",
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
                        name: "新建推送",
                        path: "/systemMessage/add/:id",
                    },
                ],
            },
            component: () => import("@/project/views/system-message/add"),
        },
    ],
}
export default systemMessage
