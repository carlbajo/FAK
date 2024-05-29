"use server";
import { fromError } from "zod-validation-error";
// HELPER
import { FormatError } from "@/lib/utils";
import { SigninSchema } from "./schema";
// DATABASE
import {
    GetUserByEmail, CreateEmailToken 
} from "@/lib/crud";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { transporter } from "@/lib/email";

export async function Signin(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // VALIDATION
    const isValid = SigninSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { email, password } = isValid.data;
    // Check if user exist
    const user = await GetUserByEmail(email);
    if(!user){
        return { message: "Account do not exist!" };
    };
    // If email is not validated yet, do not signin the user
    if(!user.emailVerified){
        const token = await CreateEmailToken(email, password);
        await transporter.sendMail({
            from: "codewithjehan@gmail.com",
            to: email,
            subject: "UDD | Verify your Email",
            text: "Click the link to reset your password!",
            html: `<a href="http://localhost:3000/verify-email?token=${token.token}">Verify email</a>`,
        });
        return { message: "Email verification has been successfully sent to your email." };
    };
    // if user is lock
    if(user.lock){
        return { message: "Your account is locked!" };
    }
    // Authentication using authjs
    try {
        await signIn("credentials", {
            email, password, redirectTo: "/"
        });
        return { message: "Signin Successfully." };
    }catch(error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return {message: "Credentials is not valid!"}
                default:
                    return {message: "Something went wrong!"}
            }
        }
        throw error;
    }
    return { message: "Signin Successfully." };
};