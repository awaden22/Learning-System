import Stripe from "stripe";
import { cancel_url, STRIP_HOOK_SECRET, STRIPE_SECRET_KEY, success_url } from "../../config/config.service.js";
import checkoutService from "../checkout/checkout.service.js";
import paymentRepo from "../../DB/Repo/payment.repo.js";
import { BadRequestException } from "../../common/exceptions/domain.exception.js";
import { PaymentStatus } from "../../common/enums/payment.enums.js";

import type { Request } from "express";
import purchaseService from "../purchase/purchase.service.js";

class PaymentService {
  private stripe = new Stripe(STRIPE_SECRET_KEY);
  private _paymentRepo = paymentRepo


  async createPayment(userId: string) {
    const dataUser = await checkoutService.checkout(userId);

    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "egp",

            product_data: {
              name: "Courses",
            },

            unit_amount: Math.round(dataUser.total * 100),
          },

          quantity: 1,
        },
      ],

      success_url,
      cancel_url,

      metadata: {
        userId,
      },
    });

    const payment = await this._paymentRepo.create({
      data: {
        user_id: userId,
        session_id: session.id,
        payment_intent_id: session.payment_intent
          ? session.payment_intent.toString()
          : undefined,
        amount: dataUser.total,
        status: PaymentStatus.pending,
      },
    });

    return {
      payment,
      checkoutUrl: session.url
    };
  }


  async webhook(req: Request): Promise<Stripe.Event> {
  
    let event: Stripe.Event;

    const signature = req.headers["stripe-signature"];


    if (!signature || Array.isArray(signature)) {
      throw new BadRequestException("Stripe signature is missing");
    }

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        signature,
        STRIP_HOOK_SECRET
      );
     
   } catch (err: any) {


  throw new BadRequestException(
    "Webhook signature verification failed: " + err.message
  );
}

    if (event.type !== "checkout.session.completed") {
      return event;
    }

    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;

    

    if (!userId) {
      throw new BadRequestException(
        "user ID is missing from Stripe metadata"
      );
    }

    if (session.payment_status !== "paid") {
      return event;
    }

    const updatedPayment = await this._paymentRepo.findandUpdate({
      filter: {
        session_id: session.id,
        status: PaymentStatus.pending,
      },

      update: {
        status: PaymentStatus.paid,

        payment_intent_id: session.payment_intent
          ? session.payment_intent.toString()
          : undefined,
      },

      options: {
        returnDocument: "after",
      },
    });
  
    if (!updatedPayment) {
      return event;
    }

    await purchaseService.createPurchases(updatedPayment._id.toString(),userId)
    return event;
  }

}





export default new PaymentService();