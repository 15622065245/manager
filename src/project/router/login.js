const login = {
  routes: [
    {
      path:'/',
      redirect:'/account/list'
    },
    {
      path:'/login',
      name:'login',
      meta:{
        isShowHeader:false,
        isShowLeftSider:false,
      },
      component: () => import( '@/project/views/Login.vue'),
    },

  ]
}
export default login;
