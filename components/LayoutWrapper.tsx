'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

export default function LayoutWrapper({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  const pathname = usePathname();
  const isLuxStudio = pathname === '/lux-studio';

  const [isSidebarOpen, setIsSidebarOpen] = useState(isLuxStudio);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isLuxStudio);

  const hideChrome = pathname.startsWith('/view/') || pathname.startsWith('/menu/');
  const hideFooter = pathname === '/lux-studio';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <MobileHeader isOpen={isSidebarOpen} onMenuClick={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className={`pt-16 md:pt-0 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
        {children}
        {!hideFooter && footer}
      </div>
    </>
  );
}
