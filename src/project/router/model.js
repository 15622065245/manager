const model = {
    routes: [
        {
            path: "/model/list",
            name: "model",
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
                        name: "模特作品列表",
                        path: "/model/list",
                    },
                ],
            },
            component: () => import("@/project/views/model/list"),
        },{
            path: "/model/show/:id",
            name: "modelShow",
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
                        name: "模特作品列表",
                        path: "/model/list",
                    },
                    {
                        name: "模特作品详情",
                        path: "/model/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/model/show"),
        },
    ],
}
export default model
