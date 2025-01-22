
import { Separator } from "@/components/ui/separator";
import accueilImage from "@/public/images/accueil-image.jpg"
import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        SAE 5 : Jardin de Cocagne
      </h1>
      <Separator className="my-5" />
      <div className="flex flex-col gap-10 justify-center items-center">
        <div className="grow">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            Bienvenue sur le site de la SAE 5 : Développement avancé
          </h1>
        </div>
        <Image src={accueilImage} alt={"Réseau Cocagne"} height={500} className="grow-0"/>
      </div>
    </>
  );
}
