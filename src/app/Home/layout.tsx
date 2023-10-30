import Sidebar from '@/components/sideBar';
import React from 'react';


interface Props {
  children: React.ReactNode;
}

export default function InitialLayout({children}: {children: React.ReactNode}) {
  return (
    <main  className="flex">
      <Sidebar/>
            <div className="grow basis-52">
              {children}
            </div>
    </main>
  )
}