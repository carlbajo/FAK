import { Lock, Unlock, EyeOff } from "lucide-react"
export function ProfilePrivacy({privacy}: {privacy: string}){
    switch(privacy){
        case "PUBLIC":
            return(
                <div className="flex items-center gap-2">
                    <Unlock className="w-5 h-5"/>
                    <span>{privacy}</span>
                </div>
            )
        case "PRIVATE":
            return(
                <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5"/>
                    <span>{privacy}</span>
                </div>
            )
        case "HIDDEN":
            return(
                <div className="flex items-center gap-2">
                    <EyeOff className="w-5 h-5"/>
                    <span>{privacy}</span>
                </div>
            )
    };
}