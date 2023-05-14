const worksStyle = {
    routes: [
        {
            path: "/worksStyle/list",
            name: "worksStyle",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "作品属性管理",
                        path: "",
                    },
                    {
                        name: "作品风格管理",
                        path: "/worksStyle/list",
                    },
                ],
            },
            component: () => import("@/project/views/works-style/list"),
        },
    ],
}
export default worksStyle
