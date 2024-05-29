import { CustomDialog } from "@/components/web/custom/custom-dialog"
import { CustomForm, Field, FormControl, Submit } from "@/components/web/custom/custom-form"
import { AddEducationAction } from "@/server/education/action"
import { PlusSquare } from "lucide-react"

export function EducationAdd({id} : {id:string}){
    return(
        <CustomDialog
        title="Add education"
        description="add education here"
        hasLogo={false}
        trigger={
            <PlusSquare className="w-8 h-8 absolute top-8 right-8"/>
        }>
            <CustomForm serverAction={AddEducationAction}>
                <Field label="School name" type="text" name="name"/>
                <FormControl>
                    <Field label="Started Date" type="date" name="dateStarted"/>
                    <Field label="Ended Date" type="date" name="dateEnded"/>
                </FormControl>
                <Submit className="w-full">Add</Submit>
                <Field type="hidden" name="userId" value={id}/>
            </CustomForm>
        </CustomDialog>
    )
}