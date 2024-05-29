import { CustomCard } from "@/components/web/custom/custom-card"
import { CustomForm, Field, Submit, FNavigate, FormControl } from "@/components/web/custom/custom-form"
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { GetPredefinedCourse } from "@/lib/crud"
// Action
import { Signup } from "@/server/signup/action"

export default async function PageSignup(){
    const courses = await GetPredefinedCourse()
    return(
        <div className="w-[500px]">
            <CustomCard 
            title="PEXEL | SIGNUP"
            description="Gain exclusive access to our campus's professional networking platform. Connect with alumni, and showcase achievements in one hub."
            hasLogo={true}>
               <div className="pt-6">
                    <CustomForm serverAction={ Signup }>
                        <FormControl>
                            <Field label="First name" type="text" name="firstName"/>
                            <Field label="Last name" type="text" name="lastName"/>
                        </FormControl>
                        <Field label="Email" type="email" name="email"/>
                        <FormControl>
                            <Field label="Password" type="password" name="password"/>
                            <Field label="Confirm Password" type="password" name="confirmPassword"/>
                        </FormControl>
                        {/* Select Course options */}
                        <div className="grid gap-3 w-full">
                                <Label>Course</Label>
                                <Select name="courseId">
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map(item => (
                                            <SelectItem value={item.id}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        <Submit className="w-full">Signup</Submit>
                        <div>
                            <FNavigate text="Do have an account?" href="/signin"/>
                        </div>
                    </CustomForm>
               </div>
            </CustomCard>
        </div>
    )
}