import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  //dashboard
  index('pages/dashboard.tsx'),

  //Account
  route('/account/simple-sign-in', 'pages/account/simple-sign-in.tsx'),
  route('/account/simple-sign-up', 'pages/account/simple-sign-up.tsx'),

  //Form
  route('/form/form-element', 'pages/form/form-element.tsx'),
] satisfies RouteConfig
