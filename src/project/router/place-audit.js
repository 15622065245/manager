const placeAudit = {
    routes: [
        {
            path: "/placeAudit/list",
            name: "placeAudit",
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
                        path: "/placeAudit/list",
                    },
                ],
            },
            component: () => import("@/project/views/place-audit/list"),
        },{
            path: "/placeAudit/show",
            name: "placeAuditShow",
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
                        path: "/placeAudit/list",
                    },
                    {
                        name: "场地作品详情",
                        path: "/placeAudit/show",
                    },
                ],
            },
            component: () => import("@/project/views/place-audit/show"),
        },
    ],
}
export default placeAudit
