import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import logoCocagne from "@/public/images/cocagne-vert.png"
import { Separator } from "@/components/ui/separator"

export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>
            <div className="flex flex-row gap-2 items-center">
                <Image src={logoCocagne} alt={"Réseau Cocagne"} width={50} height={50}></Image>
                Réseau Cocagne
            </div>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  