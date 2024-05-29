import { CustomDialog } from "@/components/web/custom/custom-dialog"
import { CustomForm, Field, FormControl, Submit, FTextarea } from "@/components/web/custom/custom-form"
import { ProjectAddAction } from "@/server/project/action"
import { PlusSquare } from "lucide-react"

export function ProjectAddItem({id} : {id:string}){
    return(
        <CustomDialog
        title="Add project"
        description="add project here"
        hasLogo={false}
        trigger={
            <PlusSquare className="w-8 h-8 absolute top-8 right-8"/>
        }>
            <CustomForm serverAction={ProjectAddAction}>
                <Field label="Project name" type="text" name="name"/>
                <Field label="Date completed" type="date" name="dateCompleted"/>
                <FTextarea label="Description" name="description"/>
                <Submit className="w-full">Add</Submit>
                <Field type="hidden" name="userId" value={id}/>
            </CustomForm>
        </CustomDialog>
    )
}