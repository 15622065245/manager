const home = {
    routes: [
        {
            path: "/home/list",
            name: "homeList",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "工作台",
                        path: "/home/list",
                    },
                ],
            },
            component: () => import("@/project/views/home/list"),
        },
    ],
}
export default home
