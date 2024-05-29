import z from "zod";
import { isMatch, isEmpty } from "@/lib/helper";

export const SigninSchema = z.object({
    email: z.string().email("The email is invalid!"),
    password: z.string(),
}).superRefine((login, ctx) => {
    if(isEmpty(login.email)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email is empty!"
        });
    }
    if(isEmpty(login.password)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password is empty!"
        });
    }
});