import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import logoCocagne from "@/public/images/cocagne-vert.png"
import { Separator } from "@/components/ui/separator"
import { Truck, Calendar, BookOpen, LeafyGreen } from "lucide-react"
import Link from "next/link"

export function AppSidebar() {
    const sidebarItems = [
        {
            title: "Tournées",
            url: "/tournees",
            icon: Truck
        },
        {
            title: "Calendriers de livraison",
            url: "/calendrier",
            icon: Calendar
        },
        {
            title: "Documentation de l'API",
            url: "/api-doc",
            icon: BookOpen
        },
        {
            title: "Abonnements",
            url: "/abonnements",
            icon: LeafyGreen
        }
    ]
    return (
      <Sidebar>
        <SidebarHeader>
            <Link href="/">
                <div className="flex flex-row gap-2 items-center">
                    <Image src={logoCocagne} alt={"Réseau Cocagne"} width={80} height={80}></Image>
                    Réseau Cocagne
                </div>
            </Link>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  