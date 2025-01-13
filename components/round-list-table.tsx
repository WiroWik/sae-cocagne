import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRound } from "@/db";

interface RoundListTableProps {
    round: Awaited<ReturnType<typeof getRound>>
}

export function RoundListTable({ round }: RoundListTableProps) {
    
    return (
        <Table>
            <TableCaption>Points de dépôt</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Jour de préparation</TableHead>
                    <TableHead>Jour de livraison</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {round.map((r) => (
                <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.preparationDay.getDay()}</TableCell>
                    <TableCell>{r.deliveryDay.getDay()}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    );  
};