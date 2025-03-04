import { cn } from "@/lib/utils";
import { isEmpty } from "@/lib/helper";
import { FC } from "react";
import { Label } from "./label";

export interface Prop extends React.ComponentPropsWithoutRef<"input">{
    label?: string
}

export const Input:FC<Prop> = ({className, ...props}) => (
    <input className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", 
        className
    )} {...props}/>
);
Input.displayName = "Input";
