'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

export default function LayoutWrapper({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const hideChrome = pathname.startsWith('/view/') || pathname.startsWith('/menu/');
  const hideSidebarFooter = pathname === '/lux-studio';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <MobileHeader isOpen={isSidebarOpen} onMenuClick={toggleSidebar} />
      {!hideSidebarFooter && (
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      )}
      <div className={`pt-16 md:pt-0 transition-all duration-300 ${hideSidebarFooter || isSidebarCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
        {children}
        {!hideSidebarFooter && footer}
      </div>
    </>
  );
}
