"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Info, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: () => {
      return <div>Name</div>
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <p className="capitalize">{name}</p>
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return <div className="hidden lg:block">Email</div>
    },
    cell: ({ row }) => {
      const val = row.getValue("email") as string
      return <p className="hidden lg:block">{val}</p>
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden lg:flex items-center gap-1"
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("role") as string
      const variant = val === "ADMIN" ? "var1"
        : val === "TECHNICIAN" ? "var2"
          : "var5"
      return <Badge variant={variant} className="capitalize ml-2  hidden lg:block">{val}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden md:flex items-center gap-1"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const val = row.getValue("status") as string
      const variant = val === "ACTIVE" ? "var1"
        : "var5"
      return <Badge variant={variant} className="hidden md:block capitalize ml-2">{val}</Badge>
    },
  },
  {
    accessorKey: "instruments",
    header: () => {
      return <div className="hidden lg:block">Instruments</div>
    },
    cell: ({ row }) => {
      const instruments = row.getValue("instruments") as IInstrument[]
      return <p className="hidden lg:block">{instruments.length}</p>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ConfirmDeletion = () => {
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }

      return (
        <div className="flex items-center w-10">
          <Button asChild variant={"ghost"} size="icon">
            <Link href={`/users/${row.original.id}`}>
              <Info className="size-4"/>
            </Link>
          </Button>
          <ConfirmDeletion />
        </div>
      )
    },
  },
]
