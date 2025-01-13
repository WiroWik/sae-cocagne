import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUser } from "@/db";

interface UserListTableProps {
    user: Awaited<ReturnType<typeof getUser>>
}

export function UserListTable({ user }: UserListTableProps) {
    
    return (
        <Table>
            <TableCaption>Utilisateurs</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead></TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Surname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone number</TableHead>
                <TableHead>Bank details</TableHead>
                <TableHead>Password</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {user.map((u) => (
                <TableRow key={u.id}>
                    <TableCell><Badge>{u.role}</Badge></TableCell>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.surname}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phoneNumber}</TableCell>
                    <TableCell>{u.bankDetails}</TableCell>
                    <TableCell>{u.password}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    );  
};