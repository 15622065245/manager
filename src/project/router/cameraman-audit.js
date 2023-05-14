const cameraman = {
    routes: [
        {
            path: "/cameramanAudit/list",
            name: "cameramanAudit",
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
                        name: "摄影师列表",
                        path: "/cameramanAudit/list",
                    },
                ],
            },
            component: () => import("@/project/views/cameraman-audit/list"),
        },{
            path: "/cameramanAudit/show",
            name: "cameramanAuditShow",
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
                        name: "摄影师列表",
                        path: "/cameramanAudit/list",
                    },
                    {
                        name: "摄影师作品详情",
                        path: "/cameramanAudit/show",
                    },
                ],
            },
            component: () => import("@/project/views/cameraman-audit/show"),
        },
    ],
}
export default cameraman
