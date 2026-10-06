import z from "zod";
import { commonValidationFields } from "../../Middlewares/validation.middleware.js";

export const logoutSchema = {
    body: z.object({
        logoutOptions: z.enum(["all", "one"])
    })

}
export const uploadProfileSchema = {
    body: z.object({
        contentType: z.string(),
        originname: z.string()
    })
}
export const updateProfileUserSchema = {
    body: z.object({
     
        userName: commonValidationFields.userName.optional(),
     


    })
    
}


export default logoutSchema
