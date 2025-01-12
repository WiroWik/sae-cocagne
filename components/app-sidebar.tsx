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
import { Truck, Calendar} from "lucide-react"

export function AppSidebar() {
    const sidebarItems = [
        {
            title: "Tournées",
            url: "#",
            icon: Truck
        },
        {
            title: "Calendriers de livraison",
            url: "#",
            icon: Calendar
        }
    ]
    return (
      <Sidebar>
        <SidebarHeader>
            <div className="flex flex-row gap-2 items-center">
                <Image src={logoCocagne} alt={"Réseau Cocagne"} width={80} height={80}></Image>
                Réseau Cocagne
            </div>
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
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
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
  