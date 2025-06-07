import { GalleryVerticalEnd, Guitar, Home, Package, Package2, ScrollText, Settings, Users2 } from "lucide-react"


export const defaultLinks = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Instruments",
    url: "/my-instruments",
    icon: Guitar,
  },
  {
    title: "My Rentals",
    url: "/my-rentals",
    icon: ScrollText,
  },
]

export const adminLinks = [
  {
    title: "Manage Instruments",
    url: "/instruments",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Manage Rentals",
    url: "/rentals",
    icon: Package2,
  },
  {
    title: "Magnage Users",
    url: "/users",
    icon: Users2,
  },
  {
    title: "Loans",
    url: "/loans",
    icon: Package,
  },
  {
    title: "System Settings",
    url: "/settings",
    icon: Settings,
  },
]