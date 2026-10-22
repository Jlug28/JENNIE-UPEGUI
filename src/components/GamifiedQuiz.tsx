import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Award, RotateCcw, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { QuizQuestion } from '../types/induction';
import { triggerCelebration } from '../utils/celebration';

interface GamifiedQuizProps {
  questions: QuizQuestion[];
  quizSubmitted: boolean;
  savedScore: number;
  onFinishQuiz: (score: number, total: number) => void;
  onGoToCertificate: () => void;
  onReviewModules: () => void;
}

export const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({
  questions,
  quizSubmitted,
  savedScore,
  onFinishQuiz,
  onGoToCertificate,
  onReviewModules
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(quizSubmitted);

  // State for word completion puzzle (q1)
  const [blank1, setBlank1] = useState('');
  const [blank2, setBlank2] = useState('');
  const [blank3, setBlank3] = useState('');

  const currentQ = questions[currentIdx];
  const selectedForCurrent = selectedAnswers[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (showAnswerFeedback) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
    setShowAnswerFeedback(true);

    if (optIdx === currentQ.correctIndex) {
      triggerCelebration('subtle');
    }
  };

  const handleNextQuestion = () => {
    setShowAnswerFeedback(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });

      const finalPercentage = Math.round((correctCount / questions.length) * 100);
      setIsFinished(true);
      onFinishQuiz(finalPercentage, questions.length);

      if (finalPercentage >= 80) {
        triggerCelebration('grand');
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowAnswerFeedback(false);
    setIsFinished(false);
    setBlank1('');
    setBlank2('');
    setBlank3('');
  };

  // If already submitted and user viewing summary
  if (isFinished) {
    const passed = savedScore >= 80;

    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs text-center space-y-6 transition-colors">
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          {passed ? (
            <Trophy className="w-8 h-8 text-[#39A900] dark:text-[#52c41a]" />
          ) : (
            <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          )}
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#39A900] dark:text-[#52c41a] uppercase tracking-wider block">
            Resultado de la Evaluación de Inducción
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            {passed ? '¡Aprobaste la Inducción SENA!' : 'Puntaje Insuficiente para Certificación'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {passed
              ? 'Has demostrado un conocimiento sólido del Acuerdo 009 de 2024, tus derechos, deberes y debido proceso.'
              : 'El umbral mínimo de aprobación reglamentaria es del 80%. Te sugerimos repasar los módulos y volver a presentar la evaluación.'}
          </p>
        </div>

        {/* Score Card */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-sm mx-auto">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Tu Calificación Final</span>
          <div className="text-5xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
            {savedScore}%
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            {Math.round((savedScore / 100) * questions.length)} de {questions.length} respuestas correctas
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {passed ? (
            <button
              onClick={onGoToCertificate}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold bg-[#39A900] hover:bg-[#2d8500] text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Ver y Descargar mi Certificado Oficial</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Intentar Evaluación Nuevamente</span>
              </button>
              <button
                onClick={onReviewModules}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
              >
                Repasar Módulos Normativos
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedForCurrent === currentQ.correctIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#52c41a] mb-1">
            <span>Fase 4 del Plan de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Evaluación Final de Salida</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Desafío Evaluativo: Acuerdo 009 de 2024
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Responde las 10 preguntas. Requiere un mínimo del 80% de aciertos para desbloquear la certificación oficial de inducción.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg shrink-0">
          Pregunta {currentIdx + 1} de {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-[#39A900] h-2 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-6 transition-colors">
        <div>
          <span className="text-[11px] font-semibold text-[#39A900] dark:text-[#52c41a] uppercase tracking-wider block mb-1">
            {currentQ.topic}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options or Word Completion Puzzle */}
        {currentQ.id === 'q1' ? (
          <div className="space-y-6 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#39A900]" />
              <span>Desafío Interactivo: Completa las Palabras Clave del Acuerdo 009 de 2024</span>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Selecciona la palabra o número correcto para cada espacio en blanco de la frase institucional:
            </p>

            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100 font-display space-y-3">
              <p>
                "El Reglamento del Aprendiz vigente fue adoptado mediante el Acuerdo No.{' '}
                <select
                  disabled={showAnswerFeedback}
                  value={blank1}
                  onChange={(e) => setBlank1(e.target.value)}
                  className="mx-1 px-2.5 py-1 text-xs sm:text-sm font-mono font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="">[ Selecciona Acuerdo ]</option>
                  <option value="009">009</option>
                  <option value="007">007</option>
                  <option value="119">119</option>
                </select>{' '}
                de 2024, garantizando una formación 100%{' '}
                <select
                  disabled={showAnswerFeedback}
                  value={blank2}
                  onChange={(e) => setBlank2(e.target.value)}
                  className="mx-1 px-2.5 py-1 text-xs sm:text-sm font-mono font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="">[ Selecciona Condición ]</option>
                  <option value="gratuito">gratuito</option>
                  <option value="pagado">arancelado</option>
                  <option value="subsidiado">subsidiado parcial</option>
                </select>{' '}
                y exigiendo justificar inasistencias en máximo{' '}
                <select
                  disabled={showAnswerFeedback}
                  value={blank3}
                  onChange={(e) => setBlank3(e.target.value)}
                  className="mx-1 px-2.5 py-1 text-xs sm:text-sm font-mono font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="">[ Días hábiles ]</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>{' '}
                días hábiles."
              </p>
            </div>

            {!showAnswerFeedback && (
              <button
                type="button"
                disabled={!blank1 || !blank2 || !blank3}
                onClick={() => {
                  const isCorrect = blank1 === '009' && blank2 === 'gratuito' && blank3 === '3';
                  setSelectedAnswers({ ...selectedAnswers, [currentIdx]: isCorrect ? currentQ.correctIndex : 99 });
                  setShowAnswerFeedback(true);
                  if (isCorrect) {
                    triggerCelebration('subtle');
                  }
                }}
                className="w-full py-3 px-6 rounded-xl bg-[#39A900] hover:bg-[#2d8500] disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Verificar Frase Completa</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              let optState = 'border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800';

              if (showAnswerFeedback) {
                if (optIdx === currentQ.correctIndex) {
                  optState = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium';
                } else if (selectedForCurrent === optIdx) {
                  optState = 'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-950 dark:text-red-200';
                } else {
                  optState = 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-500 dark:text-slate-500';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={showAnswerFeedback}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${optState}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-slate-700 dark:text-slate-300">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                  {showAnswerFeedback && optIdx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {showAnswerFeedback && selectedForCurrent === optIdx && optIdx !== currentQ.correctIndex && (
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback block */}
        {showAnswerFeedback && (
          <div
            className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm animate-in fade-in duration-150 ${
              isCurrentCorrect
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {isCurrentCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>¡Correcto! (+100 XP) 🎉</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Respuesta Incorrecta</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed">{currentQ.explanation}</p>
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 pt-1">
              Referencia: {currentQ.legalBasis}
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="pt-2 flex justify-end">
          {showAnswerFeedback && (
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2.5 text-xs font-semibold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-750 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <span>{currentIdx < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Calificar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
