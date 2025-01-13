import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUser } from "@/db/index";

export default async function Home() {
  const user = await getUser();
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        SAE 5 : Jardin de Cocagne
      </h1>
      <Separator className="my-5" />
      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
          <CardDescription>Affichage pour le développement</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </>
  );
}
