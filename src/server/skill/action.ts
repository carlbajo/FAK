"use server";
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import { SkillSchema } from "./schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function SkillAddAction(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    const formValid = SkillSchema.safeParse(rawFormData);
    if(!formValid.success){
        const error = FormatError(fromError(formValid.error).message);
        return { message:  error[0]};
    };
    const { userId, id } = formValid.data;
    await prisma.user.update({
        where: { id: userId },
        data: {
            skill: {
                connect: { id },
            }
        }
    });
    revalidatePath("/");
    return { message: "Skill added successfully." };
}