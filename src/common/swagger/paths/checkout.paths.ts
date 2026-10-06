const bearerAuth = [{ bearerAuth: [] }];

export const checkoutPaths = {
  "/checkout/{id}": {
    post: {
      tags: ["Checkout"],
      security: bearerAuth,
      summary: "Checkout cart",
      description: "Validates the user's cart and calculates subtotal, tax and total.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Currently required by the route.",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Checkout information",
        },
      },
    },
  },
};