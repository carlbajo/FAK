import z from 'zod'

export const UpdateUser = z.object({
    id: z.string(),
    firstName: z.string({message: "First name is invalid!"}).min(2, "First  name is too short!").max(50, "First name is too long!"),
    lastName: z.string({message: "Last name is invalid!"}).min(2, "Last  name is too short!").max(50, "Last name is too long!"),
    middleName: z.string().transform((value) => {
        if(value.trim().length > 0) 
            return value
        return ``;
    }).optional(),
    birthdate: z.string().transform((value) => {
        if (value.length === 0) {
            return null;
        }
        try {
            return new Date(value);
        } catch (error) {
            return null;
        }      
    }).optional().nullable(),
    personalEmail: z.string().transform((value) => {
        if(value.trim().length === 0) return ``
        if(value.trim().length > 0 && !value.includes("@")) return ``
        return value;
    }).optional().nullable(),
    phoneNumber: z.string().transform((value) => {
        if(value.trim().length > 0) 
            return value
        return ``;
    }).optional().nullable(),
    bio: z.string().transform((value) => {
        if(value.trim().length > 0) 
            return value
        return ``;
    }).optional().nullable(),
});

export const addressSchema = z.object({
    city: z.string().transform((value) => {
        if(value.trim().length > 0 && value.trim().length < 50) 
            return value
        return ``;
    }).optional().nullable(),
    country: z.string().transform((value) => {
        if(value.trim().length > 0 && value.trim().length < 50) 
            return value
        return ``;
    }).optional().nullable(),
    province: z.string().transform((value) => {
        if(value.trim().length > 0 && value.trim().length < 50) 
            return value
        return ``;
    }).optional().nullable(),
    id: z.string(),
})