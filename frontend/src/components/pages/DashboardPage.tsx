import DashboardModal from "../modules/dashboard/DashboardModal";
import Sidebar from "../modules/dashboard/Sidebar";
import Content from "../modules/dashboard/Content";
import { useUser } from "@/hooks/useUser";

const DashboardPage = () => {
  const { userName } = useUser();
  return (
    <div>
      <DashboardModal />
      <div className="flex">
        <Sidebar />
        <Content userName={userName!} />
      </div>
    </div>
  );
};

export default DashboardPage;
