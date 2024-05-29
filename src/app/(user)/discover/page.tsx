import { auth } from "@/auth"
import { CustomCard } from "@/components/web/custom/custom-card"
import { SearchUserDiscover } from "@/components/web/discover/search-user-discover"
import { GetManyUsers, GetUserById } from "@/lib/crud"
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User2 } from "lucide-react"
export default async function DiscoverPage(){
    const session = await auth()
    const users = await GetManyUsers(`${session?.user.id}`)
    return(
        <div className="w-full">
            <CustomCard
            title="Discover"
            description="new friends and has the same set of skill as yours">
                <div className="pt-6">
                    <SearchUserDiscover />
                    <div className="flex items-center gap-3 pt-4">
                        {users.map(item => (
                            <div className="w-[200px] flex gap-6 items-center">
                                <Avatar> 
                                    <AvatarImage src={`${item.image}`}/>
                                    <AvatarFallback>
                                        <User2 className="w-8 h-8"/>
                                    </AvatarFallback>
                                </Avatar>
                                <h6>{`${item.firstName} ${item.lastName}`}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </CustomCard>
        </div>
    )
}