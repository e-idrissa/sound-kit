"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ContentDialog from "@/components/global/content-dialog"

export const columns: ColumnDef<IInstrument>[] = [
  {
    accessorKey: "qrCodeId",
    header: "Id",
  },
  {
    accessorKey: "categoryId",
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
      const val = row.getValue("categoryId") as string
      return <p className="capitalize ml-3">{val}</p>
    },
  },
  {
    accessorKey: "brandId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" hidden lg:flex items-center"
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("brandId") as string
      return <p className="hidden lg:flex items-center capitalize ml-3">{val}</p>
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

      return (
        <div className="flex items-center w-fit">
          <ContentDialog isRental={false} instrument={row.original} />
        </div>
      )
    },
  },
]
