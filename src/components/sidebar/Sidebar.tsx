'use client'
import React from 'react'
import Image from 'next/image'
import { IoLogoReact, IoBrowsersOutline, IoCalculator, IoFootball, IoHeartOutline } from "react-icons/io5"
import { SidebarMenuItem } from './SidebarMenuItem';
import { MdOutlineSkateboarding } from "react-icons/md";
import { GiSkateboard } from "react-icons/gi";
import { GiTrophy } from "react-icons/gi";
import { useSession } from 'next-auth/react';


const menuItems = [
    {
        path: '/dashboard/skaters/profile',
        icon: <MdOutlineSkateboarding size={40} />,
        title: 'Perfil',
        subTitle: 'editar perfil'
    },
    {
        path: '/dashboard/skaters/tricks',
        icon: <GiSkateboard size={40} />,
        title: 'Trucos',
        subTitle: 'trucos en curso'
    },
    {
        path: '/dashboard/skaters/logros',
        icon: <GiTrophy size={40} />,
        title: 'Logros',
        subTitle: 'editar logros'

    }
]


export const Sidebar = () => {
    const { data: session, status } = useSession();


    return (
        <div id="menu"
            style={{ width: '400px' }}
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64  left-0  overflow-y-scroll">

            <div id="logo" className="my-4 px-6">
                <h1 className="flex text-lg md:text-2xl font-bold text-white">
                    <div className='px-2'>
                        <IoLogoReact />
                    </div>
                    <span>Trickest</span>
                    <span className="text-blue-500">2024 Skaters</span>.</h1>
                <p className="text-slate-500 text-sm">score = 0</p>
            </div>

            <div id="profile" className="px-6 py-10">
                <p className="text-slate-500">Bienvenido,</p>
                <a href="#" className="inline-flex space-x-2 items-center">
                    {
                             (status === "loading") ? <p>Cargando...</p>: // Evita errores de hidratación

                    <span>
                        <Image className="rounded-full w-8 h-8" src={session?.user?.image || "/logo.png"}
                            alt="User avatar"
                            width={50}
                            height={50} />
                    </span>}
                    <span className="text-sm md:text-base font-bold">

                        {session?.user?.name}
                    </span>
                </a>
            </div>


            <div id="nav" className="w-full px-6">
                {
                    menuItems.map(item => (
                        <SidebarMenuItem key={item.path} {...item} />
                    ))
                }

            </div>
        </div>
    )
}
