import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import TopNav from './TopNav';

export default function EmployeeLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 72 : 240;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <EmployeeSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300">
        <TopNav setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
