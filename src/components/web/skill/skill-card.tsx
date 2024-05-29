import { auth } from "@/auth"
import { CustomCard } from "@/components/web/custom/custom-card"
import { SkillAdd } from "@/components/web/skill/skill-add"
import { GetUserById } from "@/lib/crud"
import { CustomForm, Submit, Field } from "../custom/custom-form"
import { SkillDeleteAction } from "./skill-delete"
import { Trash } from "lucide-react"

export async function SkillCard(){
    const session = await auth()
    const user = await GetUserById(`${session?.user.id}`)
    return(
        <CustomCard
        title="Skill"
        description="This is your skill">
            <SkillAdd userId={`${user?.id}`}/>
            <div>
                {user?.skill?.length! > 0 && (
                    <>
                        {user?.skill.map(item => (
                            <span 
                            className="bg-accent text-accent-foreground p-1 px-2 mx-2 rounded inline-flex items-center gap-2">
                                {item.name}
                                <CustomForm serverAction={SkillDeleteAction}>
                                    <input type="hidden" name="id" defaultValue={item.id}/>
                                    <input type="hidden" name="userId" defaultValue={user.id}/>
                                    <Submit className="flex items-center justify-center" variant="ghost" size="none" asChild>
                                        <Trash className="w-5 h-5" />
                                    </Submit>
                                </CustomForm>
                            </span>
                        ))}
                    </>
                )}
                {user?.skill?.length! === 0 && (
                    <p>No skill yet added!</p>
                )}
            </div>
        </CustomCard>
    )
}