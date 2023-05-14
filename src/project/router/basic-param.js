const basicParam = {
    routes: [
        {
            path: "/basicParam/list",
            name: "basicParam",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "系统管理",
                        path: "",
                    },
                    {
                        name: "基本参数",
                        path: "/basicParam/list",
                    },
                ],
            },
            component: () => import("@/project/views/basic-param/list"),
        },
    ],
}
export default basicParam
