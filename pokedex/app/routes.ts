import { type RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "routes/root.tsx",
  },
  {
    path: "/pokemon",
    file: "routes/pokemon/layout.tsx",
    children: [
      {
        index: true,
        file: "routes/pokemon/index.tsx",
      },
      {
        path: ":id",
        file: "routes/pokemon/detail.tsx",
      }
    ]
  }
] satisfies RouteConfig;
