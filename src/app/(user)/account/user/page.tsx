import { auth } from "@/auth";
import { CustomCard } from "@/components/web/custom/custom-card";
import { CustomForm, Field, Submit, FormControl, FTextarea } from "@/components/web/custom/custom-form";
import { GetUserById } from "@/lib/crud";

import { UserUpdate, UserAddressUpdate } from "@/server/update-user/action";

export default async function UserUpdatePage(){
    const session = await auth()
    const user = await GetUserById(`${session?.user?.id}`)
    return(
        <div className="w-full space-y-4">
            <CustomCard
            title="Update your information"
            description="update your information here">
                <div className="pt-6">
                    <CustomForm serverAction={UserUpdate}>
                        <FormControl>
                            <Field label="First Name" type="text" name="firstName" defaultValue={user?.firstName}/>
                            <Field label="Last Name" type="text" name="lastName" defaultValue={user?.lastName}/>
                        </FormControl>
                        <FormControl>
                            <Field label="Middle Name" type="text" name="middleName" defaultValue={`${user?.middleName}`}/>
                            <Field label="Birthdate" type="date" name="birthdate" defaultValue={user?.birthdate?.toISOString().slice(0, 10)}/>
                        </FormControl>
                        <FormControl>
                            <Field label="Personal Email" type="text" name="personalEmail" defaultValue={`${user?.personalEmail}`}/>
                            <Field label="Phone Number" type="text" name="phoneNumber" defaultValue={`${user?.phoneNumber}`}/>
                        </FormControl>
                        <FTextarea label="Biography" name="bio" defaultValue={`${user?.bio}`}/>
                        <Field type="hidden" name="id" value={user?.id}/>
                        <Submit className="w-full">Update changes</Submit>
                    </CustomForm>
                </div>
            </CustomCard>
            <CustomCard
            title="Update your address"
            description="update your address here">
                <div className="pt-6">
                    <CustomForm serverAction={UserAddressUpdate}>
                        <FormControl>
                            <Field label="City" type="text" name="city" 
                            defaultValue={`${user?.city}`}/>
                            <Field label="Province" type="text" name="province" 
                            defaultValue={`${user?.province}`}/>
                            <Field label="Country" type="text" name="country" 
                            defaultValue={`${user?.country}`}/>
                        </FormControl>
                        <Field type="hidden" name="id" 
                            defaultValue={`${user?.id}`}/>
                        <Submit className="w-full">Update</Submit>
                    </CustomForm>
                </div>
            </CustomCard>   
        </div>
    )
}