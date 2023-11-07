import Sidebar from '@/components/sideBar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

interface Props {
  children: React.ReactNode;
}

export default function InitialLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='  h-screen'>
      <ToastContainer
          position="top-right"
          autoClose={800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
      <div className="flex">
        <div className=' z-10'>
          <Sidebar/>
        </div>
        
        <div className="w-full overflow-y-auto z-0 mx-auto lg:m-1 m-3
    bg-[#071422]">
          {children}
        </div>
      </div>
    </main>
  )
}