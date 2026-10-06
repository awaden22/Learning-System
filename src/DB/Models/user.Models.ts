import {
  Schema,
  model,
  type HydratedDocument,
} from "mongoose";
import {
  ProivderEnum,
  RoleEnum,
} from "../../common/enums/user.enums.js";
import { Types } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  confirmEmail: boolean;
  password: string;
  Provider: ProivderEnum;
  role: RoleEnum;
  changeCreditTime: Date;
}

export type IHUser = HydratedDocument<IUser>;


const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: function (): boolean {
        return this.Provider === ProivderEnum.System

      },
    },

    lastName: {
      type: String,
      required: function (): boolean {
        return this.Provider === ProivderEnum.System

      },

    },

    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    confirmEmail: {
      type: Boolean,
      default: false
    },

    password: {
      type: String,
      required: function (): boolean {
        return this.Provider == ProivderEnum.System;
      },
    },

    Provider: {
      type: Number,
      enum: ProivderEnum,
      default: ProivderEnum.System,
    },

    role: {
      type: Number,
      enum: RoleEnum,
      default: RoleEnum.User,
    },

    changeCreditTime: Date,
  },
  {
    timestamps: true,
  },
);

// 3. Create a Model.
const userModel = model<IUser>("User", userSchema);

export default userModel;
