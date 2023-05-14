const systemArticle = {
    routes: [
        {
            path: "/systemArticle/list",
            name: "systemArticle",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "内容管理",
                        path: "",
                    },
                    {
                        name: "系统文章管理",
                        path: "/systemArticle/list",
                    },
                ],
            },
            component: () => import("@/project/views/system-article/list"),
        },{
            path: "/systemArticle/show/:id",
            name: "systemArticleShow",
            meta: {
                isShowHeader: true,
                isShowLeftSider: true,
                keepAlive: false,
                breadcrumb: [
                    {
                        name: "内容管理",
                        path: "",
                    },
                    {
                        name: "系统文章管理",
                        path: "/systemArticle/list",
                    },
                    {
                        name: "系统文章详情",
                        path: "/systemArticle/show/:id",
                    },
                ],
            },
            component: () => import("@/project/views/system-article/show"),
        },
    ],
}
export default systemArticle
