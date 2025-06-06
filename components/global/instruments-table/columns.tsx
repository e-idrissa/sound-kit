"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Loader2, MoreHorizontal, Pointer, PointerOff, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import ContentDialog from "@/components/global/content-dialog"
import Image from "next/image"
import { toggleInstrumentUsage } from "@/lib/actions/intrument.actions"
import { toast } from "sonner"
import { useState } from "react"

export const columns: ColumnDef<IInstrument>[] = [
  {
    accessorKey: "qrCodeId",
    header: ({ column }) => {
      const val = column.getFilterValue() as string
      return (
        <p className="hidden">{val}</p>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("qrCodeId") as string
      return <p className="capitalize ml-3 hidden">{val}</p>
    },
  },
  {
    accessorKey: "qrCodeImg",
    header: ({ column }) => {
      const val = column.getFilterValue() as string
      return (
        <p className="hidden">{val}</p>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("qrCodeImg") as string
      return <Image src={val} alt="qrCode" width={60} height={60} className="hidden md:block rounded border border-blue-400 m-2" />
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("category") as string
      return <p className="capitalize ml-3">{val}</p>
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden xl:flex items-center gap-1"
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("brand") as string
      return <p className="capitalize ml-3 hidden xl:block">{val}</p>
    },
  },
  {
    accessorKey: "warehouse",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden xl:flex items-center gap-1"
        >
          Warehouse
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("warehouse") as string
      return <p className="capitalize ml-3 hidden xl:block">{val}</p>
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden sm:flex items-center gap-1"
        >
          State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("state") as string
      const variant = val === "new" ? "var1" : val === "dated" ? "var2" : "var3"
      return <Badge variant={variant} className="capitalize ml-2 hidden sm:flex items-center">{val}</Badge>
    },
  },
  {
    accessorKey: "situation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden lg:flex items-center gap-1"
        >
          Situation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("situation") as string
      const variant = val === "rented" ? "var1" : "var2"
      return <Badge variant={variant} className="capitalize ml-2 hidden lg:block">{val}</Badge>
    },
  },
  {
    accessorKey: "inUse",
    header: () => {
      return <div className="hidden lg:block">Usage</div>
    },
    cell: ({ row }) => {
      const val = row.getValue("inUse") ? "In Use" : "Free"
      const variant = row.getValue("inUse") ? "var1" : "var2"
      return <Badge variant={variant} className="capitalize hidden lg:block">{val}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const instrument = row.original
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [loading, setLoading] = useState(false)
      const toggleUsage = async () => {
        setLoading(true)
        const { success } = await toggleInstrumentUsage(instrument.id)
        setLoading(false)
        if (!success) {
          toast.error("Failed to toggle instrument usage")
          return
        }

        toast.success("Instrument usage toggled successfully")
        return { success }
      }

      return (
        <div className="flex items-center w-fit lg:w-full">
          <Button size="sm" onClick={toggleUsage} disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              instrument.inUse ? (
                <PointerOff className="size-4" />
              ) : (
                <Pointer className="size-4" />
              )
            )}
          </Button>
          <ContentDialog isRental={false} instrument={row.original} user={instrument.user || undefined} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(instrument.id)}
              >
                Use Instrument
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={row.getValue("state") !== "damaged"}>
                <Settings2 className="size-4" /> Repair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
