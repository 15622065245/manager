const user = {
    routes: [
        {
            path: "/user/list",
            name: "userList",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "用户管理",
                        path: "",
                    },
                    {
                        name: "用户列表",
                        path: "/user/list",
                    },
                ],
            },
            component: () => import("@/project/views/user/list"),
        },
        {
            path: "/user/show/:id",
            name: "userShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "用户管理",
                        path: "",
                    },
                    {
                        name: "用户列表",
                        path: "/user/list",
                    },
                    {
                        name: "用户详情",
                        path: "/user/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/user/show"),
        },
        {
            path: "/user/show/model/show/:id",
            name: "userModelShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "用户管理",
                        path: "",
                    },
                    {
                        name: "用户列表",
                        path: "/user/list",
                    },
                    {
                        name: "作品详情",
                        path: "/user/show",
                    },
                ],
            },
            component: () => import("@/project/views/user/components/model/show"),
        },
        {
            path: "/user/show/cameraman/show/:id",
            name: "userCameramanShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "用户管理",
                        path: "",
                    },
                    {
                        name: "用户列表",
                        path: "/user/list",
                    },
                    {
                        name: "作品详情",
                        path: "/cameraman/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/user/components/cameraman/show"),
        },
        {
            path: "/user/show/place/show/:id",
            name: "userPlaceShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "用户管理",
                        path: "",
                    },
                    {
                        name: "用户列表",
                        path: "/user/list",
                    },
                    {
                        name: "作品详情",
                        path: "/place/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/user/components/place/show"),
        },
    ],
}
export default user
