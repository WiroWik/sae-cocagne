import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRound } from "@/db";
import { RoundDepotListTable } from "./round-depot-list-table";

interface RoundListTableProps {
    round: Awaited<ReturnType<typeof getRound>>
}

function formatDate(date: Date) : string {
    return date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear().toString().slice(-2);
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
                    <TableCell>{formatDate(r.preparationDay)}</TableCell>
                    <TableCell>{formatDate(r.deliveryDay)}</TableCell>
                    <TableCell>
                        <RoundDepotListTable roundId={r.id} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    );  
};