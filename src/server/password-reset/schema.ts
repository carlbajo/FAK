import z from "zod";
import { isMatch, isEmpty } from "@/lib/helper";

export const PasswordresetSchema = z.object({
    token: z.string({invalid_type_error: "Token format is invalid"}),
    password: z.string().min(8, "Password is short!").max(20, "Password is too long!"),
    confirmPassword: z.string(),
}).superRefine((token, ctx) => {
    if(!isMatch(token.password, token.confirmPassword)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password do not match!",
        });
    }
});