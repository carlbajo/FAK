// AuthJS
import { auth } from "@/auth";
import { GetPredefinedCourse, GetPredefinedScholarship, GetUserById } from "@/lib/crud";

import { CustomCard } from "@/components/web/custom/custom-card";
import { CustomForm, Field, Submit, FormControl } from "@/components/web/custom/custom-form";
import { AccountAction } from "@/server/account";
import { PreferencesAction } from "@/server/preferences/action";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";

export async function AccountCard(){
    const session = await auth();
    const user = await GetUserById(`${session?.user?.id}`);
    const scholarship = await GetPredefinedScholarship()
    const course = await GetPredefinedCourse()
    return(
        <div className="space-y-6">
            <CustomCard
            title="Account Management"
            description="Account Management description">
                <div className="pt-6">
                    <CustomForm serverAction={AccountAction}>
                        <Field label="Email" type="email" name="email" defaultValue={user?.email}/>
                        <Field label="Password" type="password" name="password" placeholder="Password"/>
                        <Field label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm password"/>
                        <Submit className="w-full">Update</Submit>
                    </CustomForm>
                </div>
            </CustomCard>
            <CustomCard
            title="Preferences"
            description="enter a correct data">
                <div className="pt-6">
                    <CustomForm serverAction={PreferencesAction}>
                        <FormControl className="w-full">
                            <div className="grid gap-3 w-full">
                                <Label>Select privacy</Label>
                                <Select name="privacy" defaultValue={`${user?.preferences?.privacy}`}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={user?.preferences?.privacy} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PUBLIC">PUBLIC</SelectItem>
                                        <SelectItem value="PRIVATE">PRIVATE</SelectItem>
                                        <SelectItem value="HIDDEN">HIDDEN</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label>Select course</Label>
                                <Select name="courseId" defaultValue={`${user?.course.id}`}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={user?.course.name} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {course.map(item => (
                                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div className="grid gap-4 w-full">
                                <Label>Are you alumni?</Label>
                                    <Select name="isAlumni" defaultValue={`${user?.isAlumni}`}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={`${user?.isAlumni}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">YES</SelectItem>
                                            <SelectItem value="false">NO</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </div>
                            <Field label="School ID" type="text" name="schoolId" defaultValue={`${user?.schoolId}`}/>
                        </FormControl>
                        <Submit className="w-full">Update</Submit>
                        <Field type="hidden" name="userId" value={user?.id}/>
                    </CustomForm>
                </div>
            </CustomCard>
        </div>
    );
};