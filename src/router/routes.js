import currentUserRoutes from './currentuser'

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: currentUserRoutes
  }
]
