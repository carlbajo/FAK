"use server";
import { GetUserById } from "@/lib/crud";
import { UpdateUser, addressSchema } from "./schema";
import { CustomMessage, FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function UserUpdate(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    const formIsValid = UpdateUser.safeParse(rawFormData);
    if(!formIsValid.success){
        const error = FormatError(fromError(formIsValid.error).message);
        return { message:  error[0]};
    };
    const { id, ...data } = formIsValid.data;
    const user = GetUserById(id);
    if(!user){
        return { message: "Account do not exist!" } ;
    }
    try {
        await prisma.user.update({
            where: { id },
            data: { ...data }
        });
    }catch(err){
        return { message: "Something went wrong!" }
    }
    revalidatePath("/");
    return  { message: "Update Successfully." };
}

export async function UserAddressUpdate(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    const valid = addressSchema.safeParse(rawFormData);
    if(!valid.success){
        const error = FormatError(fromError(valid.error).message);
        return { message:  error[0]};
    };
    const { id, ...form } = valid.data
    try{
        await prisma.user.update({
            where: { id },
            data: { ...form }
        })
        revalidatePath("/")
    }catch(error){
        throw new Error("Something went wrong!")
    }
    return CustomMessage("Updated Successfully.")
}