"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

interface Submission {
  id: number;
  userId: string;
  challengeId: number;
  videoUrl: string;
  status: string;
  submittedAt: string;
  user: {
    name: string;
    email: string;
  };
  challenge: {
    name: string;
    level: number;
    difficulty: string;
    points: number;
  };
}

export default function JudgeEvaluatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [notification, setNotification] = useState('');

  // Verificar si el usuario es juez o admin
  useEffect(() => {
    if (status === 'authenticated') {
      const userRole = session?.user?.role;
      if (userRole !== 'judge' && userRole !== 'admin') {
        router.push('/dashboard/skaters/profile');
      }
    }
  }, [status, session, router]);

  // Cargar submissions pendientes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchPendingSubmissions();
    }
  }, [status]);

  const fetchPendingSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/submissions/pending');
      if (!response.ok) throw new Error('Error al obtener submissions');
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error:', error);
      setNotification('❌ Error al cargar las submissions pendientes');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async (submissionId: number, approved: boolean) => {
    try {
      setEvaluating(submissionId);
      const response = await fetch('/api/submissions/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          status: approved ? 'approved' : 'rejected',
          score: approved ? score : 0,
          feedback,
          evaluatedBy: session?.user?.email,
        }),
      });

      if (!response.ok) throw new Error('Error al evaluar');

      setNotification(`✅ Submission ${approved ? 'aprobada' : 'rechazada'} exitosamente`);
      setScore(0);
      setFeedback('');
      fetchPendingSubmissions();

      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setNotification('❌ Error al evaluar la submission');
    } finally {
      setEvaluating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-cyan-400 font-bold text-xl">CARGANDO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-1 rounded-lg shadow-2xl">
          <div className="bg-slate-900 rounded-lg p-6">
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 uppercase tracking-wider text-center md:text-left">
              ⚖️ Panel de Evaluación
            </h1>
            <p className="text-yellow-300 mt-2 text-sm md:text-base text-center md:text-left">
              {session?.user?.email || "Juez"}
            </p>
          </div>
        </div>
      </div>

      {/* Notificación */}
      {notification && (
        <div className={`max-w-7xl mx-auto mb-6 animate-pulse ${
          notification.includes("✅") ? "bg-green-500" : "bg-red-500"
        } border-4 border-white rounded-lg p-4 shadow-2xl`}>
          <p className="text-white font-bold text-center text-sm md:text-base">{notification}</p>
        </div>
      )}

      {/* Lista de Submissions */}
      <div className="max-w-7xl mx-auto">
        {submissions.length === 0 ? (
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-4 border-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-400 text-xl font-bold">
              ✅ No hay submissions pendientes de evaluación
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 p-1 rounded-lg shadow-2xl"
              >
                <div className="bg-slate-900 rounded-lg p-6">
                  {/* Info del skater y desafío */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-cyan-400 font-bold text-sm mb-1">SKATER</p>
                      <p className="text-white text-lg font-black">{submission.user.name}</p>
                      <p className="text-slate-400 text-sm">{submission.user.email}</p>
                    </div>
                    <div>
                      <p className="text-purple-400 font-bold text-sm mb-1">DESAFÍO</p>
                      <p className="text-white text-lg font-black">
                        Level {submission.challenge.level}: {submission.challenge.name}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {submission.challenge.difficulty} • {submission.challenge.points} pts
                      </p>
                    </div>
                  </div>

                  {/* Video */}
                  <div className="mb-4">
                    <p className="text-yellow-400 font-bold text-sm mb-2">VIDEO</p>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden border-4 border-slate-700">
                      <iframe
                        width="100%"
                        height="100%"
                        src={submission.videoUrl.replace('watch?v=', 'embed/')}
                        title="Submission video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* Formulario de evaluación */}
                  {evaluating === submission.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-cyan-400 font-bold mb-2 uppercase text-sm">
                          Puntaje (0-100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={score}
                          onChange={(e) => setScore(Number(e.target.value))}
                          className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-cyan-400 font-bold mb-2 uppercase text-sm">
                          Comentarios
                        </label>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={3}
                          className="w-full bg-slate-800 border-4 border-slate-600 rounded-lg py-3 px-4 text-white focus:border-cyan-500 focus:outline-none"
                          placeholder="Escribe tus comentarios..."
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEvaluate(submission.id, true)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-black py-3 px-6 rounded-lg border-4 border-white uppercase tracking-wider shadow-2xl transform hover:scale-105 transition-all"
                        >
                          ✅ APROBAR
                        </button>
                        <button
                          onClick={() => handleEvaluate(submission.id, false)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-black py-3 px-6 rounded-lg border-4 border-white uppercase tracking-wider shadow-2xl transform hover:scale-105 transition-all"
                        >
                          ❌ RECHAZAR
                        </button>
                      </div>
                      <button
                        onClick={() => setEvaluating(null)}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg uppercase text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEvaluating(submission.id)}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-black py-4 px-6 rounded-lg border-4 border-white uppercase tracking-wider text-lg shadow-2xl transform hover:scale-105 transition-all"
                    >
                      📝 EVALUAR
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
