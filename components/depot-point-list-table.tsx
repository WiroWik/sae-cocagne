import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDepotPoint } from "@/db";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DepotPointListTableProps {
    depotPoint: Awaited<ReturnType<typeof getDepotPoint>>
}

export function DepotPointListTable({ depotPoint }: DepotPointListTableProps) {
    
    return (
        <ScrollArea>
            <Table>
                <TableCaption>Points de dépôt</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Coordinates</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Open time</TableHead>
                    <TableHead>Close time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {depotPoint.map((dp) => (
                    <TableRow key={dp.id}>
                        <TableCell>{dp.id}</TableCell>
                        <TableCell>{dp.name}</TableCell>
                        <TableCell>{dp.coordinates}</TableCell>
                        <TableCell>{dp.contact}</TableCell>
                        <TableCell>{dp.openTime.toString()}</TableCell>
                        <TableCell>{dp.closeTime.toString()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );  
};