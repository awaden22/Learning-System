export const landingPaths = {
  "/landing/": {
    get: {
      tags: ["Landing"],
      summary: "Get landing page data",
      responses: {
        200: {
          description: "Landing data retrieved successfully",
        },
      },
    },
  },
};