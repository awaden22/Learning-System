const bearerAuth = [{ bearerAuth: [] }];

export const userPaths = {
  "/user": {
    get: {
      tags: ["User"],
      security: bearerAuth,
      summary: "Get all users",
      responses: {
        200: { description: "Users retrieved successfully" },
      },
    },
  },

  "/user/logout": {
    post: {
      tags: ["User"],
      security: bearerAuth,
      summary: "Logout",
      responses: {
        200: { description: "Logout successful" },
      },
    },
  },

  "/user/search": {
    get: {
      tags: ["User"],
      security: bearerAuth,
      summary: "Search users",
      parameters: [
        {
          name: "search",
          in: "query",
          required: false,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Users found" },
      },
    },
  },

  "/user/{id}": {
    get: {
      tags: ["User"],
      security: bearerAuth,
      summary: "Get user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "User retrieved successfully" },
        404: { description: "User not found" },
      },
    },
  },

  "/user/update-profile": {
    patch: {
      tags: ["User"],
      security: bearerAuth,
      summary: "Update profile",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "Profile updated successfully" },
      },
    },
  },
};