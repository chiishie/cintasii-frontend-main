import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import DashboardLayout from "@/layout/dashboard-layout";
import { useEffect, useState } from "react";
import UserManagementSlider from "@/features/user-management/components/user-management-slider";
import useGetUsers from "./hooks/use-get-users";
import useSetUserRoles from "./hooks/use-set-user-roles";

import { toast } from "sonner";
import { useUserTableCols } from "./hooks/use-user-table-cols";
import useManageUser from "./hooks/use-manage-user";
import AlertDialog from "@/components/alert-dialog";

const UserList = () => {
  const {
    data: roleAssignmentdata,
    assignRole,
    isSuccess,
    isError,
  } = useSetUserRoles();

  const { deleteUser, userDeleteError, userDeleteSuccess } = useManageUser();

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const [tableData, setTableData] = useState([]);

  const handleDeleteUser = (user_id: string) => {
    setUserToDelete(user_id);
    setIsAlertOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setIsAlertOpen(false);
    }
  };

  const columns = useUserTableCols(assignRole, handleDeleteUser);

  const { data, isLoading } = useGetUsers();

  useEffect(() => {
    if (data) {
      setTableData(data);
    } else {
      setTableData([]);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast(roleAssignmentdata?.message);
    }

    if (isError) {
      toast.error("Role Assignment Failed");
    }
  }, [roleAssignmentdata, isSuccess, isError]);

  useEffect(() => {
    if (userDeleteSuccess) {
      toast("User Deleted Successfully");
    }

    if (userDeleteError) {
      toast.error("User Delete Failed");
    }
  }, [userDeleteSuccess, userDeleteError]);

  return (
    <DashboardLayout title="User Management" subTitle="System Users">
      <AlertDialog
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        cancelText="Cancel"
        actionText="Delete"
        onAction={confirmDeleteUser}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
      />
      <div className="flex justify-end my-4">
        <Button onClick={() => setIsSliderOpen(true)}>Create User</Button>
      </div>

      <DataTable columns={columns} data={tableData} isLoading={isLoading} />

      <UserManagementSlider isOpen={isSliderOpen} setIsOpen={setIsSliderOpen} />
    </DashboardLayout>
  );
};

export default UserList;
