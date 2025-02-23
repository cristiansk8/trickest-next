'use client'
import React from 'react'
import Image from 'next/image'
import { IoLogoReact, } from "react-icons/io5"
import { SidebarMenuItem } from './SidebarMenuItem';
import { MdOutlineSkateboarding } from "react-icons/md";
import { GiSkateboard } from "react-icons/gi";
import { GiTrophy } from "react-icons/gi";
import { useSession } from 'next-auth/react';
import Link from 'next/link';


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
      className="bg-gray-900 min-h-auto lg:min-h-screen z-10 text-slate-300 w-full max-w-[400px] left-0 overflow-y-auto md:w-64">

      {/* Logo y Título */}

      <div id="logo" className="my-4 px-4 md:px-6 cursor-pointer">
        <Link href="/">
          <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
            <IoLogoReact className="text-blue-500 w-6 h-6 md:w-8 md:h-8 mr-2" />
            <span>Trickest</span>
            <span className="text-blue-500">2025 Skaters</span>
          </h1>
        </Link>
        <span className="text-blue-500 text-sm text-lg md:text-2xl font-bold">
          Score = 0
        </span>
      </div>


      {/* Perfil del usuario */}
      <div id="profile" className="px-4 md:px-6 py-6 md:py-10">
        <p className="text-slate-500 text-sm md:text-base">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          {status === "loading" ? (
            <p>Cargando...</p> // Evita errores de hidratación
          ) : (
            <>
              <Image
                className="rounded-full w-10 h-10 md:w-12 md:h-12"
                src={session?.user?.image || "/logo.png"}
                alt="User avatar"
                width={50}
                height={50}
              />
              <span className="text-sm md:text-base font-bold">
                {session?.user?.name}
              </span>
            </>
          )}
        </a>
      </div>

      {/* Menú de navegación */}
      <div id="nav" className="w-full px-4 md:px-6">
        {menuItems.map(item => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>

  )
}
