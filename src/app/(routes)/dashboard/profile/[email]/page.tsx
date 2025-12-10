"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaTwitter, FaFacebook } from 'react-icons/fa';
import { MdOutlineSkateboarding, MdLocationOn, MdGroups } from 'react-icons/md';
import { GiSkateboard, GiTrophy } from 'react-icons/gi';

interface PublicProfile {
  email: string;
  name: string | null;
  photo: string | null;
  location: string | null;
  role: string;
  memberSince: string;
  team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;
  socialMedia: {
    instagram: string | null;
    tiktok: string | null;
    twitter: string | null;
    facebook: string | null;
  } | null;
  skateSetup: {
    madero: string | null;
    trucks: string | null;
    ruedas: string | null;
    rodamientos: string | null;
    tenis: string | null;
  } | null;
  stats: {
    totalScore: number;
    challengesCompleted: number;
    highestDifficulty: number;
    submissionsApproved: number;
  };
  recentAchievements: {
    challengeName: string;
    difficulty: number;
    score: number | null;
  }[];
}

export default function PublicProfilePage() {
  const params = useParams();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const email = params.email as string;
  const isOwnProfile = session?.user?.email === decodeURIComponent(email);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${email}/profile`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Usuario no encontrado');
          } else {
            setError('Error al cargar el perfil');
          }
          return;
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchProfile();
    }
  }, [email]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <span className="text-xs bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-wider shadow-lg shadow-red-500/50">
            ADMIN
          </span>
        );
      case 'judge':
        return (
          <span className="text-xs bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-3 py-1 rounded-full font-black uppercase tracking-wider shadow-lg shadow-yellow-500/50">
            JUEZ
          </span>
        );
      default:
        return (
          <span className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-wider shadow-lg shadow-cyan-500/50">
            SKATER
          </span>
        );
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    const labels = ['', 'Ollie', 'Kickflip', 'Heelflip', '50-50', 'Boardslide', 'Pop Shuvit', '360 Flip', 'Hardflip', 'Varial Kickflip', 'Switch Kickflip'];
    return labels[difficulty] || `Nivel ${difficulty}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-cyan-400 font-bold text-xl">CARGANDO PERFIL...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-1 rounded-lg shadow-2xl">
          <div className="bg-slate-900 rounded-lg p-8 text-center">
            <p className="text-red-400 font-bold text-xl">{error || 'Perfil no disponible'}</p>
            <Link
              href="/dashboard/leaderboard"
              className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 font-bold uppercase"
            >
              ← Volver al Leaderboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Header Card */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-1 rounded-lg shadow-2xl shadow-cyan-500/30">
          <div className="bg-slate-900 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-lg opacity-50"></div>
                {profile.photo ? (
                  <Image
                    src={profile.photo}
                    alt={profile.name || 'Avatar'}
                    width={120}
                    height={120}
                    className="relative rounded-full border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-black text-4xl border-4 border-white">
                    {profile.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-wider">
                  {profile.name || 'Skater'}
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                  {getRoleBadge(profile.role)}

                  {profile.location && (
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <MdLocationOn className="text-cyan-400" />
                      {profile.location}
                    </span>
                  )}

                  {profile.team && (
                    <Link
                      href="/dashboard/teams"
                      className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300"
                    >
                      <MdGroups />
                      {profile.team.name}
                    </Link>
                  )}
                </div>

                <p className="text-slate-500 text-xs mt-2">
                  Miembro desde {new Date(profile.memberSince).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                </p>
              </div>

              {/* Main Score */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-[3px] rounded-lg">
                <div className="bg-slate-900 rounded-lg p-4 text-center">
                  <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Score Total</p>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    {profile.stats.totalScore}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-[3px] rounded-lg">
            <div className="bg-slate-900 rounded-lg p-4 text-center h-full">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Challenges</p>
              <p className="text-3xl font-black text-green-400">{profile.stats.challengesCompleted}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-[3px] rounded-lg">
            <div className="bg-slate-900 rounded-lg p-4 text-center h-full">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Aprobados</p>
              <p className="text-3xl font-black text-cyan-400">{profile.stats.submissionsApproved}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-[3px] rounded-lg">
            <div className="bg-slate-900 rounded-lg p-4 text-center h-full">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Max Nivel</p>
              <p className="text-3xl font-black text-purple-400">{profile.stats.highestDifficulty}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-500 to-red-600 p-[3px] rounded-lg">
            <div className="bg-slate-900 rounded-lg p-4 text-center h-full">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Promedio</p>
              <p className="text-3xl font-black text-rose-400">
                {profile.stats.submissionsApproved > 0
                  ? Math.round(profile.stats.totalScore / profile.stats.submissionsApproved)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-[3px] rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6 h-full">
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 uppercase mb-4 flex items-center gap-2">
              <GiTrophy className="text-yellow-400" /> Últimos Logros
            </h2>

            {profile.recentAchievements.length > 0 ? (
              <div className="space-y-3">
                {profile.recentAchievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white font-bold text-sm">{achievement.challengeName}</p>
                      <p className="text-slate-500 text-xs">Nivel {achievement.difficulty}</p>
                    </div>
                    {achievement.score && (
                      <span className="text-yellow-400 font-black">{achievement.score} pts</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">Sin logros aún</p>
            )}
          </div>
        </div>

        {/* Skate Setup */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-[3px] rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6 h-full">
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase mb-4 flex items-center gap-2">
              <GiSkateboard className="text-purple-400" /> Dream Setup
            </h2>

            {profile.skateSetup ? (
              <div className="space-y-3">
                {profile.skateSetup.madero && (
                  <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3">
                    <p className="text-slate-500 text-xs uppercase">Tabla</p>
                    <p className="text-white font-bold">{profile.skateSetup.madero}</p>
                  </div>
                )}
                {profile.skateSetup.trucks && (
                  <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3">
                    <p className="text-slate-500 text-xs uppercase">Trucks</p>
                    <p className="text-white font-bold">{profile.skateSetup.trucks}</p>
                  </div>
                )}
                {profile.skateSetup.ruedas && (
                  <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3">
                    <p className="text-slate-500 text-xs uppercase">Ruedas</p>
                    <p className="text-white font-bold">{profile.skateSetup.ruedas}</p>
                  </div>
                )}
                {profile.skateSetup.rodamientos && (
                  <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3">
                    <p className="text-slate-500 text-xs uppercase">Rodamientos</p>
                    <p className="text-white font-bold">{profile.skateSetup.rodamientos}</p>
                  </div>
                )}
                {profile.skateSetup.tenis && (
                  <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3">
                    <p className="text-slate-500 text-xs uppercase">Tenis</p>
                    <p className="text-white font-bold">{profile.skateSetup.tenis}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">Setup no configurado</p>
            )}
          </div>
        </div>

        {/* Social Media */}
        {profile.socialMedia && (profile.socialMedia.instagram || profile.socialMedia.tiktok || profile.socialMedia.twitter || profile.socialMedia.facebook) && (
          <div className="md:col-span-2 bg-gradient-to-r from-green-500 to-teal-500 p-[3px] rounded-lg">
            <div className="bg-slate-900 rounded-lg p-6">
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 uppercase mb-4">
                🌐 Redes Sociales
              </h2>

              <div className="flex flex-wrap justify-center gap-4">
                {profile.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${profile.socialMedia.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
                  >
                    <FaInstagram size={24} />
                    {profile.socialMedia.instagram}
                  </a>
                )}
                {profile.socialMedia.tiktok && (
                  <a
                    href={`https://tiktok.com/@${profile.socialMedia.tiktok.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-3 rounded-lg font-bold border-2 border-slate-600 hover:scale-105 transition-transform"
                  >
                    <FaTiktok size={24} />
                    {profile.socialMedia.tiktok}
                  </a>
                )}
                {profile.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${profile.socialMedia.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
                  >
                    <FaTwitter size={24} />
                    {profile.socialMedia.twitter}
                  </a>
                )}
                {profile.socialMedia.facebook && (
                  <a
                    href={`https://facebook.com/${profile.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
                  >
                    <FaFacebook size={24} />
                    {profile.socialMedia.facebook}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Button (if own profile) */}
      {isOwnProfile && (
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Link
            href="/dashboard/skaters/profile"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-3 px-8 rounded-lg border-4 border-white uppercase tracking-wider shadow-lg shadow-cyan-500/30 transform hover:scale-105 transition-all"
          >
            ✏️ Editar Mi Perfil
          </Link>
        </div>
      )}

      {/* Back Link */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <Link
          href="/dashboard/leaderboard"
          className="text-cyan-400 hover:text-cyan-300 font-bold uppercase text-sm"
        >
          ← Volver al Leaderboard
        </Link>
      </div>
    </div>
  );
}
