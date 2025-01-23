import { z } from "zod";

export const formRegisterSchema = z.object({
    email: z.string({ message: "Field is requiered" }).email({ message: "Invalid email address" }),
    fullName: z.string().min(1, { message: "Field is required" }),
    password: z.string().min(1, { message: "Field is required" }),
});