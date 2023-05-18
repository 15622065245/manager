const worksStyle = {
    routes: [
        {
            path: "/worksClassify/list",
            name: "worksClassify",
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
                        name: "作品衣品管理",
                        path: "/worksClassify/list",
                    },
                ],
            },
            component: () => import("@/project/views/works-classify/list"),
        },
    ],
}
export default worksStyle
