"use client";
// Types
import type { Prop as IInput } from "@/components/ui/input";
// States
import { useFormState, useFormStatus } from "react-dom";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCheck, MessageCircleWarning } from "lucide-react";
// Utilities
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../../ui/use-toast";

type TForm = {
    serverAction: (
        state: { message: string },
        formData: FormData 
    ) => Promise<{ message: string }>,
    children: React.ReactNode,
    className?: string,
}

const initialState = { message: "" }

export const CustomForm:React.FC<TForm> = ({
    serverAction, children, className
}) => {
    const [state, formAction] = useFormState(serverAction, initialState);
    return(
        <form action={formAction}>
            <div className={cn(
                "space-y-4", className
            )}>
                {children}
            </div>
            {state && (
                <FormMessage message={state.message}/>
            )}
        </form>
    );
};

export const FormControl = ({
     className, children 
    } : {
     className?: string, children: React.ReactNode 
    }) => {
    return(
        <div className={cn(
            "flex flex-col md:flex-row gap-4", className
        )}>{ children }</div>
    );
};

interface ISubmit extends React.ComponentPropsWithoutRef<typeof Button>{}

export const Submit = ({children, ...props}: ISubmit) => {
    const { pending } = useFormStatus();
    return(
        <Button disabled={pending} {...props}>
            { pending && <Loader2 className="w-8 h-8 animate-spin"/> }
            { !pending && children }
        </Button>
    );
};

interface IField extends React.ComponentPropsWithoutRef<typeof Input>{
    label?: string,
}
export const Field = ({label, ...props}: IField) => {
    return(
        <div className="grid gap-3 w-full">
            {label && <Label>{ label }</Label>}
            <Input {...props}/>
        </div>
    );
};

interface ITextarea extends React.ComponentPropsWithoutRef<typeof Textarea>{
    label?: string,
}
export const FTextarea = ({label, ...props}: ITextarea) => {
    return(
        <div className="grid gap-3 w-full">
            {label && <Label>{ label }</Label>}
            <Textarea {...props}/>
        </div>
    );
};

export const FormMessage = ({ message }: { message: string }) => {
    return(
        <div className="w-full py-1">
            {message.endsWith(".") && (
                <span className="text-emerald-500 text-center block bg-emerald-500/20">
                    { message }
                </span>
            )}
            {message.endsWith("!") && (
                <span className="text-desctructive-foreground bg-red-500/20 text-center block p-1 rounded">
                    { message }
                </span>
            )}
        </div>
    );
};

export const FNavigate = ({
    href, text
}: {
    href: string, text: string
}) => {
    const router = useRouter();
    return(
        <div className="w-full">
            <Button type="button" variant="link" size="link" onClick={() => router.push(href)} asChild>
                { text }
            </Button>
        </div>
    );
};

interface InterfaceInputParams extends IInput {
    parameter: string,
};
export const FieldParam = ({ parameter, ...props }: InterfaceInputParams) => {
    const params = useSearchParams();
    const value = params.get(parameter);
    if(value){
        return(
            <input type="hidden" value={value} {...props}/>
        );
    }
};