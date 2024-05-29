import z from "zod";

export const PasswordforgotSchema = z.object({
    email: z.string().email("Email is invalid!").superRefine((email, ctx) => {
        if(!email.endsWith("@cdd.edu.ph")){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Email must end with @cdd.edu.ph!"
            });
        }
    }),
});