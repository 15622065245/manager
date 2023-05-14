const worksStyle = {
    routes: [
        {
            path: "/worksClothing/list",
            name: "worksClothing",
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
                        path: "/worksClothing/list",
                    },
                ],
            },
            component: () => import("@/project/views/works-clothing/list"),
        },
    ],
}
export default worksStyle
