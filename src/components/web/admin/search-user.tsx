"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Field } from "../custom/custom-form"
import  { Search, RefreshCcw } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function SearchUser(){
    const [search, setSearch] = useState<string>()
    const searchParams = useSearchParams()
    const {replace, push} = useRouter()
    const pathname = usePathname()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleClick = () => {
        const params = new URLSearchParams(searchParams)
        params.set("query", search as string)
        replace(`${pathname}?${params}`)
    }
    return(
        <div className="flex items-center gap-3 my-2">
            <Field type="text" onChange={handleSearch}/>
            <Button size="icon" asChild onClick={handleClick}>
                <Search className="w-6 h-6"/>
            </Button>
            <Button size="icon" asChild onClick={() => push(`${pathname}?query=`)}>
                <RefreshCcw className="w-6 h-6"/>
            </Button>
        </div>
    )
}