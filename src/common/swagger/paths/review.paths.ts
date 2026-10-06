const bearerAuth = [{ bearerAuth: [] }];

const idParameter = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string" },
};

export const reviewPaths = {
  "/review/createReview": {
    post: {
      tags: ["Review"],
      security: bearerAuth,
      summary: "Create review",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        201: { description: "Review created" },
      },
    },
  },

  "/review/{id}": {
    get: {
      tags: ["Review"],
      summary: "Get review by ID",
      parameters: [idParameter],
      responses: {
        200: { description: "Review retrieved" },
      },
    },

    patch: {
      tags: ["Review"],
      security: bearerAuth,
      summary: "Update review",
      parameters: [idParameter],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "Review updated" },
      },
    },

    delete: {
      tags: ["Review"],
      security: bearerAuth,
      summary: "Delete review",
      parameters: [idParameter],
      responses: {
        200: { description: "Review deleted" },
      },
    },
  },
};