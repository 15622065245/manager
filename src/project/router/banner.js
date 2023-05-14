const banner = {
    routes: [
        {
            path: "/banner/list",
            name: "banner",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "广告管理",
                        path: "",
                    },
                    {
                        name: "banner广告列表",
                        path: "/banner/list",
                    },
                ],
            },
            component: () => import("@/project/views/banner/list"),
        },
    ],
}
export default banner
