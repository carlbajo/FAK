import { CustomCard } from "@/components/web/custom/custom-card";
import { CustomForm, Field, Submit, FNavigate } from "@/components/web/custom/custom-form";
import { PasswordForgot } from "@/server/password-forgot/action";

export default function PageForgotPasword(){
   return(
        <div className="w-[480px]">
            <CustomCard
            title="PEXEL | FORGOT PASSWORD"
            description="Remember your password at all times!"
            hasLogo={true}>
                    <div className="pt-6">
                        <CustomForm serverAction={ PasswordForgot }>
                            <Field label="Email" type="email" name="email"/>
                            <Submit className="w-full">Send password reset link</Submit>
                            <FNavigate text="Go back to signin?" href="/signin"/>
                        </CustomForm>
                    </div>
            </CustomCard>
        </div>
   );
};