export default defineNuxtRouteMiddleware((to, from) => {
    console.log('中间件', to.fullPath)
    // isAuthenticated()是一个验证用户是否已经认证的示例方法
    // if (isAuthenticated() === false) {
    //   return navigateTo('/login')
    // }
})
