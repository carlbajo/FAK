import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v4 } from "uuid";

export async function GetUserById( id: string ){
    const data = await prisma.user.findUnique({
        where: { id }, 
        include: { education: true, project: true, achievement: true, skill: true, course: true, preferences: true, scholarship: true  }  
    });
    return data;
};
export async function GetUserByEmail( email: string ){
    const data = await prisma.user.findUnique({ where: { email } });
    return data;
};

export async function GetEmailTokenByToken( token: string ){
    const data = await prisma.emailToken.findFirst({ where: { token } });
    return data;
};
export async function GetEmailTokenByEmail( email: string ){
    const data = await prisma.emailToken.findFirst({ where: { email } });
    return data;
};

export async function GetPasswordTokenByToken( token: string ){
    const data = await prisma.passwordToken.findFirst({ where: { token } });
    return data;
};
export async function GetPasswordTokenByEmail( email: string ){
    const data = await prisma.passwordToken.findFirst({ where: { email } });
    return data;
};

// Token Creation
export async function CreateEmailToken(email: string, password: string){
    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExist = await GetEmailTokenByEmail(email);
    if(tokenExist){
        await prisma.emailToken.delete({where: { id: tokenExist.id }});
    };

    const newToken = await prisma.emailToken.create({
        data: { email, token, expires, password }
    });

    return newToken;
};

export async function CreatePasswordToken(email: string){
    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExist = await GetPasswordTokenByEmail(email);
    if(tokenExist){
        await prisma.passwordToken.delete({where: { id: tokenExist.id }});
    };

    const newToken = await prisma.passwordToken.create({
        data: { email, token, expires }
    });
    return newToken;
};

// Some queries

export async function GetAvatarById(id: string){
    const avatar = await prisma.user.findUnique({
        where: { id },
        select: { image: true, firstName: true, lastName: true }
    });
    return avatar;
};

export async function GetPredefinedSkills(){
    const skills = await prisma.skill.findMany();
    return skills;
};

export async function GetPredefinedCourse(){
    const course = await prisma.course.findMany();
    return course;
};

export async function GetPredefinedScholarship(){
    const affiliations = await prisma.scholarship.findMany();
    return affiliations;
};

export async function GetTotalUsers(){
    const count = await prisma.user.aggregate({
        _count: true,
        where: { role: "USER" }
    })
    return count;
}

export async function GetManyUsers(userId?: string){
    const users = await prisma.user.findMany({
        where: {
            AND: [
                {role: "USER"},
                {NOT: { id: userId }}
            ]
        },
        
    })
    return users;
}

export async function GetFilteredUserByName(name: string = ""){
    const nameParts = name.split(" ")
    const filteredUsers = await prisma.user.findMany({
        where: {
            AND: [
                { firstName: { contains: nameParts[0] }},
                { lastName: { contains: nameParts[1] || "" } }
            ],
            role: "USER"
        }
    })
    return filteredUsers
}

export async function DeleteUserPermanently(id: string){
    await prisma.user.delete({
        where: { id }
    })
    revalidatePath("/admin")
}
