import z from "zod";
import { isEmpty } from "@/lib/helper";

export const ProjectAdd = z.object({
    name: z.string({message: "Project name is required!"}).min(2, "Project name is too short!").max(100, "Project name is too long!"),
    dateCompleted: z.string().date("Date completed is required!").superRefine((dateCompleted, ctx) => {
        if(isEmpty(dateCompleted)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date completed is required!"
            });
        }
    }).transform((dateCompleted) => {
        return new Date(dateCompleted);
    }),
    userId: z.string(),
    description: z.string({message: "Description is required!"}).min(1, "Description is too short!").max(200, "Biography is too long!"),
});

export const ProjectUpdate = z.object({
    id: z.string(),
    name: z.string().min(2, "Project name is too short!").max(100, "Project name is too long!"),
    dateCompleted: z.string().date("Date completed is required!").superRefine((dateCompleted, ctx) => {
        if(isEmpty(dateCompleted)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateCompleted) => {
        return new Date(dateCompleted);
    }),
    userId: z.string(),
    description: z.string().min(1, "Biography is too short!").max(200, "Biography is too long!"),
});

export const ProjectDelete = z.object({
    id: z.string({"message" : "Invalid format!"}),
    userId: z.string({"message" : "Invalid format!"}),
});