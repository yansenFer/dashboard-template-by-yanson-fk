import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  //dashboard
  index("pages/dashboard.tsx"),

  //Apps
  route("/apps/chat", "pages/apps/chat.tsx"),

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
  route(
    "/pages-template/edit-profile",
    "pages/pages-template/edit-profile.tsx",
  ),
  route("/pages-template/invoice", "pages/pages-template/invoice.tsx"),
  route("/pages-template/gallery", "pages/pages-template/gallery.tsx"),
  route("/pages-template/task-list", "pages/pages-template/task-list.tsx"),
  route("/pages-template/faq", "pages/pages-template/faq.tsx"),
  route("/pages-template/pricing", "pages/pages-template/pricing.tsx"),

  //Form
  route("/form/form-element", "pages/form/form-element.tsx"),
  route("/form/form-layout", "pages/form/form-layout.tsx"),
] satisfies RouteConfig;
