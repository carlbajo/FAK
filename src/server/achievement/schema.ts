import z from "zod"
import { isEmpty } from "@/lib/helper";

export const AddAchievementSchema = z.object({
    name: z.string().min(2, "Achievement name is too short!").max(100, "Achievement name is too long!"),
    dateAchieved: z.string().date("Date achieved is required!").superRefine((dateAchieved, ctx) => {
        if(isEmpty(dateAchieved)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateAchieved) => {
        return new Date(dateAchieved);
    }),
    userId: z.string(),
    description: z.string().min(1, "Description is too short!").max(200, "Biography is too long!"),
});

export const UpdateAchievementSchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Achievement name is too short!").max(100, "Achievement name is too long!"),
    dateAchieved: z.string().date("Date achieved is required!").superRefine((dateAchieved, ctx) => {
        if(isEmpty(dateAchieved)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateAchieved) => {
        return new Date(dateAchieved);
    }),
    userId: z.string(),
    description: z.string().min(1, "Biography is too short!").max(200, "Biography is too long!"),
});

export const DeleteAchievementSchema = z.object({
    id: z.string({"message" : "Invalid format!"}),
    userId: z.string({"message" : "Invalid format!"}),
});