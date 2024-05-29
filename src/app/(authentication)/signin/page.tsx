import { CustomCard } from "@/components/web/custom/custom-card";
import { CustomForm, Field, Submit, FNavigate } from "@/components/web/custom/custom-form";
import { Signin } from "@/server/signin/action";

export default function PageSignin(){
    return(
        <div className="w-[480px]">
            <CustomCard 
            title="PEXEL | SIGNIN"
            description="Gain exclusive access to our campus's professional networking platform. Connect with alumni, and showcase achievements in one hub."
            hasLogo={true}>
                <div className="pt-6">
                    <CustomForm serverAction={ Signin }>
                            <Field label="Email" type="email" name="email" placeholder="School email"/>
                            <Field label="Password" type="password" name="password" placeholder="Password"/>
                            <Submit className="w-full">Signin</Submit>
                            <div>
                                <FNavigate text="Forgot Password?" href="/password-forgot"/>
                                <FNavigate text="Do not have an account?" href="/signup"/>
                            </div>
                    </CustomForm>
                </div>
            </CustomCard>
        </div>
    );
};