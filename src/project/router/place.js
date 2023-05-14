const place = {
    routes: [
        {
            path: "/place/list",
            name: "place",
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
                        name: "场地作品列表",
                        path: "/model/list",
                    },
                ],
            },
            component: () => import("@/project/views/place/list"),
        },{
            path: "/place/show",
            name: "placeShow",
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
                        name: "场地作品列表",
                        path: "/place/list",
                    },
                    {
                        name: "场地作品详情",
                        path: "/place/show",
                    },
                ],
            },
            component: () => import("@/project/views/place/show"),
        },
    ],
}
export default place
