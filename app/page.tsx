import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser, getDepotPoint } from "@/db/index";

export default async function Home() {
  const user = await getUser();
  const depotPoint = await getDepotPoint();
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
          <Tabs defaultValue="users" className="w-full">
            <TabsList>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="depot-point">Points de dépôt</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
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
            </TabsContent>
            <TabsContent value="depot-point">
              <Table>
                <TableCaption>Points de dépôt</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Adress</TableHead>
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
                      <TableCell>{dp.adress}</TableCell>
                      <TableCell>{dp.contact}</TableCell>
                      <TableCell>{dp.openTime.toString()}</TableCell>
                      <TableCell>{dp.closeTime.toString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
          
        </CardContent>
      </Card>
    </>
  );
}
