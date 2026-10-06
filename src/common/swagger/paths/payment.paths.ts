const bearerAuth = [{ bearerAuth: [] }];

export const paymentPaths = {
  "/payment/webhook": {
    post: {
      tags: ["Payment"],
      summary: "Stripe webhook",
      description: "Receives Stripe checkout.session.completed events.",
      parameters: [
        {
          name: "stripe-signature",
          in: "header",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Webhook processed",
        },
      },
    },
  },

  "/payment/{id}": {
    post: {
      tags: ["Payment"],
      security: bearerAuth,
      summary: "Create Stripe payment",
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
        200: {
          description: "Stripe checkout session created",
        },
      },
    },
  },
};