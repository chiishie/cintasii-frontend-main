import { toast } from "sonner";
import { useState, useEffect } from "react";

import DashboardLayout from "@/layout/dashboard-layout";
import { DataTable } from "@/components/data-table";
import useUnassignRole from "@/features/user-management/pages/hooks/use-unassign-role";
import { User } from "@/features/user-management/interfaces/responses/user";
import { useRoleUserTableCols } from "@/features/user-management/pages/hooks/use-role-user-table-cols";
import useGetUsersForRole from "@/features/user-management/pages/hooks/use-get-users-for-role";

const TutorList = () => {
  const { data, isLoading } = useGetUsersForRole(2);

  const {
    unassignRole,
    data: unAssignData,
    isError,
    isSuccess,
  } = useUnassignRole();

  const { columns } = useRoleUserTableCols(unassignRole, 2);

  const [tableData, setTableData] = useState<User[]>([]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    } else {
      setTableData([]);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast(unAssignData?.message);
    }

    if (isError) {
      toast.error("Role Unassignment Failed");
    }
  }, [unAssignData, isSuccess, isError]);

  return (
    <DashboardLayout title="User Management" subTitle="Tutor List">
      <DataTable columns={columns} data={tableData} isLoading={isLoading} />
    </DashboardLayout>
  );
};

export default TutorList;
