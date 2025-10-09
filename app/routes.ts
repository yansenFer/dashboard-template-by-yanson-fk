import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/dashboard.tsx'),
  route('/account/simple-sign-in', 'pages/account/simple-sign-in.tsx'),
  route('/account/simple-sign-up', 'pages/account/simple-sign-up.tsx'),
] satisfies RouteConfig
