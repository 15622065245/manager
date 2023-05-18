const modelAudit = {
    routes: [
        {
            path: "/modelAudit/list",
            name: "modelAudit",
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
                        path: "/modelAudit/list",
                    },
                ],
            },
            component: () => import("@/project/views/model-audit/list"),
        },{
            path: "/modelAudit/show/:id",
            name: "modelAuditShow",
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
                        path: "/modelAudit/list",
                    },
                    {
                        name: "模特作品详情",
                        path: "/modelAudit/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/model-audit/show"),
        },
    ],
}
export default modelAudit
