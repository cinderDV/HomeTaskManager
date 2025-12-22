// src/components/Layout.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TabBar } from "antd-mobile";
import {
  AppOutline,           // Para Home
  UnorderedListOutline, // Para Tasks
  ClockCircleOutline,   // Para History
  HistogramOutline,     // Para Stats
  UserOutline,          // Para User
} from "antd-mobile-icons";
import "@/styles/layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

const tabs = [
    {
      key: "/",
      title: "Home",
      icon: <AppOutline />,
    },
    {
      key: "/tasks",
      title: "Tasks",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/history",
      title: "History",
      icon: <ClockCircleOutline />,
    },
    {
      key: "/stats",
      title: "Stats",
      icon: <HistogramOutline />,
    },
    {
      key: "/user",
      title: "User",
      icon: <UserOutline />,
    },
  ];
  const activeIndex = tabs.findIndex(tab => tab.key === location.pathname);
  const totalTabs = tabs.length;

  return (
   <div className="layout">
      <div className="layout-body">
        <Outlet />
      </div>
      <div className="layout-bottom">
        <div className="tabbar-container">
          {/* Indicador flotante con cálculo exacto */}
          <div 
            className="floating-indicator"
            style={{
              left: `calc(8px + (100% - 16px) / ${totalTabs} * ${activeIndex})`,
              width: `calc((100% - 16px) / ${totalTabs})`
            }}
          />
          
          <TabBar 
            className="custom-tabbar"
            activeKey={location.pathname} 
            onChange={(value) => navigate(value)}
          >
            {tabs.map((item) => (
              <TabBar.Item 
                key={item.key} 
                icon={item.icon} 
                title={item.title} 
              />
            ))}
          </TabBar>
        </div>
      </div>
    </div>
  );
};

export default Layout;
