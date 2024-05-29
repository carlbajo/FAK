import { CustomDialog } from "@/components/web/custom/custom-dialog"
import { PlusSquare } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { CustomForm, Submit, Field } from "../custom/custom-form"
import { GetPredefinedSkills } from "@/lib/crud"
import { SkillAddAction } from "@/server/skill/action"
export async function SkillAdd({userId}: {userId: string}){
    const skills = await GetPredefinedSkills()
    return(
        <div className="w-[480px]">
            <CustomDialog
            title="Add skill"
            description="create or choose option"
            hasLogo={false}
            trigger={
                <PlusSquare className="w-8 h-8 absolute top-8 right-8"/>
            }>
                <div>
                    <CustomForm serverAction={SkillAddAction}>
                        <Select name="id">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Skill options" />
                            </SelectTrigger>
                            <SelectContent>
                                {skills.map(item => (
                                    <>
                                        <SelectItem value={item.id}>{item.name}</SelectItem>
                                    </>
                                ))}
                            </SelectContent>
                        </Select>
                        <Field type="hidden" name="userId" defaultValue={userId}/>
                        <Submit className="w-full">Add</Submit>
                    </CustomForm>
                </div>
            </CustomDialog>
        </div>
    )
}