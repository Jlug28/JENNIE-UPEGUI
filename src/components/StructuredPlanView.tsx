import React from 'react';
import { Calendar, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { STRUCTURED_INDUCTION_PLAN } from '../data/senaRegulationData';

interface StructuredPlanViewProps {
  onStartModules: () => void;
  onOpenDilemmas: () => void;
}

export const StructuredPlanView: React.FC<StructuredPlanViewProps> = ({
  onStartModules,
  onOpenDilemmas
}) => {
  const plan = STRUCTURED_INDUCTION_PLAN;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Marco Pedagógico & Metodológico SENA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight leading-tight">
            {plan.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {plan.objective}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onStartModules}
              className="px-5 py-2.5 text-xs font-semibold bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Ejecutar Fase 2: Módulos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDilemmas}
              className="px-5 py-2.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors border border-slate-700"
            >
              Ejecutar Fase 3: Casos
            </button>
          </div>
        </div>
      </div>

      {/* Target KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {plan.keyMetrics.map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 transition-colors">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">{kpi.label}</span>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#39A900] dark:text-[#52c41a] tabular-nums">
              {kpi.target}
            </div>
          </div>
        ))}
      </div>

      {/* Phases Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          Ruta Metodológica de 4 Fases para la Inducción
        </h2>

        <div className="space-y-4">
          {plan.phases.map((phase, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row md:items-start gap-6 transition-colors"
            >
              {/* Left indicator */}
              <div className="md:w-48 shrink-0 space-y-1">
                <span className="text-xs font-mono font-bold text-[#39A900] dark:text-[#52c41a] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block">
                  {phase.phaseNumber}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display leading-tight">
                  {phase.name}
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {phase.duration}
                </span>
              </div>

              {/* Middle activities */}
              <div className="flex-1 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Actividades Clave
                </span>
                <ul className="space-y-2">
                  {phase.activities.map((act, actIdx) => (
                    <li key={actIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#52c41a] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right deliverable */}
              <div className="md:w-64 shrink-0 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-750 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Evidencia / Entregable
                </span>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  {phase.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
