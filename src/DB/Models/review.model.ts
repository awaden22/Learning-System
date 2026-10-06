import { Schema, model, Types } from "mongoose";

export interface IReview {
  user_id: Types.ObjectId;
  course_id: Types.ObjectId;
  instructor_id: Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>(
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

    instructor_id: {
      type: Schema.Types.ObjectId,
      ref: "instructor",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index(
  {
    user_id: 1,
    course_id: 1,
  },
  {
    unique: true,
  }
);

const reviewModel = model<IReview>("review", reviewSchema);

export default reviewModel