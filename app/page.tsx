import { DepotPointListTable } from "@/components/depot-point-list-table";
import { RoundListTable } from "@/components/round-list-table";
import { UserListTable } from "@/components/user-list-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser, getDepotPoint, getRound } from "@/db/index";

export default async function Home() {
  const user = await getUser();
  const depotPoint = await getDepotPoint();
  const round = await getRound();
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
              <TabsTrigger value="rounds">Tournées</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <UserListTable user={user} />
            </TabsContent>
            <TabsContent value="depot-point">
              <DepotPointListTable depotPoint={depotPoint} />
            </TabsContent>
            <TabsContent value="rounds">
              <RoundListTable round={round} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
