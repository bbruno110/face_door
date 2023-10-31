import Sidebar from '@/components/sideBar';
import React from 'react';


interface Props {
  children: React.ReactNode;
}

export default function InitialLayout({children}: {children: React.ReactNode}) {
  return (
    <main  className="flex">
      <div className=' z-10'>
        <Sidebar/>
      </div>
            <div className="w-full overflow-y-auto h-auto z-0 mx-auto lg:m-1 m-3
         bg-[#071422]">
              {children}
            </div>
    </main>
  )
}