const bearerAuth = [{ bearerAuth: [] }];

const idParameter = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string" },
};

export const instructorPaths = {
  "/instructor": {
    post: {
      tags: ["Instructor"],
      security: bearerAuth,
      summary: "Create instructor",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                jobTittle: { type: "string" },
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
        201: { description: "Instructor created" },
      },
    },

    get: {
      tags: ["Instructor"],
      summary: "Get all instructors",
      parameters: [
        {
          name: "size",
          in: "query",
          schema: { type: "integer", default: 3 },
        },
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        {
          name: "name",
          in: "query",
          schema: { type: "string" },
        },
        {
          name: "jobTittle",
          in: "query",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Instructors retrieved" },
      },
    },
  },

  "/instructor/top": {
    get: {
      tags: ["Instructor"],
      summary: "Get top instructors",
      responses: {
        200: { description: "Top instructors retrieved" },
      },
    },
  },

  "/instructor/{id}": {
    get: {
      tags: ["Instructor"],
      summary: "Get instructor by ID",
      parameters: [idParameter],
      responses: {
        200: { description: "Instructor retrieved" },
      },
    },

    patch: {
      tags: ["Instructor"],
      security: bearerAuth,
      summary: "Update instructor",
      parameters: [idParameter],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                jobTittle: { type: "string" },
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
        200: { description: "Instructor updated" },
      },
    },

    delete: {
      tags: ["Instructor"],
      security: bearerAuth,
      summary: "Delete instructor",
      parameters: [idParameter],
      responses: {
        200: { description: "Instructor deleted" },
      },
    },
  },
};