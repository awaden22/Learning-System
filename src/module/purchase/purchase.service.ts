import mongoose from "mongoose";
import { NotFoundException } from "../../common/exceptions/domain.exception.js";
import { PaymentStatus } from "../../common/enums/payment.enums.js";

import paymentRepo from "../../DB/Repo/payment.repo.js";
import purchaseRepo from "../../DB/Repo/purchase.repo.js";
import cartRepo from "../../DB/Repo/cart.repo.js";
import courseRepo from "../../DB/Repo/course.repo.js";

class PurchaseService {
  private _paymentRepo = paymentRepo;
  private _purchaseRepo = purchaseRepo;
  private _cartRepo = cartRepo;
  private _courseRepo = courseRepo;

  async createPurchases( paymentId: string,userId: string,) {

    const session = await mongoose.startSession();

    try {

      const purchases = await session.withTransaction(async () => {

        // 1. Check payment
        const payment = await this._paymentRepo.findOne({
          filter: {
            _id: paymentId,
            user_id: userId,
            status: PaymentStatus.paid,
          },
          options: {
            session,
          },
        });

        if (!payment) {
          throw new NotFoundException("payment not found");
        }

        // 2. Get cart
        const cart = await this._cartRepo.findOne({
          filter: {
            user_id: userId,
          },
          options: {
            session,
          },
        });

        if (!cart || cart.course_id.length === 0) {
          throw new NotFoundException("cart is empty");
        }

        // 3. Get courses
        const courses = await this._courseRepo.find({
          filter: {
            _id: { $in: cart.course_id },
            isActive: true,
          },
          options: {
            session,
          },
        });

        if (courses.length !== cart.course_id.length) {
          throw new NotFoundException(
            "one or more courses are not available"
          );
        }

        // 4. Create purchases
        const purchases = [];

        for (const course of courses) {

          const purchase = await this._purchaseRepo.create({
            data: {
              user_id: userId,
              course_id: course._id,
              payment_id: payment._id,
              price: course.cost,
            },
            options: {
              session,
            },
          });

          purchases.push(purchase);
        }

        // 5. Clear cart
        await this._cartRepo.updateOne({
          filter: {
            user_id: userId,
          },
          update: {
            course_id: [],
          },
          options: {
            session,
          },
        });

        return purchases;
      });

      return purchases;

    } finally {
      await session.endSession();
    }
  }
}

export default new PurchaseService();