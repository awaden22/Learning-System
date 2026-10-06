const bearerAuth = [{ bearerAuth: [] }];

const idParameter = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string" },
};

export const coursePaths = {
  "/course/createCourse": {
    post: {
      tags: ["Course"],
      security: bearerAuth,
      summary: "Create course",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                courseName: { type: "string" },
                category_id: { type: "string" },
                instructor_id: { type: "string" },
                cost: { type: "number" },
                level: { type: "number" },
                totalHours: { type: "number" },
                description: { type: "string" },
                certification: { type: "string" },
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
        201: { description: "Course created" },
      },
    },
  },

  "/course/top": {
    get: {
      tags: ["Course"],
      summary: "Get top courses",
      responses: {
        200: { description: "Top courses retrieved" },
      },
    },
  },

  "/course/similar/{id}": {
    get: {
      tags: ["Course"],
      summary: "Get similar courses",
      parameters: [idParameter],
      responses: {
        200: { description: "Similar courses retrieved" },
      },
    },
  },

  "/course/category/{categoryId}": {
    get: {
      tags: ["Course"],
      summary: "Get courses by category",
      parameters: [
        {
          name: "categoryId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
        {
          name: "size",
          in: "query",
          schema: { type: "integer", default: 10 },
        },
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        {
          name: "courseName",
          in: "query",
          schema: { type: "string" },
        },
        {
          name: "rate",
          in: "query",
          schema: { type: "number" },
        },
        {
          name: "price",
          in: "query",
          schema: { type: "number" },
        },
      ],
      responses: {
        200: { description: "Courses retrieved" },
      },
    },
  },

  "/course/{id}": {
    get: {
      tags: ["Course"],
      summary: "Get course by ID",
      parameters: [idParameter],
      responses: {
        200: { description: "Course retrieved" },
      },
    },

    patch: {
      tags: ["Course"],
      security: bearerAuth,
      summary: "Update course",
      parameters: [idParameter],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
            },
          },
        },
      },
      responses: {
        200: { description: "Course updated" },
      },
    },

    delete: {
      tags: ["Course"],
      security: bearerAuth,
      summary: "Delete course",
      parameters: [idParameter],
      responses: {
        200: { description: "Course deleted" },
      },
    },
  },
};