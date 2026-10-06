import { Schema, model, Types } from "mongoose";

export interface ICart {
  user_id: Types.ObjectId;
  course_id: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const cartSchema = new Schema<ICart>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    course_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);




const cartModel = model<ICart>("cart", cartSchema);

export default cartModel;