import z from "zod";
import { isEmpty } from "@/lib/helper";

export const AddEducationSchema = z.object({
    name: z.string().min(3, "School name is short!"),
    dateStarted: z.string().date("Date started is required!").superRefine((dateStarted, ctx) => {
    if(isEmpty(dateStarted)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date started is required!"
        });
    }
    }).transform((dateStarted) => {
        return new Date(dateStarted);
    }),
    dateEnded: z.string().transform((dateEnded) => {
        if (dateEnded.length === 0) {
            return null;
        }
        try {
            return new Date(dateEnded);
            } catch (error) {
            return null;
            }      
    }).optional().nullable(),
    userId: z.string(),
    });

export const UpdateEducationSchema = z.object({
    id: z.string(),
    name: z.string().min(3, "School name is short!"),
    dateStarted: z.string().date("Date started is required!").superRefine((dateStarted, ctx) => {
        if(isEmpty(dateStarted)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateStarted) => {
        return new Date(dateStarted);
    }),
    dateEnded: z.string().transform((dateEnded) => {
        if (dateEnded.length === 0) {
            return null;
        }
        try {
            return new Date(dateEnded);
          } catch (error) {
            return null;
          }      
    }).optional().nullable(),
    userId: z.string(),
});

export const DeleteEducationSchema = z.object({
    id: z.string({"message" : "Invalid format!"}),
    userId: z.string({"message" : "Invalid format!"}),
});