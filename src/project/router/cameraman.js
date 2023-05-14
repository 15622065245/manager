const cameraman = {
    routes: [
        {
            path: "/cameraman/list",
            name: "cameraman",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "作品管理",
                        path: "",
                    },
                    {
                        name: "摄影师列表",
                        path: "/cameraman/list",
                    },
                ],
            },
            component: () => import("@/project/views/cameraman/list"),
        },{
            path: "/cameraman/show",
            name: "cameramanShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "作品管理",
                        path: "",
                    },
                    {
                        name: "摄影师列表",
                        path: "/cameraman/list",
                    },
                    {
                        name: "摄影师作品详情",
                        path: "/cameraman/show",
                    },
                ],
            },
            component: () => import("@/project/views/cameraman/show"),
        },
    ],
}
export default cameraman
