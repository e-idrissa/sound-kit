"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Info, Search } from "lucide-react"
import Link from "next/link"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="bg-background mt-8 w-full p-8 border-input border rounded-lg space-y-4">

      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between w-full">
        <div className="flex items-center gap-4">
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href="/my-instruments">
              <span>My Intruments</span>
            </Link>
          </Button>
        </div>
        <div className="flex items-center border border-input rounded-md px-2 w-64 justify-end">
          <Search className="size-4 text-muted-foreground" />
          <Input
            placeholder="Filter intruments..."
            value={(table.getColumn("qrCodeId")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("qrCodeId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-12"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="nth-1:w-0 nth-2:w-0 md:nth-2:w-20">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center w-full gap-2 p-4">
                    <Info className="size-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No results.</p>
                    <p className="text-muted-foreground -mt-2">Add data to view them here.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
