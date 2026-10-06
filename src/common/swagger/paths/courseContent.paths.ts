const bearerAuth = [{ bearerAuth: [] }];

const idParameter = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string" },
};

export const courseContentPaths = {
  "/content": {
    post: {
      tags: ["Course Content"],
      security: bearerAuth,
      summary: "Create course content",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        201: { description: "Content created" },
      },
    },
  },

  "/content/all/{id}": {
    get: {
      tags: ["Course Content"],
      summary: "Get all course contents",
      parameters: [idParameter],
      responses: {
        200: { description: "Contents retrieved" },
      },
    },
  },

  "/content/other/{id}": {
    get: {
      tags: ["Course Content"],
      summary: "Get other course contents",
      parameters: [idParameter],
      responses: {
        200: { description: "Contents retrieved" },
      },
    },
  },

  "/content/{id}": {
    get: {
      tags: ["Course Content"],
      summary: "Get content by ID",
      parameters: [idParameter],
      responses: {
        200: { description: "Content retrieved" },
      },
    },

    patch: {
      tags: ["Course Content"],
      security: bearerAuth,
      summary: "Update content",
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
        200: { description: "Content updated" },
      },
    },

    delete: {
      tags: ["Course Content"],
      security: bearerAuth,
      summary: "Delete content",
      parameters: [idParameter],
      responses: {
        200: { description: "Content deleted" },
      },
    },
  },
};