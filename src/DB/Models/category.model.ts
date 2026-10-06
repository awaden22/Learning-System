import {
  Schema,
  model,
  type HydratedDocument,
} from "mongoose";

import { Types } from "mongoose";


export interface ICategory {
  name: string;
  image_url: string;
  isActive: boolean;
}

export type IHCategory = HydratedDocument<ICategory>;

const categorySchema = new Schema<ICategory>(
  {

    name: {
      type: String,
      required: true,
      unique: true
    },

    image_url: {
      type: String,
      required: true
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


const categoryModel = model<ICategory>("category", categorySchema);

export default categoryModel;
