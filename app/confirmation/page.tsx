'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";




export default function Confirmation() {

    
    return (
        <>
            <div className="flex flex-col gap-2 justify-center items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Merci pour votre commande</h1>
                <Button className="w-[300px]" asChild>
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
            </div>
        </>
    );
}