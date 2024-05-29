import z from "zod";
import { isMatch, isEmpty } from "@/lib/helper";

export const VerifyemailSchema = z.object({
    email: z.string(),
    token: z.string({
        invalid_type_error: "Token format is invalid!"
    }),
});
