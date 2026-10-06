const bearerAuth = [{ bearerAuth: [] }];

const idParameter = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string" },
};

export const categoryPaths = {
  "/category": {
    post: {
      tags: ["Category"],
      security: bearerAuth,
      summary: "Create category",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                image: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Category created" },
      },
    },

    get: {
      tags: ["Category"],
      summary: "Get all categories",
      parameters: [
        {
          name: "size",
          in: "query",
          schema: { type: "integer", default: 4 },
        },
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
      ],
      responses: {
        200: { description: "Categories retrieved" },
      },
    },
  },

  "/category/{id}": {
    get: {
      tags: ["Category"],
      summary: "Get category by ID",
      parameters: [idParameter],
      responses: {
        200: { description: "Category retrieved" },
      },
    },

    patch: {
      tags: ["Category"],
      security: bearerAuth,
      summary: "Update category",
      parameters: [idParameter],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                image: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Category updated" },
      },
    },

    delete: {
      tags: ["Category"],
      security: bearerAuth,
      summary: "Delete category",
      parameters: [idParameter],
      responses: {
        200: { description: "Category deleted" },
      },
    },
  },
};