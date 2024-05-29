import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
export function CustomSignout(){
    return(
        <form action={async() => {
            "use server"
            await signOut({
                redirectTo: "/signin"
            });
            redirect("/signin")
        }}>
            <Button className="flex items-center gap-2" variant="default" type="submit" asChild>
                <LogOut className="w-5 h-5"/>
                <span>Signout</span>
            </Button>
        </form>
    );
};