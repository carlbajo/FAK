import z from "zod"
export const SkillSchema = z.object({
    userId: z.string(),
    id: z.string(),
});