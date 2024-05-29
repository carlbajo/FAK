import { CustomCard } from "@/components/web/custom/custom-card"
import { CustomDialog } from "@/components/web/custom/custom-dialog"
import { CustomForm, Field, FormControl, Submit, FTextarea } from "@/components/web/custom/custom-form"
import { List } from "../custom/custom-list"
import { ProjectAddItem } from "./project-add"
import { auth } from "@/auth"
import { GetUserById } from "@/lib/crud"
import { MoreHorizontal, Trash } from "lucide-react"
import { ProjectUpdateAction, ProjectDeleteAction } from "@/server/project/action"
export async function ProjectCard(){
    const session = await auth()
    const user = await GetUserById(`${session?.user?.id}`)
    return(
        <CustomCard
        title="Project"
        description="This is your project">
            <ProjectAddItem id={user?.id!}/>
            {user?.project.length !== 0 && (
                <div>
                    {user?.project.map((item => (
                        <List key={item.id} name={item.name} dateStarted={item.dateCompleted} description={item.description}>
                            <CustomDialog
                            title="Update Item"
                            description="Update item here"
                            hasLogo={false}
                            trigger={ 
                                <MoreHorizontal className="w-6 h-6 absolute top-4 right-4"/>
                            }>
                                {/* Update */}
                                <CustomForm serverAction={ProjectUpdateAction}>
                                    <Field
                                    label="Project name"
                                    type="text" 
                                    name="name" 
                                    defaultValue={item.name}/>
                                    <Field 
                                    label="Date completed"
                                    type="date" 
                                    name="dateCompleted" 
                                    defaultValue={item.dateCompleted.toISOString().slice(0, 10)}/>
                                    <FTextarea label="Description" name="description" defaultValue={item.description}/>
                                    <Submit className="w-full">Update</Submit>
                                    <Field type="hidden" name="id" value={item.id}/>
                                    <Field type="hidden" name="userId" value={user.id}/>
                                </CustomForm>
                                <div className="absolute right-16 top-4 opacity-60">
                                    <CustomForm serverAction={ProjectDeleteAction} className="space-y-0">
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
            {user?.project.length === 0 && (
                <p className="opacity-70">Project not yet added!</p>
            )}
        </CustomCard>
    )
}