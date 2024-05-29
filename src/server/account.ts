"use server"
// @validations
import { z } from "zod"
import { fromError } from "zod-validation-error"
import bcryptjs from "bcryptjs"
// @utilities
import { isMatch } from "@/lib/helper";
import { FormatError, CustomMessage } from "@/lib/utils"
import { transporter } from "@/lib/email";
import { redirect } from "next/navigation";
// @database
import { GetUserByEmail, CreateEmailToken } from "@/lib/crud"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function AccountAction(
    prev: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData)
    const valid = schema.safeParse(rawFormData)

    if(!valid.success){
        const error = FormatError(fromError(valid.error).message)
        return CustomMessage(error[0])
    }

    let {email, password} = valid.data
    // @if user exist
    const user = await GetUserByEmail(email)

    if(!user){
        return CustomMessage("User doesn't exist!")
    }

    // if password match[old/new]
    if(password) {
        const match = await bcryptjs.compare(
            password, user.password
        );
        if(match){
            return CustomMessage("Old and new password are the same!")
        }
    }

    // optional
    if(!password){
        password = user.password
    } else password = await bcryptjs.hash(password, 10);

    // update
    try{
        await prisma.user.update({
            where: { id: user.id },
            data: { password, preferences: { 
                connect: { userId: user.id }
             } }
        })
        revalidatePath("/")
    } catch(error){
        throw new Error("Something went wrong")
    }

    // if email is new
    if(!isMatch(user.email, email)){
        if(user.emailVerified){
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: null }
            })
        }
        // Generate token
        const token = await CreateEmailToken(email, password);
        await transporter.sendMail({
            from: "codewithjehan@gmail.com",
            to: email,
            subject: "UDD | Portfolio of Excellence | Verify your email",
            text: "Click the link to reset your password!",
            html: `<a href="http://localhost:3000/verify-email?token=${token.token}">Verify email</a>`,
        });
        return CustomMessage("Email verification successfully sent.")
    }
    redirect("/")
}

const schema = z.object({
    email: z.string({
        message: "Email is required!"
    }).email("Email is invalid!").min(8),
    password: z.optional(z.string()),
    confirmPassword: z.optional(z.string()),
}).superRefine((account, ctx) => {
    if(!account.email.endsWith("@cdd.edu.ph")){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email must end with @cdd.edu.ph!",
        });
    }
    if(!isMatch(account.password!, account.confirmPassword!)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password do not match!",
        });
    }
})