import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { desc } from "drizzle-orm";
import { Apple, Citrus, Egg, Grape, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { url } from "inspector";

export default function Abonnements() {
    const subscriptionList = [
        {
            url: "panier-legumes-bio",
            title: "Panier légumes Bio",
            options: [
                {
                    icon: Users,
                    description: "Panier familial"
                },
                {
                    icon: User,
                    description: "Panier simple"
                },
            ]
        },
        {
            url: "panier-fruits-bio",
            title: "Panier fruits Bio",
            options: [
                {
                    icon: Apple,
                    description: "Panier n°1 à 13,50 €"
                },
                {
                    icon: Citrus,
                    description: "Panier n°2 à 16,50 €"
                },
                {
                    icon: Grape,
                    description: "Panier n°3 à 22,50 €"
                }
            ]
        },
        {
            url: "oeufs-paturage-bio",
            title: "Œufs de pâturage Bio",
            options: [
                {
                    icon: Egg,
                    description: "1 boite de 6 œufs / semaine"
                },
                {
                    icon: Egg,
                    description: "2 boites de 6 œufs / semaine"
                },
                {
                    icon: Egg,
                    description: "3 boites de 6 œufs / semaine"
                }
                
            ]
        },


    ]
    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Abonnements
            </h1>
            <Separator className="my-5" />
            <div className="flex flex-col w-100 h-[700px] justify-center items-center">
                <div className="flex flex-row gap-5">
                    {
                        subscriptionList.map((subscription, index) => (
                            <Card className="p-4 w-[400px]" key={index} title={subscription.title}>
                                <CardHeader>
                                    <CardTitle>
                                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                            {subscription.title}
                                        </h1>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-100">
                                    <Card className="h-[400px]">
                                        <CardHeader>
                                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                                Options disponibles
                                            </h4>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col gap-2">
                                                {
                                                    subscription.options.map((option, index) => (
                                                        <Card className="p-4" key={index}>
                                                            <div className="flex items-center gap-2">
                                                                <option.icon />
                                                                <span>{option.description}</span>
                                                            </div>                       
                                                        </Card>
                                                    ))
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                    
                                </CardContent>
                                <CardFooter> 
                                    <Button asChild className="w-full">
                                        <Link href={{
                                                pathname: `/abonnements/${subscription.url}`,
                                                query: { prop: JSON.stringify(subscription) }
                                            }}> 
                                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                                Souscrire
                                            </h4>
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </>
    );
}