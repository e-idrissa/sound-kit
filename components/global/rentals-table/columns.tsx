"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ContentDialog from "@/components/global/content-dialog"
import { useState } from "react"
import { deleteRental } from "@/lib/actions/rental.actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const columns: ColumnDef<IRental>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "qrCodeId",
    header: () => {
      return <div className="hidden">QR Code</div>
    },
    cell: ({ row }) => {
      const val = row.getValue("qrCodeId") as string
      return <p className="hidden">{val}</p>
    },
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
      const variant = val === "active" ? "var1"
        : val === "closed" ? "var2"
          : val === "pending" ? "var4"
            : "var5"
      return <Badge variant={variant} className="capitalize ml-2  hidden lg:block">{val}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rental = row.original
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [loading, setLoading] = useState(false)
      const handleDeletion = async () => {
        setLoading(true)
        const { success, message } = await deleteRental(rental.rentalId)
        setLoading(false)
        if (success) {
          toast.success(message)
          router.refresh()
        } else {
          toast.error(message)
        }
      }
      return (
        <div className="flex items-center w-10 md:w-20">
          <ContentDialog isRental={true} rental={rental} />
          <Button variant="ghost" size="sm" onClick={handleDeletion} disabled={loading || rental.status === "active"}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4 text-red-500 hover:text-red-500!" />
            )}
          </Button>
        </div>
      )
    },
  },
]
