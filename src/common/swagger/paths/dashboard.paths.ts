const bearerAuth = [{ bearerAuth: [] }];

export const dashboardPaths = {
  "/dashboard/": {
    get: {
      tags: ["Dashboard"],
      security: bearerAuth,
      summary: "Get dashboard statistics",
      responses: {
        200: {
          description: "Dashboard data retrieved",
        },
      },
    },
  },
};