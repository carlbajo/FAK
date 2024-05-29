import { TotalUserCard } from "@/components/web/admin/total-users-card"
import { UserTable } from "@/components/web/admin/user-table"
export default async function AdminPage({searchParams}: {searchParams: {query: string}}){
    return(
        <div className="space-y-4">
            <TotalUserCard />
            <UserTable searchParams={searchParams}/>
        </div>
    )
}