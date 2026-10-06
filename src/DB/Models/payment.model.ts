import { Schema, model, Types } from "mongoose";
import { PaymentStatus } from "../../common/enums/payment.enums.js";


export interface IPayment {
  user_id: Types.ObjectId;
  session_id: string;
  payment_intent_id?: string;
  amount: number;
  status: PaymentStatus;
   paidAt?: Date;

}

const paymentSchema = new Schema<IPayment>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    session_id: {
      type: String,
      required: true,
      unique: true,
    },

    payment_intent_id: {
      type: String,
      unique: true,
      sparse: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.pending,
      required: true,
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const paymentModel = model<IPayment>("payment", paymentSchema);

export default paymentModel;
