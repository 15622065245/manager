const helpArticle = {
    routes: [
        {
            path: "/helpArticle/list",
            name: "helpArticle",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "内容管理",
                        path: "/home/list",
                    },
                    {
                        name: "帮助文章管理",
                        path: "/helpArticle/list",
                    },
                ],
            },
            component: () => import("@/project/views/help-article/list"),
        },{
            path: "/helpArticle/show/:id",
            name: "helpArticleShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "工作台",
                        path: "/home/list",
                    },
                    {
                        name: "帮助文章管理",
                        path: "/helpArticle/list",
                    },
                    {
                        name: "帮助文章详情",
                        path: "/helpArticle/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/help-article/show"),
        },
    ],
}
export default helpArticle
