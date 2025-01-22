'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";




export default function Abonnement() {

    const searchParams = useSearchParams();
    const prop = searchParams.get('prop');
    const abonnement = JSON.parse(prop || '{}');
    
    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Abonnement | {abonnement.title}
            </h1>
            <Separator className="my-5" />
            <div className="flex flex-row gap-2">
                <Card className="grow">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight">
                                Informations de la commande
                            </h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle>
                                <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
                                    Options
                                </h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup defaultValue={abonnement.options[0].description}>
                                    {
                                        abonnement.options.map((option: any, index: number) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem id={index.toString()} value={index.toString()} />
                                                <Label htmlFor={index.toString()}>{option.description}</Label>
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </CardContent>
                        </Card>
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle>
                                <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
                                    Informations personnelles
                                </h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div>
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input id="firstName" type="text" placeholder="Prénom" required className="w-[300px]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input id="lastName" type="text" placeholder="Nom" required className="w-[300px]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Adresse mail</Label>
                                        <Input id="email" type="email" placeholder="Adresse mail" required className="w-[300px]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="address">Adresse</Label>
                                        <Input id="address" type="text" placeholder="Adresse" required className="w-[300px]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Numéro de téléphone</Label>
                                        <Input id="phone" type="tel" placeholder="Numéro de téléphone" required className="w-[300px]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                                        <Input id="cardNumber" type="text" placeholder="Numéro de carte" required className="w-[300px]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="expiryDate">Date d'expiration</Label>
                                        <Input id="expiryDate" type="text" placeholder="MM/AA" required className="w-[300px]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input id="cvv" type="text" placeholder="CVV" required className="w-[300px]" />
                                    </div>
                                </form>  
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
                <Card className="grow-0">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight">
                                Récapitulatif de la commande
                            </h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Card className="p-4">
                            <ul>
                                <li>1 Abonnement {abonnement.title}
                                    <ul>
                                        <li>{abonnement.options[0].description}</li>
                                    </ul>
                                </li>
                            </ul>
                        </Card>
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link href="/confirmation">Payer et continuer</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}