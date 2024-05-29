import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CustomForm, Field, Submit } from "@/components/web/custom/custom-form"
import { CustomDialog } from "@/components/web/custom/custom-dialog"
import { DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { User2, CameraIcon } from "lucide-react"
// @actions
import { AvatarAction } from "@/server/avatar/action"
// @sessions
import { auth } from "@/auth"
import { GetUserById } from "@/lib/crud"
export async function ProfileAvatar(){
    const session = await auth()
    const user = await GetUserById(`${session?.user?.id}`)
    return(
        <div className="relative w-fit">
            <Avatar className="w-20 h-20">
                <AvatarImage src={`${user?.image}`} alt="Avatar" />
                <AvatarFallback>
                    <User2 className="w-10 h-10"/>
                </AvatarFallback>
            </Avatar>
            <CustomDialog
            title="Avatar"
            description="Personalize Your Online Identity: Effortlessly Customize Your Avatar to Reflect Your Unique Style and Personality"
            hasLogo={true}
            trigger={
                <CameraIcon className="w-8 h-8 absolute top-0 -right-2 bg-primary p-[0.4rem] text-primary-foreground rounded-full cursor-pointer"/>
            }>
                <CustomForm serverAction={AvatarAction}>
                        <Field type="hidden" name="id" value={`${user?.id}`}/>
                        <Field type="file" name="image" accept="image/jpeg, image/png"/>
                        <Submit className="w-full">Update</Submit>
                        <DialogClose asChild>
                            <Button variant="ghost" className="w-full">Cancel</Button>
                        </DialogClose>
                    </CustomForm>
            </CustomDialog>
        </div>
    )
}