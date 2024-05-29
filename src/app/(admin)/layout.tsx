import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/web/custom/web-parts";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/web/custom/theme";

export const metadata: Metadata = {};

export default function AuthenticationLayout({
    children
}: { children: React.ReactNode }){
    return(
        <html lang="en">
            <body className={ GeistSans.className }>
                <ThemeProvider>
                    <div className="max-w-6xl w-full mx-auto">
                        <Header />
                        <div className="p-4">
                            { children }
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};