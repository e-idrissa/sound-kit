"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Settings2, Trash2 } from "lucide-react"
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
import { InstrumentDialog } from "../instrument-dialog"

export const adminColumns: ColumnDef<IInstrument>[] = [
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
          className="hidden xl:flex items-center gap-1"
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("brandId") as string
      return <p className="capitalize ml-3 hidden xl:block">{val}</p>
    },
  },
  {
    accessorKey: "local",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden xl:flex items-center gap-1"
        >
          Local
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("local") as string
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

      return (
        <div className="flex items-center w-20">
          <ContentDialog isRental={false} instrument={row.original} isAdmin={true} className="hidden sm:block" />
          <InstrumentDialog type={"edit"} instrument={row.original} />
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
              <DropdownMenuItem asChild>
                <div>
                  <Trash2 className="size-4"/>
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div >
      )
    },
  },
]
