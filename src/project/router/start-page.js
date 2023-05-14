const startPage = {
    routes: [
        {
            path: "/startPage/list",
            name: "startPage",
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
                        name: "启动页广告列表",
                        path: "/startPage/list",
                    },
                ],
            },
            component: () => import("@/project/views/start-page/list"),
        },
    ],
}
export default startPage
