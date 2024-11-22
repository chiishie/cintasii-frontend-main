import { useCurrentUser } from "../../../../common/hooks/useCurrentUser";

const Dashboard = () => {
  const { data: user } = useCurrentUser();

  return (
    <div>
      Dashboard
      <p>{user?.first_name}</p>
      <p>{user?.last_name}</p>
      <p>{user?.email}</p>
      <p>{user?.roles.map((role) => role.name).join(", ")}</p>
    </div>
  );
};

export default Dashboard;
