const report = {
    routes: [
        {
            path: "/report/list",
            name: "report",
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
                        name: "举报列表",
                        path: "/report/list",
                    },
                ],
            },
            component: () => import("@/project/views/report/list"),
        },{
            path: "/report/show",
            name: "reportShow",
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
                        name: "举报列表",
                        path: "/report/list",
                    },
                    {
                        name: "举报列表详情",
                        path: "/report/show",
                    },
                ],
            },
            component: () => import("@/project/views/report/show"),
        },
    ],
}
export default report
