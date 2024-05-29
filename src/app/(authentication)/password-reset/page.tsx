import { CustomCard } from "@/components/web/custom/custom-card";
import { CustomForm, Field, Submit, FNavigate, FieldParam } from "@/components/web/custom/custom-form";
import { PasswordReset } from "@/server/password-reset/action";
export default function PagePasswordReset(){
   return(
        <div className="w-[480px]">
            <CustomCard
            title="PEXEL | RESET PASSWORD"
            description="Remember your password at all times">
                    <div className="pt-6">
                        <CustomForm serverAction={ PasswordReset }>
                            <Field label="New Password" type="password" name="password" placeholder="Password"/>
                            <Field label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm Password"/>
                            <FieldParam parameter="token" name="token"/>
                            <Submit className="w-full">Reset</Submit>
                            <FNavigate text="Go back to signin?" href="/signin"/>
                        </CustomForm>
                    </div>
            </CustomCard>
        </div>
   );
};