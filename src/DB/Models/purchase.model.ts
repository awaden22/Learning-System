import { Schema, model, Types } from "mongoose";

export interface IPurchase {
  user_id: Types.ObjectId;
  course_id: Types.ObjectId;
  payment_id: Types.ObjectId;
  price: number;
  purchasedAt?: Date;
}

const purchaseSchema = new Schema<IPurchase>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course_id: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    payment_id: {
      type: Schema.Types.ObjectId,
      ref: "payment",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const purchaseModel = model<IPurchase>("Purchase", purchaseSchema);

export default purchaseModel;
