import z from "zod";
import { isMatch, isEmpty } from "@/lib/helper";

export const SignupSchema = z.object({
    email: z.string().email("Email is invalid!").min(8),
    password: z.string().min(8, "Password is short!").max(20, "Password is too long!"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is short!").max(40, "First name is too long!"),
    lastName: z.string().min(1, "Last name is too short!").max(40, "Last name is too large!"),
    courseId: z.string(),
}).superRefine((register, ctx) => {
    if(!register.email.endsWith("@cdd.edu.ph")){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email must end with @cdd.edu.ph!",
        });
    }
    if(!isMatch(register.password, register.confirmPassword)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password do not match!",
        });
    }
});