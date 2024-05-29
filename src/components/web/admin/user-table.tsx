import { GetFilteredUserByName, GetManyUsers } from "@/lib/crud";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Card } from "@/components/ui/card";
import { SearchUser } from "./search-user";
import { DeleteUserAdmin } from "@/server/admin/delete-user";

import { CustomForm, Field, Submit } from "../custom/custom-form";
import { LockUserAdmin } from "@/server/admin/lock-user";

export async function UserTable({searchParams}: {searchParams: {query: string}}){
    const query = searchParams || ""
    const filteredUser = await GetFilteredUserByName(query.query)
    return(
        <div>
            <SearchUser />
            <Card className="bg-card text-card-foreground">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Alumni/Studying</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUser.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
                        <TableCell>{`${user.email}`}</TableCell>
                        <TableCell>{`${user.createdAt.toISOString().slice(0, 10)}`}</TableCell>
                        <TableCell className="text-right">{`${user.isAlumni}`}</TableCell>
                        <TableCell className="flex justify-center gap-2">
                            {/* Delete user */}
                            <CustomForm serverAction={DeleteUserAdmin}>
                                <Field type="hidden" name="id" value={user.id}/>
                                <Submit variant="destructive" size="xsm">Delete</Submit>
                            </CustomForm>
                            {/* Lock User */}
                            <CustomForm serverAction={LockUserAdmin}>
                                <Field type="hidden" name="id" value={user.id}/>
                                <Submit variant="secondary" size="xsm">
                                    {user.lock === true ? "Unlock" : "Lock"}
                                </Submit>
                            </CustomForm>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>    
                </Table>
            </Card>
        </div>
    )
}