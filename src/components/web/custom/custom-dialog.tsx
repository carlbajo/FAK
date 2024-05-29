import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose
} from "@/components/ui/dialog";
import Image from "next/image";

type TCustomDialog = {
    title: string,
    description?: string,
    trigger: React.ReactNode,
    hasLogo: boolean,
    children: React.ReactNode,
}

export const CustomDialog:React.FC<TCustomDialog> = ({
    title, description, trigger, hasLogo = false, children,
}) => (
    <Dialog>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent className="bg-none">
            <DialogHeader>
                <div className="flex gap-5">
                    {hasLogo && (
                        <div className="relative w-10 h-10">
                            <Image src="/logo/udd.png" alt="udd" fill/>
                        </div>
                    )}
                    <div className="flex-1 space-y-1">
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </div>
                </div>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
);

