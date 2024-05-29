"use server"

import { GetUserById } from "@/lib/crud";
import prisma from "@/lib/prisma";
import { CustomMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import z from "zod"

export async function DeleteUserAdmin(
    state: { message: string },
    formData: FormData,
){
    const rawFormData = Object.fromEntries(formData);
    const schema = z.object({
        id: z.string(),
    })
    const valid = schema.safeParse(rawFormData)
    if(!valid.success){
        return CustomMessage("Something went wrong!")
    }
    const user = await GetUserById(valid.data.id)
    if(!user){
        return CustomMessage("User do not exist!")
    }
    await prisma.user.delete({
        where: {id: valid.data.id}
    })
    revalidatePath("/admin")
    return CustomMessage("Deleted Successfully")
}