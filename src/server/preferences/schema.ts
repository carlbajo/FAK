import z from "zod";

const option = ["PUBLIC", "PRIVATE", "HIDDEN"]

export const schema = z.object({
    userId: z.string(),
    privacy: z.string().superRefine((privacy, ctx) => {
        if(!option.includes(privacy)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Privacy is not valid!"
            })
        }
    }),
    isAlumni: z.string().transform(value => value === "true" ? true : false),
    schoolId: z.string().nullable(),
})