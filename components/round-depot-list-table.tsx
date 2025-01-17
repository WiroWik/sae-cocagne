import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRoundDepots } from "@/db";

export async function RoundDepotListTable({ roundId }: { roundId: number }) {
    const roundDepot = await getRoundDepots(roundId);
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Ordre</TableHead>
                    <TableHead>ID</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {roundDepot.map((rd) => (
                    <TableRow key={rd.id}>
                        <TableCell>{rd.order}</TableCell>
                        <TableCell>{rd.depotId}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );  
};