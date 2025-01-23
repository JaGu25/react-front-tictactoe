import { z } from "zod";

export const formLoginSchema = z.object({
    email: z.string({ message: "Field is requiered" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Field is required" }),
});