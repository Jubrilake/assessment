'use client'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {  useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import Modal from "../../shared/Modal/Modal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
// import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isFetchAllSelectedRowModel: (SelectedRowModel: TData[]) => void;
    handleClick: any
}

export function DataTable<TData, TValue>({ columns, data, isFetchAllSelectedRowModel }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const naviagte = useRouter()
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });
    
  //selected data
  const fetchAllSelectedRowModel: TData[] = table.getSelectedRowModel().rows.map((item) => item.original);

  //passing the selected data to the parent component
  useEffect(() => {
    if (fetchAllSelectedRowModel) isFetchAllSelectedRowModel(fetchAllSelectedRowModel);
  }, [isFetchAllSelectedRowModel, fetchAllSelectedRowModel]);


  return (
    <div className="relative">
      {/* filter search */}
      <div className="flex justify-between items-center pb-6 pt-0.5 w-full ">
        <Input
          type="search"
          placeholder="Search"
          value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-sm h-9 bg-[#F4F5F5] text-blue-800 w-[300px] rounded-md"
        />
         <div className="flex gap-x-5">
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              type="button"
              className="text-sm  bg-[#F4F5F5] text-[#4D4D4D] font-bold border ml-auto"
            >
              <ListFilter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
        </div>

         </div>
        
      </div>

      {/* table  */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#F4F5F5] dark:bg-gray-800">
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
                  );
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between pt-6">
        <div className="w-fit">
          <div className="flex  items-center justify-center text-sm font-medium">
            Showing {table.getState().pagination.pageIndex + 1} -{" "}
            {table.getPageCount()} out of{" "}
            {table.getFilteredRowModel().rows.length} entries
          </div>

          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4 text-black" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 text-black"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4text-black" />
          </Button>
          <div className="px-4 space-x-3">
            {table.getPageOptions().map((item, index) => {
              const SN = item + 1;
              const pageIndex = table.getState().pagination.pageIndex;

              return (
                <Button
                  key={index}
                  onClick={() => table.setPageIndex(index)}
                  variant={index === pageIndex ? "default" : "outline"}
                  className="h-8 border-0 w-8 p-0"
                >
                  {SN}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only text-white">Go to next page</span>
            <ChevronRight className="h-4 w-4 text-black" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex text-black"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only ">Go to last page</span>
            <ChevronsRight className="h-4 w-4 text-black" />
          </Button>
        </div>
      </div>

     
    </div>
  );
}
