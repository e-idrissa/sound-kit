"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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

export const columns: ColumnDef<IRental>[] = [
  {
    accessorKey: "qrCodeId",
    header: "Id",
  },
  {
    accessorKey: "rentalReason",
    header: () => {
      return <div>Reason</div>
    },
    cell: ({ row }) => {
      const val = row.getValue("rentalReason") as string
      return <p className="capitalize">{val}</p>
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Starts At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("startDate") as Date
      return <p className="ml-3">{val.toDateString()}</p>
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden lg:flex items-center gap-1"
        >
          Ends At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("endDate") as Date
      return <p className="ml-3  hidden lg:block">{val.toDateString()}</p>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" hidden lg:flex items-center gap-1"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("status") as string
      const variant = val === "approved" ? "var1"
        : val === "pending" ? "var2"
          : val === "closed" ? "var4"
            : "var5"
      return <Badge variant={variant} className="capitalize ml-2  hidden lg:block">{val}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div className="flex items-center w-10 md:w-20">
          <div className="hidden md:block">
            <ContentDialog isRental={true} rental={row.original} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <div className="flex items-center md:hidden">
                <ContentDialog isRental={true} rental={row.original} isGhost={true} />
              </div>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Edit Rental
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Delete Rental</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
