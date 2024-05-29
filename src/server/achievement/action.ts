"use server";
// HELPERS
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import { AddAchievementSchema, UpdateAchievementSchema, DeleteAchievementSchema } from "./schema";
// Database
import { GetUserById } from "@/lib/crud";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AddAchievement(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    const isValid = AddAchievementSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { userId, name, dateAchieved, description } = isValid.data;
    // Check if user exist!
    const userExist = await GetUserById(userId);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Add the data
    await prisma.achievement.create({
        data: { userId, name, dateAchieved, description }
    })
    revalidatePath("/");
    return { message: "Achievement added successfully." };

};

export async function UpdateAchievement(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // Check if form is valid!
    const isValid = UpdateAchievementSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { id, userId, name, dateAchieved, description } = isValid.data;
    // Check if user exist!
    const userExist = await GetUserById(userId);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Update the data
    try{
        await prisma.achievement.update({
            where: { id },
            data: { name, dateAchieved, description, userId }
        });
        revalidatePath("/");
    }catch(error){
        console.log(error)
    }
    return { message: "Achievement updated successfully." };

};

export async function Delete(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // Check if form is valid!
    const isValid = DeleteAchievementSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { id, userId } = isValid.data;
    // Check if user exist!
    const userExist = await GetUserById(userId);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Delete the data
    await prisma.achievement.delete({
        where: { id, userId },
    });
    revalidatePath("/");
    return { message: "Achievement deleted successfully." };

};
