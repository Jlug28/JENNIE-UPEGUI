import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, BookOpen, ChevronRight, Check, Award } from 'lucide-react';
import { RegulationModule } from '../types/induction';
import { triggerCelebration } from '../utils/celebration';

interface ModuleReaderModalProps {
  module: RegulationModule | null;
  onClose: () => void;
  isCompleted: boolean;
  onCompleteModule: (moduleId: string, earnedXp: number) => void;
}

export const ModuleReaderModal: React.FC<ModuleReaderModalProps> = ({
  module,
  onClose,
  isCompleted,
  onCompleteModule
}) => {
  if (!module) return null;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [activeTab, setActiveTab] = useState<'conceptos' | 'evaluacion'>('conceptos');

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === module.quickCheck.correctIndex) {
      onCompleteModule(module.id, 100);
      // Trigger celebration confetti animation
      triggerCelebration('standard');
    }
  };

  const isCorrect = selectedOption === module.quickCheck.correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              MÓDULO {module.number}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display leading-tight">
                {module.title}
              </h2>
              <span className="text-xs text-slate-400">
                {module.normativeRef} · {module.estimatedMinutes} min lectura
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-900/50 gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('conceptos')}
            className={`py-3 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'conceptos'
                ? 'border-[#39A900] text-[#39A900] dark:text-[#52c41a] font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fundamento Normativo y Artículos</span>
          </button>
          <button
            onClick={() => setActiveTab('evaluacion')}
            className={`py-3 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'evaluacion'
                ? 'border-[#39A900] text-[#39A900] dark:text-[#52c41a] font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Micro-Comprobación Diagnóstica</span>
            {isCompleted && (
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 rounded font-bold">
                ✓
              </span>
            )}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'conceptos' ? (
            <div className="space-y-6">
              {/* Summary lead */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {module.summary}
              </div>

              {/* Core Concepts */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Conceptos Clave del Acuerdo 009 de 2024
                </h3>
                {module.coreConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-2 bg-white dark:bg-slate-850 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {concept.title}
                      </h4>
                      {concept.articles && (
                        <span className="text-[11px] font-mono text-[#39A900] dark:text-[#52c41a] font-medium shrink-0">
                          {concept.articles}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {concept.description}
                    </p>

                    {concept.examples && concept.examples.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                          Aplicación en la vida real:
                        </span>
                        <ul className="space-y-1">
                          {concept.examples.map((ex, exIdx) => (
                            <li key={exIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-[#39A900] dark:text-[#52c41a] font-bold">›</span>
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA to take quick check */}
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                    ¿Comprendiste este módulo normativo?
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Responde la micro-pregunta diagnóstica para validar tu avance y ganar 100 XP con animación de logro.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('evaluacion')}
                  className="px-4 py-2 text-xs font-semibold bg-[#39A900] text-white rounded-lg hover:bg-[#2d8500] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <span>Ir a la Comprobación</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-[#39A900] dark:text-[#52c41a] block mb-1">
                  PREGUNTA DIAGNÓSTICA · MÓDULO {module.number}
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug">
                  {module.quickCheck.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {module.quickCheck.options.map((opt, idx) => {
                  let optStyle = 'border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-200';

                  if (hasAnswered) {
                    if (idx === module.quickCheck.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium';
                    } else if (selectedOption === idx) {
                      optStyle = 'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-950 dark:text-red-200';
                    } else {
                      optStyle = 'border-slate-200 dark:border-slate-800 opacity-50 bg-white dark:bg-slate-900 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-slate-700 dark:text-slate-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {hasAnswered && idx === module.quickCheck.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && selectedOption === idx && idx !== module.quickCheck.correctIndex && (
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {hasAnswered && (
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                          ¡Respuesta Correcta! (+100 XP) 🎉
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                          Respuesta Incorrecta. Revisa el fundamento legal:
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed">{module.quickCheck.explanation}</p>
                  {!isCorrect && (
                    <button
                      onClick={() => {
                        setHasAnswered(false);
                        setSelectedOption(null);
                      }}
                      className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-300 underline"
                    >
                      Intentar de nuevo
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setActiveTab(activeTab === 'conceptos' ? 'evaluacion' : 'conceptos')}
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
          >
            {activeTab === 'conceptos' ? 'Ir a Evaluación ›' : '‹ Volver a Conceptos'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Cerrar Módulo
          </button>
        </div>
      </div>
    </div>
  );
};
