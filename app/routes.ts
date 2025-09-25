import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/dashboard.tsx'),
  route('/account/sign-in', 'pages/account/sign-in.tsx'),
] satisfies RouteConfig
