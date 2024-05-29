import { CustomCard } from "@/components/web/custom/custom-card"
import { CustomDialog } from "@/components/web/custom/custom-dialog"
import { CustomForm, Field, FormControl, Submit } from "@/components/web/custom/custom-form"
import { List } from "../custom/custom-list"
import { EducationAdd } from "./education-add"
import { auth } from "@/auth"
import { GetUserById } from "@/lib/crud"
import { MoreHorizontal, Trash } from "lucide-react"
import { Delete, Update } from "@/server/education/action"
export async function EducationCard(){
    const session = await auth()
    const user = await GetUserById(`${session?.user?.id}`)
    return(
        <CustomCard
        title="Education"
        description="This is your education">
            <EducationAdd id={user?.id!}/>
            {user?.education.length !== 0 && (
                <div>
                    {user?.education.map((item => (
                        <List key={item.id} name={item.name} dateStarted={item.dateStarted}>
                            <CustomDialog
                            title="Update Item"
                            description="Update item here"
                            hasLogo={false}
                            trigger={ 
                                <MoreHorizontal className="w-6 h-6 absolute top-4 right-4"/>
                            }>
                                {/* Update */}
                                <CustomForm serverAction={Update}>
                                    <Field
                                    label="School name"
                                    type="text" 
                                    name="name" 
                                    defaultValue={item.name}/>
                                    <FormControl>
                                    <Field 
                                    label="Date Started"
                                    type="date" 
                                    name="dateStarted" 
                                    defaultValue={item.dateStarted.toISOString().slice(0, 10)}/>
                                    <Field 
                                    label="Date Ended"
                                    type="date" 
                                    name="dateEnded" 
                                    defaultValue={item.dateEnded?.toISOString().slice(0, 10)}/>
                                    </FormControl>
                                    <Submit className="w-full">Update</Submit>
                                    <Field type="hidden" name="id" value={item.id}/>
                                    <Field type="hidden" name="userId" value={user.id}/>
                                </CustomForm>
                                <div className="absolute right-16 top-4 opacity-60">
                                    <CustomForm serverAction={Delete} className="space-y-0">
                                        <Field type="hidden" name="id" value={item.id}/>
                                        <Field type="hidden" name="userId" value={user.id}/>
                                        <Submit size="trigger" variant="destructive" asChild>
                                            <Trash className="w-5 h-5"/>
                                        </Submit>
                                    </CustomForm>
                                </div>
                            </CustomDialog>
                        </List>
                    )))}
                </div>
            )}
            {user?.education.length === 0 && (
                <p>Education is empty yet!</p>
            )}
        </CustomCard>
    )
}