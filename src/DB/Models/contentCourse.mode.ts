
import {
  Schema,
  model,
  type HydratedDocument,
} from "mongoose";

import { Types } from "mongoose";


export interface ICourseContent {
  name: string;
  lecturesNumber: number;
  time: number;
  course_id:Types.ObjectId,
  isActive: boolean

}

export type IHContent = HydratedDocument<ICourseContent>;

const courseContentSchema = new Schema<ICourseContent>(
  {

    name: {
      type: String,
      required: true,
        trim: true
      
    },

    lecturesNumber: {
      type: Number,
      required: true
    },

    time: {
      type: Number,
      required: true
    },

    course_id:{
      type:Schema.Types.ObjectId,
      ref:"course",
      required:true
    },
    
    isActive:{
      type:Boolean,
      default:true
    }

  },


  {
    timestamps: true,
  },
);

courseContentSchema.index(
  { course_id: 1, name: 1 },
  { unique: true }
);


const contentCourseModel = model<ICourseContent>("contentCourse", courseContentSchema);

export default contentCourseModel;



