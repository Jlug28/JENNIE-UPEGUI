import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, MapPin, User, ArrowRight } from 'lucide-react';
import { CaseDilemma } from '../types/induction';
import { triggerCelebration } from '../utils/celebration';

interface DilemmaSimulatorProps {
  cases: CaseDilemma[];
  completedCaseIds: string[];
  onSolveCase: (caseId: string, earnedXp: number) => void;
  onOpenEvaluation: () => void;
}

export const DilemmaSimulator: React.FC<DilemmaSimulatorProps> = ({
  cases,
  completedCaseIds,
  onSolveCase,
  onOpenEvaluation
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const currentCase = cases[currentIdx];
  const isCaseCompleted = completedCaseIds.includes(currentCase.id);

  const handleSelectOption = (idx: number) => {
    if (revealed) return;
    setSelectedOptionIdx(idx);
    setRevealed(true);

    const chosen = currentCase.options[idx];
    onSolveCase(currentCase.id, chosen.xp);

    // If the learner chose the optimal decision, trigger celebratory confetti!
    if (chosen.isOptimal) {
      triggerCelebration('standard');
    }
  };

  const handleNextCase = () => {
    if (currentIdx < cases.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptionIdx(null);
      setRevealed(false);
    }
  };

  const handlePrevCase = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedOptionIdx(null);
      setRevealed(false);
    }
  };

  const allCompleted = cases.every((c) => completedCaseIds.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#52c41a] mb-1">
            <span>Fase 3 del Plan de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Simulador de Casos y Convivencia Real</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Dilemas Éticos y Situaciones en el SENA
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Toma decisiones frente a situaciones cotidianas en los ambientes de formación y analiza las consecuencias jurídicas y formativas según el Acuerdo 009 de 2024.
          </p>
        </div>

        {/* Case selector stepper */}
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          {cases.map((c, i) => {
            const done = completedCaseIds.includes(c.id);
            const active = i === currentIdx;

            return (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentIdx(i);
                  setSelectedOptionIdx(null);
                  setRevealed(false);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                  active
                    ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs'
                    : done
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
                title={`Caso ${i + 1}: ${c.title}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Case Scenario Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col justify-between transition-colors">
          <div className="p-6 space-y-4">
            {/* Meta tags */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-[#39A900] dark:text-[#52c41a] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {currentCase.categoryLabel}
              </span>
              <span className="font-mono text-slate-400 dark:text-slate-500">
                Caso {currentIdx + 1} de {cases.length}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-950 dark:text-white font-display">
              {currentCase.title}
            </h3>

            {/* Context location and character */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 pt-1 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{currentCase.contextLocation}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>{currentCase.character}</span>
              </div>
            </div>

            {/* Scenario story text */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              "{currentCase.scenario}"
            </p>

            {/* Interactive Question Prompt */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                ¿Qué conducta o decisión debe adoptarse según el reglamento?
              </h4>

              <div className="space-y-3">
                {currentCase.options.map((opt, optIdx) => {
                  let btnState = 'border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800';

                  if (revealed) {
                    if (opt.isOptimal) {
                      btnState = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium';
                    } else if (selectedOptionIdx === optIdx) {
                      btnState = 'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-950 dark:text-red-200';
                    } else {
                      btnState = 'border-slate-200 dark:border-slate-800 opacity-60 text-slate-500 dark:text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={revealed}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${btnState}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-slate-700 dark:text-slate-300">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt.text}</span>
                      {revealed && opt.isOptimal && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legal Rationale Feedback Box */}
            {revealed && selectedOptionIdx !== null && (
              <div
                className={`p-4 rounded-xl border space-y-2.5 animate-in fade-in duration-200 ${
                  currentCase.options[selectedOptionIdx].isOptimal
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentCase.options[selectedOptionIdx].isOptimal ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {currentCase.options[selectedOptionIdx].isOptimal
                        ? 'Decisión Acorde al Reglamento (+150 XP) 🎉'
                        : 'Decisión Riesgosa / Antirreglamentaria'}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed">
                  {currentCase.options[selectedOptionIdx].feedback}
                </p>

                <div className="pt-2 border-t border-slate-200/40 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                    Fundamento Jurídico Institucional:
                  </span>
                  <span>{currentCase.options[selectedOptionIdx].legalArticle}</span>
                </div>
              </div>
            )}
          </div>

          {/* Card footer navigation */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrevCase}
              disabled={currentIdx === 0}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Caso Anterior</span>
            </button>

            {currentIdx < cases.length - 1 ? (
              <button
                onClick={handleNextCase}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Siguiente Caso</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenEvaluation}
                className="px-4 py-2 text-xs font-semibold bg-[#39A900] hover:bg-[#2d8500] text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Ir a la Evaluación Final</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Real Context Imagery & Due Process Guide */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs transition-colors">
            <img
              src="/src/assets/images/sena_case_simulation_1792526684626.jpg"
              alt="Mesa de análisis de dilemas y casos éticos en taller tecnológico SENA"
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-display block">
                Comité de Evaluación y Seguimiento
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                El Comité es el espacio consultivo donde se analizan los casos garantizando el debido proceso. No busca sancionar punitivamente, sino orientar la formación del aprendiz.
              </p>
            </div>
          </div>

          {/* Stepper of Due Process in SENA */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ruta del Debido Proceso Disciplinario (Acuerdo 009 de 2024)
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Informe o Queja Formal</span>
                  <span className="text-slate-500 dark:text-slate-400">Radicación de hechos objetivos y pruebas testimoniales o documentales.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Notificación y Citación</span>
                  <span className="text-slate-500 dark:text-slate-400">Comunicación al aprendiz con mínimo 3 días hábiles de anticipación.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Sesión de Descargos</span>
                  <span className="text-slate-500 dark:text-slate-400">El aprendiz expone su versión, aporta pruebas y cuenta con apoyo de su vocero.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Resolución y Recurso</span>
                  <span className="text-slate-500 dark:text-slate-400">Subdirección de Centro emite acto motivado. Procede Recurso de Reposición.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
