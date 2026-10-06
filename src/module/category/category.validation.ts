import z from "zod";



export const createCategorySchema = {
  body: z.object({
    name: z.string().trim().min(3).max(100),
  }),
};

export const updateCategorySchema = {
  body: z.object({
    name: z.string().trim().min(3).max(100).optional(),
  }),
};


