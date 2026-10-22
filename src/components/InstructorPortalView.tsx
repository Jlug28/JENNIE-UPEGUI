import React, { useState, useId } from 'react';
import {
  Shield,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Mail,
  Users,
  Search,
  Download,
  FileSpreadsheet,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Settings,
  GraduationCap,
  LogOut
} from 'lucide-react';
import { InductionProgress, ApprenticeProfile } from '../types/induction';
import { GoogleSheetsSyncCard } from './GoogleSheetsSyncCard';
import { useAutoSync } from '../context/AutoSyncContext';

interface InstructorPortalViewProps {
  currentProgress: InductionProgress;
  onSwitchToApprenticeView: () => void;
  onExitToLanding?: () => void;
  onUpdateFichaConfig: (ficha: string, programName: string, regional: string, center: string) => void;
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
  updatedAt?: string;
}

export const InstructorPortalView: React.FC<InstructorPortalViewProps> = ({
  currentProgress,
  onSwitchToApprenticeView,
  onExitToLanding,
  onUpdateFichaConfig
}) => {
  const { sheetInfo } = useAutoSync();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Certificado' | 'En Proceso' | 'Pendiente'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [isEditingConfig, setIsEditingConfig] = useState(false);

  // Editable Ficha details
  const [fichaValue, setFichaValue] = useState(currentProgress.profile.ficha);
  const [programValue, setProgramValue] = useState(currentProgress.profile.programName);
  const [regionalValue, setRegionalValue] = useState(currentProgress.profile.regional);
  const [centerValue, setCenterValue] = useState(currentProgress.profile.center);

  // Generate dynamic Apprentice share link
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const apprenticeShareUrl = `${origin}${pathname}?role=aprendiz&ficha=${encodeURIComponent(
    fichaValue
  )}`;

  // Simulated cohort with real apprentice state dynamically included
  const cohortData: CohortStudent[] = [
    {
      id: `c-${currentProgress.profile.documentNumber}`,
      name: `${currentProgress.profile.name} (Aprendiz Activo)`,
      document: `${currentProgress.profile.documentType} ${currentProgress.profile.documentNumber}`,
      modulesDone: currentProgress.completedModuleIds.length,
      dilemmasDone: currentProgress.completedCaseIds.length,
      score: currentProgress.quizScore || (currentProgress.quizSubmitted ? 80 : 0),
      status: currentProgress.certificateId
        ? 'Certificado'
        : currentProgress.completedModuleIds.length > 0
        ? 'En Proceso'
        : 'Pendiente',
      certificateCode: currentProgress.certificateId || undefined,
      updatedAt: 'Hace instantes'
    },
    {
      id: 'c-1',
      name: 'Andrés Felipe Gómez Restrepo',
      document: 'CC 1024589231',
      modulesDone: 5,
      dilemmasDone: 6,
      score: 100,
      status: 'Certificado',
      certificateCode: 'SENA-IND-2024-AFG9',
      updatedAt: 'Hoy, 09:15 AM'
    },
    {
      id: 'c-2',
      name: 'María Alejandra Morales Castro',
      document: 'TI 1098451230',
      modulesDone: 5,
      dilemmasDone: 6,
      score: 90,
      status: 'Certificado',
      certificateCode: 'SENA-IND-2024-MAM3',
      updatedAt: 'Hoy, 08:42 AM'
    },
    {
      id: 'c-3',
      name: 'Santiago Quintero Rojas',
      document: 'CC 1123490182',
      modulesDone: 4,
      dilemmasDone: 5,
      score: 70,
      status: 'En Proceso',
      updatedAt: 'Ayer, 04:30 PM'
    },
    {
      id: 'c-4',
      name: 'Tatiana Muñoz Ospina',
      document: 'CC 1017849201',
      modulesDone: 5,
      dilemmasDone: 6,
      score: 95,
      status: 'Certificado',
      certificateCode: 'SENA-IND-2024-TMO2',
      updatedAt: 'Hoy, 10:05 AM'
    },
    {
      id: 'c-5',
      name: 'Juan Diego Palacios Hurtado',
      document: 'TI 1085209341',
      modulesDone: 2,
      dilemmasDone: 1,
      score: 0,
      status: 'En Proceso',
      updatedAt: 'Ayer, 02:18 PM'
    },
    {
      id: 'c-6',
      name: 'Paula Andrea Jaramillo Vélez',
      document: 'CC 1039847120',
      modulesDone: 0,
      dilemmasDone: 0,
      score: 0,
      status: 'Pendiente',
      updatedAt: 'No ha iniciado'
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(apprenticeShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessageTemplate = () => {
    const text = `¡Estimados Aprendices SENA! 🇨🇴\n\nLes damos la más cordial bienvenida a su proceso de formación profesional integral en el programa: *${programValue}* (Ficha: *${fichaValue}*).\n\nEn cumplimiento del nuevo Acuerdo 009 de 2024, es requisito institucional obligatorio completar la Inducción 360° y obtener su Certificado Oficial de Aprobación.\n\n🔗 *Enlace directo para realizar la inducción:*\n${apprenticeShareUrl}\n\n📌 *Instrucciones para los aprendices:*\n1. Ingresen al enlace y exploren los 5 Módulos Normativos interactivos.\n2. Resuelvan los 6 Casos y Dilemas éticos y disciplinarios.\n3. Presenten la Evaluación Gamificada (se aprueba con el 80% o más).\n4. Descarguen e impriman su Certificado Oficial con Código Único de Validación.\n\n*Nota:* Sus avances se sincronizan automáticamente con la lista oficial de la ficha. ¡Muchos éxitos en su formación SENA!`;

    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola Aprendices SENA! 👋\n\nAquí tienen el enlace oficial para realizar la *Inducción al Acuerdo 009 de 2024* para la *Ficha ${fichaValue}* (${programValue}):\n\n👉 ${apprenticeShareUrl}\n\nPor favor completen los módulos y descarguen su certificado oficial.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFichaConfig(fichaValue, programValue, regionalValue, centerValue);
    setIsEditingConfig(false);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Nombre,Documento,ModulosCompletados,DilemasResueltos,PuntajeEvaluacion,Estado,CodigoCertificado,UltimaActividad\n';
    const rows = cohortData
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.document}",${c.modulesDone},${c.dilemmasDone},${c.score}%,"${c.status}","${c.certificateCode || 'N/A'}","${c.updatedAt || ''}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Acta_Induccion_SENA_Ficha_${fichaValue}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCohort = cohortData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.document.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const certifiedCount = cohortData.filter((c) => c.status === 'Certificado').length;
  const inProgressCount = cohortData.filter((c) => c.status === 'En Proceso').length;
  const avgScore = Math.round(
    cohortData.filter((c) => c.score > 0).reduce((acc, c) => acc + c.score, 0) /
      (cohortData.filter((c) => c.score > 0).length || 1)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner for Instructor Portal */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#39A900]/15 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Consola Exclusiva de Instructor y Coordinación SENA</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white leading-tight">
              Gestión Integral de Ficha {fichaValue}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Supervise el avance en tiempo real de los aprendices, configure la sincronización automática con Google Drive y distribuya el enlace personalizado para que los aprendices realicen su inducción sin acceso a funciones administrativas.
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 font-mono pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <GraduationCap className="w-4 h-4 text-[#39A900]" />
                {programValue}
              </span>
              <span>·</span>
              <span>{regionalValue}</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">Acuerdo 009 de 2024</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={onSwitchToApprenticeView}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center justify-center gap-2 backdrop-blur-xs transition-all shadow-xs"
              title="Ver la plataforma exactamente como la ven los aprendices"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Ver como Aprendiz</span>
            </button>

            <button
              onClick={() => setIsEditingConfig(!isEditingConfig)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>{isEditingConfig ? 'Cerrar Parámetros' : 'Configurar Ficha'}</span>
            </button>

            {onExitToLanding && (
              <button
                onClick={onExitToLanding}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                title="Cerrar sesión y volver al landing de selección de roles"
              >
                <LogOut className="w-4 h-4 text-slate-400" />
                <span>Cambiar de Rol</span>
              </button>
            )}
          </div>
        </div>

        {/* Ficha Configuration Drawer */}
        {isEditingConfig && (
          <form
            onSubmit={handleSaveConfig}
            className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-150 text-xs"
          >
            <div>
              <label className="text-slate-400 block font-medium mb-1">Número de Ficha</label>
              <input
                type="text"
                value={fichaValue}
                onChange={(e) => setFichaValue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                placeholder="2873491"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 block font-medium mb-1">Programa de Formación</label>
              <input
                type="text"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                placeholder="Análisis y Desarrollo de Software (ADSO)"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 block font-medium mb-1">Regional SENA</label>
              <input
                type="text"
                value={regionalValue}
                onChange={(e) => setRegionalValue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                placeholder="Regional Distrito Capital"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 block font-medium mb-1">Centro de Formación</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={centerValue}
                  onChange={(e) => setCenterValue(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                  placeholder="Centro de Electricidad, Electrónica..."
                  required
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white font-bold rounded-lg shrink-0 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* SECTION 1: SHARE INDUCTION LINK CARD (High Priority) */}
      <section className="bg-gradient-to-br from-emerald-500/10 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-800/60 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#39A900] text-white flex items-center justify-center shadow-md shrink-0">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Enlace Oficial de Inducción para Aprendices
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  Acceso Restringido Aprendiz
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Comparta este enlace a través de WhatsApp, Teams o correo. Los aprendices accederán directamente a su ruta formativa sin ver controles ni configuraciones de Google Drive.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Ficha activa: <strong className="text-slate-900 dark:text-white">{fichaValue}</strong>
            </span>
          </div>
        </div>

        {/* URL Box & Action Buttons */}
        <div className="p-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 truncate select-all">
            {apprenticeShareUrl}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#39A900] hover:bg-[#2d8500] text-white'
              }`}
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center gap-1.5 transition-all shadow-xs"
              title="Compartir por WhatsApp Web o App"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopyMessageTemplate}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                copiedTemplate
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title="Copiar plantilla de invitación con instrucciones para Teams, Zajuna o Correo"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              <span>{copiedTemplate ? '¡Plantilla Copiada!' : 'Copiar Mensaje Teams/Correo'}</span>
            </button>
          </div>
        </div>

        {/* Helper Instructions Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
            <span>
              Los aprendices que ingresen con este enlace registrarán su documento, nombre y avances automáticamente en su hoja de cálculo.
            </span>
          </div>
          <button
            onClick={onSwitchToApprenticeView}
            className="text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Simular ingreso de aprendiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* SECTION 2: GOOGLE DRIVE / SHEETS SYNCHRONIZATION (Exclusive to Instructor) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#39A900]" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Almacenamiento en Google Drive y Hojas de Cálculo
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Visible únicamente en su Consola de Instructor
          </span>
        </div>

        {/* Google Sheets Sync Card with cohort & active progress */}
        <GoogleSheetsSyncCard
          currentProgress={currentProgress}
          cohortData={cohortData}
        />
      </section>

      {/* SECTION 3: KEY COHORT METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
            Aprendices Certificados
          </span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-1">
            {certifiedCount} / {cohortData.length}{' '}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
              ({Math.round((certifiedCount / cohortData.length) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-[#39A900] h-1.5 rounded-full"
              style={{ width: `${(certifiedCount / cohortData.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
            En Proceso de Inducción
          </span>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums mt-1">
            {inProgressCount} Aprendices
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-3">
            Completando módulos normativos o casos
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
            Promedio de Aprobación
          </span>
          <div className="text-2xl font-extrabold text-[#39A900] dark:text-[#52c41a] font-mono tabular-nums mt-1">
            {avgScore}%
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-3">
            Mínimo institucional requerido: 80%
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
            Régimen Normativo Aplicado
          </span>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
            Acuerdo 009 de 2024
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-1">
            Diario Oficial 52.947 (Mod. 2026)
          </span>
        </div>
      </section>

      {/* SECTION 4: PEDAGOGICAL DIAGNOSTIC INSIGHTS */}
      <section className="p-5 bg-amber-50/80 dark:bg-amber-950/25 rounded-2xl border border-amber-200 dark:border-amber-800/60 space-y-2.5 text-xs">
        <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="text-sm">Diagnóstico Pedagógico de la Ficha (Puntos para Taller Presencial)</span>
        </div>
        <p className="text-amber-800 dark:text-amber-200/90 leading-relaxed">
          De acuerdo con las respuestas registradas en los dilemas éticos y evaluación final, el <strong>38% de los aprendices</strong> presenta dudas sobre la distinción entre <em>Medidas Formativas</em> (llamado de atención verbal y plan de mejoramiento pedagógico) y <em>Sanciones Disciplinarias</em> (llamado de atención escrito, condicionamiento o cancelación de matrícula que exigen debido proceso formal según los artículos 33 y 34 del Acuerdo 009 de 2024).
        </p>
      </section>

      {/* SECTION 5: APPRENTICES TRACKING TABLE */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Seguimiento Individual de Aprendices · Ficha {fichaValue}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Estado de avance, evaluación y certificación de cada aprendiz registrado en la ficha.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl transition-colors flex items-center gap-2 border border-slate-700 shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Acta (CSV)</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar aprendiz por nombre o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Todos ({cohortData.length})
            </button>
            <button
              onClick={() => setStatusFilter('Certificado')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === 'Certificado'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Certificados ({certifiedCount})
            </button>
            <button
              onClick={() => setStatusFilter('En Proceso')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === 'En Proceso'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              En Proceso ({inProgressCount})
            </button>
            <button
              onClick={() => setStatusFilter('Pendiente')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === 'Pendiente'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Pendientes
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Aprendiz</th>
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Módulos</th>
                <th className="px-4 py-3">Dilemas</th>
                <th className="px-4 py-3">Calificación</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Cód. Certificado</th>
                <th className="px-4 py-3">Última Actividad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCohort.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 font-mono">
                    {item.document}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                    {item.modulesDone}/5
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                    {item.dilemmasDone}/6
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-white">
                    {item.score > 0 ? `${item.score}%` : '—'}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Certificado'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : item.status === 'En Proceso'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {item.certificateCode || 'Pendiente'}
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-400">
                    {item.updatedAt || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
