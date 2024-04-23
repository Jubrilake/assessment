'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { StudentDataType } from "./students.model";
import { Trash2, Edit2 } from "lucide-react";

export function ColumnWrapper() {
  const navigation = useRouter();    
  
  const handleClick = (lastName: string) => {
    // Handle click logic here
  };

  const columns: ColumnDef<StudentDataType>[] = [
    {
      id: "select",
      header: ({ table }: any) => (       
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "lastName",
      header: () => {
        return (
          <h1 className="font-Satoshi_Bold text-black">Last Name</h1>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: () => {
        return (
          <h1 className="font-Satoshi_Bold text-black">First Name</h1>
        );
      },
    },
    {
      accessorKey: "dateOfBirth",
      header: () => {
        return (
          <h1 className="font-Satoshi_Bold text-black">Date Of Birth</h1>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: () => {
        return (
          <h1 className="font-Satoshi_Bold text-black">Phone Number</h1>
        );
      },
    },
    {
      accessorKey: "nin",
      header: () => {
        return (
          <h1 className="font-Satoshi_Bold text-black">NIN</h1>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Actions",
      header: () => {
        return (
          <h1 className="font-Satoshi_Bold text-black">Actions</h1>
        );
      },
      cell: ({ row }: any) => {
        return (
          <div className="flex">
            {/* edit */}
            <Button onClick={() => handleClick(row.original.lastName)} variant='ghost' className="rounded-full p-3">
             <Edit2 className="text-green-600 w-5 h-5" />
            </Button>
            {/* delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost"> <Trash2 className="text-red-600 w-5 h-5"  /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Post</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this post: {row.original.lastName}? You cannot undo this action 
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => console.log('Delete')}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return columns;
}
