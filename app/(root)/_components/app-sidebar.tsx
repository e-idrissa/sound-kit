"use client"

import { ChevronsUpDown, Clapperboard, LogOut, User2 } from "lucide-react"

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
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { adminLinks, defaultLinks } from "@/constants/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SidebarFooterProps, SideBarHeaderProps, SidebarMenuProps } from "@/lib/types/props"
import { usePathname } from "next/navigation"
import { logout } from "@/lib/actions/auth.actions"

const Header = ({ state, isMobile }: SideBarHeaderProps) => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={cn(state === "collapsed" && !isMobile ? "bg-blue-700 p-0 flex items-center justify-center h-8 rounded" : "bg-accent py-1 px-2 rounded-md", "")}>
          <Link href={"/"} className="flex items-center">
            <Clapperboard className={cn(state === "collapsed" && !isMobile ? "size-4" : "size-10 p-2 rounded-md bg-blue-700", "text-white")} />
            {state === "expanded" || isMobile ? (
              <div className="flex flex-col ml-2">
                <h3 className="font-medium text-lg">SoundKit</h3>
                <span className="text-sm text-muted-foreground capitalize">eglise arche</span>
              </div>
            ) : null}
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

const Footer = ({ user, state, isMobile }: SidebarFooterProps) => {
  const handleLogout = async () => {
    await logout()
  }

  return (
    <SidebarFooter className="mb-[0px]">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={cn(state === "expanded" || isMobile ? "h-12 gap-2" : "bg-blue-700 text-white hover:bg-blue-700/80 justify-center p-2 rounded", "flex items-center text-sm cursor-pointer")}>
                <User2 className={cn(state === "expanded" || isMobile ? "size-8 p-2 bg-blue-700 rounded text-white" : "size-4")} />
                <div className={cn(state === "expanded" || isMobile ? "flex items-center justify-between flex-1" : "hidden")}>
                  <div className={("flex flex-col")}>
                    <p className="text-sm line-clamp-1">{user.firstname + " " + user.lastname}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{user.email}</p>
                  </div>
                  <ChevronsUpDown className="size-4 ml-auto text-muted-foreground" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem asChild>
                <Link href={"/profile"}>
                  <User2 />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

const Menu = ({ links, pathname }: SidebarMenuProps) => {
  return (
    <SidebarMenu>
      {links.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === item.url}>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export const AppSidebar = ({ user }: { user: IUser }) => {
  const pathname = usePathname()

  const { state, isMobile } = useSidebar()
  return (
    <Sidebar variant="floating" collapsible="icon" className="h-full">
      <Header state={state} isMobile={isMobile} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Menu links={defaultLinks} pathname={pathname} />
          </SidebarGroupContent>
        </SidebarGroup>
        {user.role === "ADMIN" && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <Menu links={adminLinks} pathname={pathname} />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <Footer user={user} state={state} isMobile={isMobile} />
    </Sidebar>
  )
}
