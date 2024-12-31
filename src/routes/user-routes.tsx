import UserList from "../features/user-management/pages/user-list/user-list";
import StudentManagement from "../features/user-management/pages/student-list/student-list";
import TutorList from "../features/user-management/pages/tutor-list/tutor-list";

export const userManagementRoutes = [
  {
    path: "students",
    element: <StudentManagement />,
  },
  {
    path: "tutors",
    element: <TutorList />,
  },
  {
    path: "all",
    element: <UserList />,
  },
];
