"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Loader2, Pointer, PointerOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ContentDialog from "@/components/global/content-dialog"
import Image from "next/image"
import { useState } from "react"
import { toggleInstrumentUsage } from "@/lib/actions/intrument.actions"
import { toast } from "sonner"

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
      return <Image src={val} alt="qrCode" width={60} height={60} className="hidden md:block rounded border border-blue-400" />
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
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hidden lg:flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("state") as string
      const variant = val === "new" ? "var1" : val === "dated" ? "var2" : "var3"
      return <Badge variant={variant} className="hidden lg:flex items-center capitalize ml-2">{val}</Badge>
    },
  },
  {
    accessorKey: "situation",
    header: () => {
      return <div className="hidden sm:flex items-center">Situation</div>
    },
    cell: ({ row }) => {
      const val = row.getValue("situation") as string
      const variant = val === "rented" ? "var1" : "var2"
      return <Badge variant={variant} className="capitalize hidden sm:flex items-center">{val}</Badge>
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
        <div className="flex items-center w-fit">
          <Button size="sm" onClick={toggleUsage} disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              instrument.inUse ? (
                <PointerOff className="size-4"/>
              ) : (
                <Pointer className="size-4"/>
              )
            )}
          </Button>
          <ContentDialog isRental={false} instrument={row.original} user={instrument.user || undefined} />
        </div>
      )
    },
  },
]
