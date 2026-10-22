import React, { useState } from 'react';
import { X, AlertTriangle, Download, Shield, Search } from 'lucide-react';
import { InductionProgress } from '../types/induction';
import { GoogleSheetsSyncCard } from './GoogleSheetsSyncCard';

interface InstructorDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProgress: InductionProgress;
}

interface CohortStudent {
  id: string;
  name: string;
  document: string;
  modulesDone: number;
  dilemmasDone: number;
  score: number;
  status: 'Certificado' | 'En Proceso' | 'Pendiente';
  certificateCode?: string;
}

export const InstructorDashboardModal: React.FC<InstructorDashboardModalProps> = ({
  isOpen,
  onClose,
  currentProgress,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Cohort mock data combined with current apprentice progress
  const cohortData: CohortStudent[] = [
    {
      id: 'c-0',
      name: `${currentProgress.profile.name} (Tú)`,
      document: `${currentProgress.profile.documentType} ${currentProgress.profile.documentNumber}`,
      modulesDone: currentProgress.completedModuleIds.length,
      dilemmasDone: currentProgress.completedCaseIds.length,
      score: currentProgress.quizScore || (currentProgress.quizSubmitted ? 80 : 0),
      status: currentProgress.certificateId ? 'Certificado' : currentProgress.completedModuleIds.length > 0 ? 'En Proceso' : 'Pendiente',
      certificateCode: currentProgress.certificateId || undefined
    },
    {
      id: 'c-1',
      name: 'Andrés Felipe Gómez',
      document: 'CC 1024589231',
      modulesDone: 5,
      dilemmasDone: 6,
      score: 100,
      status: 'Certificado',
      certificateCode: 'SENA-IND-2024-AFG9'
    },
    {
      id: 'c-2',
      name: 'María Alejandra Morales',
      document: 'TI 1098451230',
      modulesDone: 5,
      dilemmasDone: 6,
      score: 90,
      status: 'Certificado',
      certificateCode: 'SENA-IND-2024-MAM3'
    },
    {
      id: 'c-3',
      name: 'Santiago Quintero Rojas',
      document: 'CC 1123490182',
      modulesDone: 4,
      dilemmasDone: 5,
      score: 70,
      status: 'En Proceso'
    },
    {
      id: 'c-4',
      name: 'Tatiana Muñoz Ospina',
      document: 'CC 1017849201',
      modulesDone: 5,
      dilemmasDone: 6,
      score: 95,
      status: 'Certificado',
      certificateCode: 'SENA-IND-2024-TMO2'
    },
    {
      id: 'c-5',
      name: 'Juan Diego Palacios',
      document: 'TI 1085209341',
      modulesDone: 2,
      dilemmasDone: 1,
      score: 0,
      status: 'En Proceso'
    },
    {
      id: 'c-6',
      name: 'Paula Andrea Jaramillo',
      document: 'CC 1039847120',
      modulesDone: 0,
      dilemmasDone: 0,
      score: 0,
      status: 'Pendiente'
    }
  ];

  const filtered = cohortData.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.document.includes(searchTerm)
  );

  const certifiedCount = cohortData.filter((c) => c.status === 'Certificado').length;
  const avgScore = Math.round(
    cohortData.filter((c) => c.score > 0).reduce((acc, c) => acc + c.score, 0) /
    (cohortData.filter((c) => c.score > 0).length || 1)
  );

  const handleExportCSV = () => {
    const headers = 'ID,Nombre,Documento,Modulos,Dilemas,Puntaje,Estado,CodigoCertificado\n';
    const rows = cohortData
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.document}",${c.modulesDone},${c.dilemmasDone},${c.score}%,"${c.status}","${c.certificateCode || 'N/A'}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Acta_Induccion_SENA_Ficha_${currentProgress.profile.ficha}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#39A900] dark:text-[#52c41a] border border-slate-700">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display leading-tight">
                Consola del Instructor y Coordinación SENA
              </h2>
              <span className="text-xs text-slate-400">
                Monitoreo de Ficha {currentProgress.profile.ficha} · {currentProgress.profile.programName}
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-750">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Aprendices Certificados</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-1">
                {certifiedCount} / {cohortData.length}{' '}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  ({Math.round((certifiedCount / cohortData.length) * 100)}%)
                </span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-750">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Promedio de Aprobación</span>
              <div className="text-2xl font-extrabold text-[#39A900] dark:text-[#52c41a] font-mono tabular-nums mt-1">
                {avgScore}%
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-750">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Régimen Normativo</span>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">
                Acuerdo 009 de 2024 (Mod. 2026)
              </div>
            </div>
          </div>

          {/* Google Sheets / Drive Cloud Sync Card */}
          <GoogleSheetsSyncCard
            currentProgress={currentProgress}
            cohortData={cohortData}
          />

          {/* Critical pedagogical diagnostic insights for instructors */}
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/70 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Puntos de Mayor Confusión en el Grupo (Recomendados para Sesión Presencial)</span>
            </div>
            <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed">
              El 42% de los aprendices presentó errores iniciales en la diferencia jurídica entre <em>Llamado de atención escrito con plan de mejora</em> (sanción formal con debido proceso) y <em>Llamado de atención verbal</em> (medida formativa pedagógica). Se aconseja profundizar este punto en el taller de inducción.
            </p>
          </div>

          {/* Search & Table */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar aprendiz por nombre o documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <button
                onClick={handleExportCSV}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0 border border-transparent dark:border-slate-700"
              >
                <Download className="w-4 h-4" />
                <span>Exportar Acta de Inducción (CSV)</span>
              </button>
            </div>

            {/* Apprentices Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Aprendiz</th>
                    <th className="px-4 py-3">Documento</th>
                    <th className="px-4 py-3">Módulos</th>
                    <th className="px-4 py-3">Casos</th>
                    <th className="px-4 py-3">Puntaje</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Código Certificado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{item.name}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono">{item.document}</td>
                      <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">{item.modulesDone}/5</td>
                      <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">{item.dilemmasDone}/6</td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                        {item.score > 0 ? `${item.score}%` : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Certificado'
                              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                              : item.status === 'En Proceso'
                              ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {item.certificateCode || 'Pendiente'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Cerrar Consola
          </button>
        </div>
      </div>
    </div>
  );
};
