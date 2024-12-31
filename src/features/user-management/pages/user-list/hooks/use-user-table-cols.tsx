import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../../../components/ui/button";
import { User } from "../../../interfaces/responses/user";

export const useUserTableCols = (
  assignRole: (params: { role_id: number; user_id: string }) => void,
  deleteUser: (user_id: string) => void
) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding: true,
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const userId = row.original.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  assignRole({
                    role_id: 1,
                    user_id: userId,
                  });
                }}
              >
                Make as a Student
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  assignRole({
                    role_id: 2,
                    user_id: userId,
                  });
                }}
              >
                Make as a Tutor
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  deleteUser(userId);
                }}
              >
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
