import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  //dashboard
  index("pages/dashboard.tsx"),

  //Pages
  route(
    "/pages-template/simple-sign-in",
    "pages/pages-template/simple-sign-in.tsx",
  ),
  route(
    "/pages-template/simple-sign-up",
    "pages/pages-template/simple-sign-up.tsx",
  ),
  route("/pages-template/profile", "pages/pages-template/profile.tsx"),

  //Form
  route("/form/form-element", "pages/form/form-element.tsx"),
  route("/form/form-layout", "pages/form/form-layout.tsx"),
] satisfies RouteConfig;
