const bearerAuth = [{ bearerAuth: [] }];

export const cartPaths = {
  "/cart/{id}": {
    post: {
      tags: ["Cart"],
      security: bearerAuth,
      summary: "Add course to cart",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Course ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Course added to cart" },
      },
    },

    get: {
      tags: ["Cart"],
      summary: "Get user cart",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "User ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Cart retrieved" },
      },
    },
  },

  "/cart/remove/{idUser}/{courseId}": {
    delete: {
      tags: ["Cart"],
      security: bearerAuth,
      summary: "Remove course from cart",
      parameters: [
        {
          name: "idUser",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
        {
          name: "courseId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Course removed" },
      },
    },
  },

  "/cart/{userId}": {
    delete: {
      tags: ["Cart"],
      security: bearerAuth,
      summary: "Clear cart",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Cart cleared" },
      },
    },
  },
};