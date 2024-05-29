"use client";
import { ThemeProvider as NextThemes } from "next-themes"
import { Sun, Moon, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";

export function ThemeProvider({
    children
}: { children: React.ReactNode }) {
    return(
        <NextThemes 
            attribute="class" 
            enableSystem disableTransitionOnChange>
                {children}
        </NextThemes>
    );
}

export function ToggleTheme(){
    const { resolvedTheme, setTheme } = useTheme();
    const [ isMounted, setIsMounted ] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return <Toggle disabled><Loader2 className="w-6 h-6 animate-spin"/></Toggle>
    };
    const dark = resolvedTheme === "dark";
    return(
        <Toggle variant="outline" onClick={() => {
            setTheme(`${dark ? "light" : "dark"}`);
        }}>
            {dark && <Sun className="w-6 h-6"/>}
            {!dark && <Moon className="w-6 h-6"/>}
        </Toggle>
    );
};