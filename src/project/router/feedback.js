const feedback = {
    routes: [
        {
            path: "/feedback/list",
            name: "feedback",
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
                        name: "意见反馈",
                        path: "/feedback/list",
                    },
                ],
            },
            component: () => import("@/project/views/feedback/list"),
        },{
            path: "/feedback/show/:id",
            name: "feedbackShow",
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
                        name: "意见反馈",
                        path: "/feedback/list",
                    },
                    {
                        name: "意见反馈详情",
                        path: "/feedback/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/feedback/show"),
        },
    ],
}
export default feedback
