
import {
  Schema,
  model,
  type HydratedDocument,
} from "mongoose";

import { Types } from "mongoose";
import { LevelEnum } from "../../common/enums/level.enums.js";


export interface ICourse {
  courseName: string;
  category_id: Types.ObjectId;
  instructor_id: Types.ObjectId;
  cost: number;
  level: number;
  totalHours: number;
  rate: number;
  description: string;
  certification?: string;
  image_url: string;
  isActive: boolean;
}

export type IHCourse = HydratedDocument<ICourse>;

const courseSchema = new Schema<ICourse>(
  {

    courseName: {
      type: String,
      required: true,
      unique: true,
      trim: true

    },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true
    },

    instructor_id: {
      type: Schema.Types.ObjectId,
      ref: "instructor",
      required: true
    },

    cost: {
      type: Number,
      required: true
    },

    level: {
      type: Number,
      enum: LevelEnum,
      required: true,
    },

    totalHours: {
      type: Number,
      required: true
    },

    rate: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },

    image_url: {
      type: String,
    },

    description: {
      type: String,
      required: true

    },

    certification: {
      type: String,

    },

    isActive: {
      type: Boolean,
      default: true
    }


  },


  {
    timestamps: true,
  },
);


const courseModel = model<ICourse>("course", courseSchema);

export default courseModel;
