import { CustomCard } from "@/components/web/custom/custom-card"
import { ProfileAvatar } from "@/components/web/profile/profile-avatar"
// @user-data
import { auth } from "@/auth"
import { GetUserById } from "@/lib/crud"
// @utilities
import { Capitalize } from "@/lib/utils"
// @component
import { ProfilePrivacy } from "./profile-privacy"
// CTA
import { Button } from "@/components/ui/button"
import { MapIcon, QuoteIcon, CakeIcon, AtSign, Phone } from "lucide-react"
import Link from "next/link"

export async function ProfileCard(){
    const session = await auth()
    const user = await GetUserById(`${session?.user?.id}`)
    return(
        <div className="w-full relative">
            <CustomCard
            title="Profile"
            description="This is your profile">
                <div className="flex gap-8 pt-6">
                    <ProfileAvatar />
                    {/* Content */}
                    <div className="space-y-2">
                        {/* name */}
                        <h1 className="text-3xl">
                            {`${user?.firstName} ${user?.lastName}`}
                        </h1>
                        {/* course */}
                        <p>{Capitalize(user?.course.name!)}</p>
                        {/* gmail */}
                        <p>{`${user?.email}`}</p>
                        {/* school id */}
                        {user?.schoolId && (
                            <p>{`${user.schoolId}`}</p>
                        )}
                        {/* Privacy */}
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                            {user?.preferences && (
                                <ProfilePrivacy privacy={user.preferences.privacy} />
                            )}
                            {/* CTA */}
                            <Button size="sm" asChild>
                                <Link href="/account/user">Edit profile</Link>
                            </Button>
                        </div>
                        {/* Address */}
                        {user?.city && (
                            <div className="flex items-center gap-2">
                                <MapIcon className="w-4 h-4"/>
                                <span>
                                    {user?.city && (
                                        <span>{`${user.city}`}</span>
                                    )}
                                    {user?.province && (
                                        <span>{`, ${user.province}`}</span>
                                    )}
                                    {user?.country && (
                                        <span>{`, ${user.country}`}</span>
                                    )}
                                </span>
                            </div>
                        )}
                        {/* Birthdate */}
                        {user?.birthdate && (
                            <div className="flex items-center gap-2">
                                <CakeIcon className="w-4 h-4"/>
                                {user?.birthdate && (
                                    <span>{`${user.birthdate.toISOString().slice(0, 10)}`}</span>
                                )}
                            </div>
                        )}
                        {/* personal email and phone */}
                        {user?.personalEmail && (
                            <div className="flex items-center gap-2">
                                <AtSign className="w-4 h-4"/>
                                {user?.personalEmail && (
                                    <span>{`${user.personalEmail}`}</span>
                                )}
                            </div>
                        )}
                        {user?.phoneNumber && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4"/>
                                {user?.phoneNumber && (
                                    <span>{`${user.phoneNumber}`}</span>
                                )}
                            </div>
                        )}
                         {/* Biography */}
                         {user?.bio && (
                            <div className="flex items-center gap-2">
                                <QuoteIcon className="w-4 h-4"/>
                                {user?.bio && (
                                    <span>{`${user.bio}`}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CustomCard>
        </div>
    )
}