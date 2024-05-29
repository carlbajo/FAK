import { CustomDialog } from "@/components/web/custom/custom-dialog"
import { CustomForm, Field, FormControl, Submit, FTextarea } from "@/components/web/custom/custom-form"
import { AddAchievement } from "@/server/achievement/action"
import { PlusSquare } from "lucide-react"

export function AchievementAdd({id} : {id:string}){
    return(
        <CustomDialog
        title="Add achievement"
        description="add achievement here"
        hasLogo={false}
        trigger={
            <PlusSquare className="w-8 h-8 absolute top-8 right-8"/>
        }>
            <CustomForm serverAction={AddAchievement}>
                <Field label="Achievement name" type="text" name="name"/>
                <Field label="Date Achieved" type="date" name="dateAchieved"/>
                <FTextarea label="Description" name="description"/>
                <Submit className="w-full">Add</Submit>
                <Field type="hidden" name="userId" value={id}/>
            </CustomForm>
        </CustomDialog>
    )
}