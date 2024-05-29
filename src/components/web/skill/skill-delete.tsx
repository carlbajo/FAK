"use server";

import prisma from "@/lib/prisma";
import { CustomMessage, FormatError } from "@/lib/utils";
import { SkillSchema } from "@/server/skill/schema";
import { revalidatePath } from "next/cache";
import { fromError } from "zod-validation-error";


export async function SkillDeleteAction(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    const formValid = SkillSchema.safeParse(rawFormData);
    if(!formValid.success){
        const error = FormatError(fromError(formValid.error).message);
        return { message:  error[0]};
    };
    const { id, userId } = formValid.data

    await prisma.user.update({
        where: {id: userId},
        data: {
            skill: {
                disconnect: { id }
            }
        }
    })
    revalidatePath("/")
    return CustomMessage("Skill Deleted")
}