import { Card, CardContent } from "@/components/ui/card"
import { GetTotalUsers } from "@/lib/crud"
export async function TotalUserCard(){
    const totalUsers = await GetTotalUsers()
    return(
        <div className="w-[300px]">
            <Card className="bg-card text-card-foreground">
                <CardContent className="pt-4 space-x-2">
                    <span className="text-6xl">{totalUsers._count}</span>
                    <span>total users are registered!</span>
                </CardContent>
            </Card>
        </div>
    )
}