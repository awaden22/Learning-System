import {
  Schema,
  model,
  type HydratedDocument,
} from "mongoose";


import { InstructorEnums } from "../../common/enums/instructor.enums.js";


export interface IInstructor {

  name: string;
  image_url?: string;
  jobTittle: InstructorEnums
  description: string;
  rate: number;
  isActive: boolean;
}

export type IHInstructor = HydratedDocument<IInstructor>;

const instrcutorSchema = new Schema<IInstructor>(
  {

    name: {
      type: String,
      required: true,

    },

    image_url: {
      type: String,

    },
    jobTittle: {
      type: Number,
      enum: InstructorEnums,
      required:true

    },
    description: {
      type: String,
      required: true,

    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
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


const instructorModel = model<IInstructor>("instructor", instrcutorSchema);

export default instructorModel;
