
import dotenv from "dotenv";
import path from "path";

export const NODE_ENV = process.env.NODE_ENV;



dotenv.config({ path: path.resolve("./.env.prod") });

export const SERVER_PORT = Number(process.env.PORT) || 3000;
export const Database_URL = process.env.Database_URL as string;

export const REDIS_URL = process.env.REDIS_URL as string;
export const SALT_ROUND = parseInt(process.env.SALT_ROUND as string);
export const ENYCRPTION_KEY = process.env.ENCRYPTION_KEY as string;
export const TOKEN_SIGNATURE_Admin_Access = process.env
  .TOKEN_SIGNATURE_Admin as string;
export const TOKEN_SIGNATURE_User_Access = process.env
  .TOKEN_SIGNATURE_User as string;
export const TOKEN_SIGNATURE_Admin_Refresh = process.env
  .TOKEN_SIGNATURE_Admin_Refresh as string;
export const TOKEN_SIGNATURE_User_Refresh = process.env
  .TOKEN_SIGNATURE_User_Refresh as string;
export const Client_Token_ID = process.env.Client_Token_ID as string;
export const MAIL_USER = process.env.MAIL_USER as string;
export const MAIL_PASS = process.env.MAIL_PASS as string;
export const Access_Key_Id = process.env.Access_Key_Id as string;


export const Bucket_Name= process.env.Bucket_Name
export const Application_Name = process.env.Application_Name
export const Region= process.env.Region as string
export const Secret_Access_Key= process.env.Secret_Access_Key as string


export const success_url = process.env.success_url as string;
export const cancel_url = process.env.cancel_url as string;
export const STRIP_HOOK_SECRET = process.env.STRIP_HOOK_SECRET as string;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
