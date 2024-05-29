import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/web/custom/theme"
import type { Metadata } from "next"
import "@/app/globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
    title: {
        template: "%s | PEXEL",
        default: "Authentication | Pexel"
    }
}

export default function AuthLayout({
    children
}:Readonly<{
    children: React.ReactNode
}>){
    return (
        <html lang="en">
            <body className={cn(
                GeistSans.className,
                "bg-background/80 text-foreground",
            )}>
                <ThemeProvider>
                    <div className="relative w-full min-h-screen flex justify-center md:items-center">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}