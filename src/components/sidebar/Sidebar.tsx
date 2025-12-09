'use client'
import React, { useMemo, useEffect, useState } from 'react'
import Image from 'next/image'
import { IoLogoReact } from "react-icons/io5"
import { SidebarMenuItem } from './SidebarMenuItem';
import { MdOutlineSkateboarding, MdGavel, MdAdminPanelSettings } from "react-icons/md";
import { GiSkateboard } from "react-icons/gi";
import { GiTrophy } from "react-icons/gi";
import { FaVideo } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import Link from 'next/link';


const skaterMenuItems = [
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
    path: '/dashboard/skaters/submissions',
    icon: <FaVideo size={40} />,
    title: 'Mis Submissions',
    subTitle: 'historial y estado'
  },
  {
    path: '/dashboard/skaters/logros',
    icon: <GiTrophy size={40} />,
    title: 'Logros',
    subTitle: 'editar logros'
  }
]

const judgeMenuItems = [
  {
    path: '/dashboard/judges/evaluate',
    icon: <MdGavel size={40} />,
    title: 'Evaluar',
    subTitle: 'calificar submissions'
  },
  {
    path: '/dashboard/judges/history',
    icon: <GiTrophy size={40} />,
    title: 'Historial',
    subTitle: 'evaluaciones realizadas'
  }
]

const adminMenuItems = [
  {
    path: '/dashboard/admin/users',
    icon: <MdAdminPanelSettings size={40} />,
    title: 'Usuarios',
    subTitle: 'gestionar usuarios'
  },
  {
    path: '/dashboard/admin/challenges',
    icon: <GiSkateboard size={40} />,
    title: 'Desafíos',
    subTitle: 'gestionar desafíos'
  },
  {
    path: '/dashboard/judges/evaluate',
    icon: <MdGavel size={40} />,
    title: 'Evaluar',
    subTitle: 'calificar submissions'
  }
]


export const Sidebar = () => {
  const { data: session, status } = useSession();
  const [totalScore, setTotalScore] = useState(0);

  // Determinar qué menú mostrar según el rol
  const menuItems = useMemo(() => {
    const userRole = session?.user?.role || 'skater';

    if (userRole === 'admin') {
      return adminMenuItems;
    } else if (userRole === 'judge') {
      return judgeMenuItems;
    } else {
      return skaterMenuItems;
    }
  }, [session?.user?.role]);

  // Obtener el score total del usuario
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      const fetchScore = async () => {
        try {
          const response = await fetch(`/api/users/score?email=${session.user?.email}`);
          if (response.ok) {
            const data = await response.json();
            setTotalScore(data.totalScore || 0);
          }
        } catch (error) {
          console.error('Error fetching score:', error);
        }
      };
      fetchScore();
    }
  }, [status, session?.user?.email]);

  // Obtener el badge del rol
  const getRoleBadge = () => {
    const userRole = session?.user?.role || 'skater';

    if (userRole === 'admin') {
      return <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">ADMIN</span>;
    } else if (userRole === 'judge') {
      return <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-bold">JUEZ</span>;
    }
    return null;
  };

  return (
    <div id="menu"
      className="bg-gray-900 min-h-auto lg:min-h-screen z-10 text-slate-300 w-full lg:w-64 left-0 overflow-y-auto">

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
            Score = {totalScore}
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
              <div className="flex flex-col">
                <span className="text-sm md:text-base font-bold">
                  {session?.user?.name}
                </span>
                {getRoleBadge()}
              </div>
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
