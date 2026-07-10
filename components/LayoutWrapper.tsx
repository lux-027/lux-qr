'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

export default function LayoutWrapper({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const hideChrome = pathname.startsWith('/view/') || pathname.startsWith('/menu/');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <MobileHeader isOpen={isSidebarOpen} onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="md:ml-64 pt-16 md:pt-0">
        {children}
        {footer}
      </div>
    </>
  );
}
