"use server";

import { CustomMessage } from "@/lib/utils";
import { schema } from "./schema";
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function PreferencesAction(
    state: { message: string },
    formData: FormData,
){
    const rawFormData = Object.fromEntries(formData);
    const valid = schema.safeParse(rawFormData)
    if(!valid.success){
        const error = FormatError(fromError(valid.error).message);
        return { message:  error[0]};
    }
    const { userId, privacy, isAlumni, schoolId  } = valid.data
    const prefer = privacy as "PUBLIC" | "PRIVATE" | "HIDDEN"
    try{
        await prisma.user.update({
            where: { id: userId },
            data: { preferences: {
                update: { privacy: prefer }
            }, isAlumni, schoolId }
        })
        revalidatePath("/")
    }catch(error){
        console.log(error)
        throw new Error("Something went wrong!")
    }
    return CustomMessage("Update successfully.")
}