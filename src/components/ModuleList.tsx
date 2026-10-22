import React from 'react';
import { BookOpen, CheckCircle2, Clock, ChevronRight, Sparkles, Shield, UserCheck, AlertOctagon, Award, Building2 } from 'lucide-react';
import { RegulationModule } from '../types/induction';

interface ModuleListProps {
  modules: RegulationModule[];
  completedIds: string[];
  onSelectModule: (module: RegulationModule) => void;
  onOpenDilemmas: () => void;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  completedIds,
  onSelectModule,
  onOpenDilemmas
}) => {
  const allCompleted = modules.every((m) => completedIds.includes(m.id));

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#39A900] dark:text-[#52c41a]" />;
      case 'ShieldCheck':
        return <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-green-700 dark:text-green-400" />;
      case 'AlertOctagon':
        return <AlertOctagon className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#39A900] dark:text-[#52c41a]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#52c41a] mb-1">
            <span>Fase 2 del Plan de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Marco Legal Acuerdo 009 de 2024</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Módulos Formativos del Reglamento
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Explora cada capítulo normativo. Al finalizar cada módulo, responde la pregunta diagnóstica para validar tu aprendizaje y sumar puntos XP con animación de celebración.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          Progreso:{' '}
          <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {completedIds.length} de {modules.length} módulos
          </span>
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod) => {
          const isDone = completedIds.includes(mod.id);

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className={`group cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between relative bg-white dark:bg-slate-900 hover:shadow-md ${
                isDone
                  ? 'border-emerald-200 dark:border-emerald-800/80 ring-1 ring-emerald-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Card top */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getModuleIcon(mod.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                      MÓDULO {mod.number}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completado
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.estimatedMinutes} min
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white font-display group-hover:text-[#39A900] dark:group-hover:text-[#52c41a] transition-colors leading-snug">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
                    {mod.shortDesc}
                  </p>
                </div>
              </div>

              {/* Card bottom */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-400 dark:text-slate-500 truncate max-w-[170px]">
                  {mod.normativeRef}
                </span>
                <span className="font-semibold text-[#39A900] dark:text-[#52c41a] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{isDone ? 'Repasar' : 'Estudiar'}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}

        {/* Phase completion prompt */}
        <div className="rounded-2xl border border-dashed border-emerald-300 dark:border-emerald-700/80 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#39A900] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
              {allCompleted ? '¡Fase Normativa Culminada!' : 'Próximo Paso: Casos Reales'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Pon a prueba tus conocimientos en el simulador de dilemas y situaciones reales de convivencia en los centros del SENA.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-800/60">
            <button
              onClick={onOpenDilemmas}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ir a Casos & Dilemas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
