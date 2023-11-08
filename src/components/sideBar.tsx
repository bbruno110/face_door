"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import * as IconMd from 'react-icons/md';
import * as IconHi from "react-icons/hi";
import autobots from '../app/assets/autobots.svg';
import Image from 'next/image';
import { IoMdExit } from "react-icons/io";
import { useAuth } from '../app/context/userContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const menus = [
        {name: "dashboard", link: '/Home', icon: IconMd.MdOutlineDashboard},
        {name: "Cadastro", link: '/Home/Cadastro', icon: IconHi.HiOutlineUserAdd},
    ]
    const [ open, setOpen ] = useState<boolean>(true);
    return (
        <div className='flex gap-6'>
            <div className={`min-h-screen bg-[#0B1B2B] text-[#C4D4E3] px-4 w-[90px] hd:w-[300px]`}>
                <div className='py-3 flex justify-start'>
                    <Image alt='' src={autobots} width={125} height={125} />
                </div>
                <div className=' mt-14 flex flex-col gap-4 relative'>
                {
                    menus?.map((menu, i) =>(
                    <Link href={menu.link} replace={true} key={i} className='flex items-center text-md gap-3.5 
                    font-MontSerrat font-medium p-2  rounded-md active:text-[#3294F8]'>
                    <div>{React.createElement(menu.icon, { size: "50" })}</div>
                        <h2 className={`whitespace-pre duration-500 menu-name hidden hd:block`}>
                            {menu.name}
                        </h2>
                    </Link>
                    ))
                }
                </div>
                <Link className=' absolute bottom-5 left-4 hd:left-10 flex cursor-pointer active:text-[#3294F8]'
                    href={'/'} onClick={() => logout()}
                >
                    <IoMdExit size={42} />
                    <h1 className=' mt-2 text-xl hidden hd:block'>Logout</h1>
                </Link>
            </div>
        </div>
    )
}
export default Sidebar;