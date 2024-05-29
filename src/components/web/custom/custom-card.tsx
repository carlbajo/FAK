import {
    Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TCard = {
    title: string,
    description?: string,
    children: React.ReactNode,
    className?: string,
    hasLogo?: boolean
}

export const CustomCard:React.FC<TCard> = ({
    title, description, className, hasLogo = false, children,
}) => (
    <Card className={cn(
        "space-y-1", className
    )}>
        <CardHeader className="bg-card rounded-lg text-card-foreground shadow-sm">
            <div className="flex gap-5">
                {hasLogo && (
                    <div className="relative w-10 h-10">
                        <Image src="/logo/udd.png" alt="udd" fill/>
                    </div>
                )}
                <div className="flex-1 space-y-1">
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </div>
            </div>
        </CardHeader>
        <CardContent className="bg-card rounded-lg text-card-foreground shadow-sm">
            {children}
        </CardContent>
    </Card>
);