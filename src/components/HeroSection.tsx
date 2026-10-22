import React from 'react';
import { ArrowRight, CheckCircle2, Award, FileText } from 'lucide-react';
import { InductionProgress } from '../types/induction';

interface HeroSectionProps {
  progress: InductionProgress;
  onStartModules: () => void;
  onOpenDilemmas: () => void;
  onOpenEvaluation: () => void;
  onOpenPlan: () => void;
  onViewCertificate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  progress,
  onStartModules,
  onOpenDilemmas,
  onOpenEvaluation,
  onOpenPlan,
  onViewCertificate
}) => {
  const modulesPct = Math.round((progress.completedModuleIds.length / 5) * 100);
  const casesPct = Math.round((progress.completedCaseIds.length / 6) * 100);
  const isCertified = Boolean(progress.certificateId);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Editorial & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="text-[#39A900] dark:text-[#52c41a] font-semibold">Formación Profesional Integral</span>
                <span aria-hidden="true">·</span>
                <span>Servicio Nacional de Aprendizaje</span>
                <span aria-hidden="true">·</span>
                <span>Acuerdo 009 de 2024 · D.O. 52.947</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white font-display leading-[1.15] text-balance">
                Ruta de Inducción y Acuerdo 009 de 2024 SENA
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Aprende y apropia de forma interactiva y gamificada tus derechos, deberes, prohibiciones y las rutas hacia la etapa productiva. Resuelve casos reales de convivencia, demuestra tu criterio y genera tu certificado oficial verificable.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartModules}
                className="px-5 py-3 text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8800] rounded-xl shadow-xs transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explorar Módulos Normativos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDilemmas}
                className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap border border-transparent dark:border-slate-700"
              >
                <span>Resolver Casos y Dilemas</span>
              </button>

              <button
                onClick={onOpenPlan}
                className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Ver Plan Metodológico</span>
              </button>
            </div>

            {/* Micro Progress Bar & Metrics */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Módulos Aprobados</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm font-mono tabular-nums">
                  {progress.completedModuleIds.length} / 5 ({modulesPct}%)
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Dilemas Resueltos</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm font-mono tabular-nums">
                  {progress.completedCaseIds.length} / 6 ({casesPct}%)
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Puntaje Gamificado</span>
                <span className="font-bold text-[#39A900] dark:text-[#52c41a] text-sm font-mono tabular-nums">
                  {progress.xp} XP
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Certificación</span>
                {isCertified ? (
                  <button
                    onClick={onViewCertificate}
                    className="font-bold text-emerald-700 dark:text-emerald-400 text-sm hover:underline flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Ver Diploma</span>
                  </button>
                ) : (
                  <span className="font-medium text-slate-400 dark:text-slate-500 text-sm">Pendiente</span>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Authentic Visual Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs bg-slate-100 dark:bg-slate-800 h-full flex flex-col">
              <img
                src="/src/assets/images/hero_sena_campus_1792526684032.jpg"
                alt="Aprendices SENA en jornada de inducción y formación técnica en campus colombiano"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-white dark:bg-slate-800/95 flex-1 flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>SENA Regional Distrito Capital</span>
                    <span>Cohorte 2024 - 2026</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                    El Aprendiz: Sujeto de Derechos y Responsabilidad Social
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    La inducción no es un trámite administrativo; es la puerta de entrada a la educación técnica y tecnológica que transforma el tejido productivo de Colombia.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">Aprendiz en sesión: </span>
                    <span>{progress.profile.name}</span>
                  </div>
                  {isCertified && (
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Certificado Emitido
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
