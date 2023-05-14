const module = {
  routes: [
    {
      path: "/module/list",
      name: "moduleList",
      meta: {
        isShowHeader: true,
        isShowLeftSider: true,
        keepAlive: false,
        breadcrumb: [
          {
            name: "首页",
            path: "",
          },
          {
            name: "模块管理",
            path: "/module/list",
          },
        ],
      },
      component: () => import("@/project/views/module/list"),
    },
  ],
}
export default module
