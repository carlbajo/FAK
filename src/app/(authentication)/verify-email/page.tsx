import { CustomCard } from "@/components/web/custom/custom-card";
import { CustomForm, Field, Submit, FNavigate, FieldParam } from "@/components/web/custom/custom-form"; 
import { VerifyEmail } from "@/server/verify-email/action";

export default function VerifyEmailPage(){
   return(
    <div className="w-[480px]">
       <CustomCard
        title="PEXEL | VERIFY EMAIL"
        description="Verify your Universidad de Dagupan's email!"
        className="w-[480px]">
               <CustomForm serverAction={ VerifyEmail }>
                   <Field label="Email" type="email" name="email" placeholder="School email"/>
                   <FieldParam parameter="token" name="token"/>
                   <Submit className="w-full">Verify</Submit>
                   <FNavigate text="Already verified?" href="/signin"/>
               </CustomForm>
       </CustomCard>
    </div>
   );
};