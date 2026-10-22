import React, { useState } from 'react';
import {
  GraduationCap,
  Shield,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  BookOpen,
  FileSpreadsheet,
  Award,
  Sparkles,
  Sun,
  Moon,
  Play,
  X
} from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';
import { SENA_AVATARS } from '../data/avatars';
import { useLanguage } from '../context/LanguageContext';

interface RoleSelectionLandingProps {
  initialProfile: ApprenticeProfile;
  initialRole?: 'instructor' | 'aprendiz' | null;
  onSelectApprentice: (profile: ApprenticeProfile) => void;
  onSelectInstructor: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const REGIONAL_LIST = [
  'Regional Distrito Capital',
  'Regional Antioquia',
  'Regional Valle del Cauca',
  'Regional Santander',
  'Regional Atlántico',
  'Regional Bolívar',
  'Regional Caldas',
  'Regional Boyacá',
  'Regional Tolima',
  'Regional Huila',
  'Regional Nariño',
  'Regional Meta',
  'Regional Risaralda',
  'Regional Cundinamarca',
  'Regional Cauca',
  'Regional Norte de Santander'
];

const SAMPLE_PROGRAMS = [
  'Análisis y Desarrollo de Software (ADSO)',
  'Gestión Empresarial y Administrativa',
  'Mantenimiento Mecatrónico Industrial',
  'Producción Multimedia y Animación 3D',
  'Gestión del Talento Humano',
  'Contabilidad y Finanzas',
  'Desarrollo de Procesos Biotecnológicos',
  'Logística y Operaciones Portuarias',
  'Redes de Datos y Seguridad Informática',
  'Diseño e Integración de Multimedia'
];

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  initialProfile,
  initialRole = null,
  onSelectApprentice,
  onSelectInstructor,
  isDarkMode,
  onToggleDarkMode
}) => {
  const { language, setLanguage } = useLanguage();
  // Selected tab on mobile/desktop focus
  const [selectedRole, setSelectedRole] = useState<'aprendiz' | 'instructor'>(
    initialRole === 'instructor' ? 'instructor' : 'aprendiz'
  );

  // Apprentice Characterization Form State
  const [apprenticeForm, setApprenticeForm] = useState<ApprenticeProfile>({
    ...initialProfile,
    avatar: initialProfile.avatar || 'dev'
  });
  const [apprenticeFormError, setApprenticeFormError] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Instructor Password State
  const [instructorPassword, setInstructorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [instructorError, setInstructorError] = useState<string | null>(null);
  const [instructorSuccess, setInstructorSuccess] = useState(false);

  // Submit Apprentice Form (NO PASSWORD REQUIRED)
  const handleApprenticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apprenticeForm.name.trim()) {
      setApprenticeFormError('Por favor ingrese su nombre completo.');
      return;
    }
    if (!apprenticeForm.documentNumber.trim()) {
      setApprenticeFormError('Por favor ingrese su número de documento.');
      return;
    }
    if (!apprenticeForm.ficha.trim()) {
      setApprenticeFormError('Por favor ingrese el número de ficha.');
      return;
    }

    setApprenticeFormError(null);
    onSelectApprentice(apprenticeForm);
  };

  // Submit Instructor Password (REQUIRES 'Sena2026')
  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = instructorPassword.trim();
    if (cleanPass === 'Sena2026' || cleanPass.toLowerCase() === 'sena2026') {
      setInstructorError(null);
      setInstructorSuccess(true);
      setTimeout(() => {
        onSelectInstructor();
      }, 400);
    } else {
      setInstructorError('Clave incorrecta. Ingrese la clave institucional autorizada.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden transition-colors">
      {/* Background ambient decorative shapes */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#39A900]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-[#39A900]/5 blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center p-0.5 shrink-0">
              <img
                src="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%201000%201000'%20style='enable-background:new%200%200%201000%201000;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id='path47-5'%20class='st0'%20d='M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z'/%3e%3cg%20id='_x23_000000ff-2'%20transform='matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)'%3e%3c/g%3e%3c/svg%3e"
                alt="Logo SENA"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white block">
                SENA Inducción 360°
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Reglamento del Aprendiz Acuerdo 009 de 2024
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1 shadow-xs"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <span>🌐</span>
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1 flex flex-col justify-center">
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Sistema Oficial de Inducción Institucional</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Selecciona tu Perfil de Ingreso
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Para garantizar la correcta diferenciación de pantallas y permisos, ingresa de acuerdo con tu rol en el centro de formación.
          </p>

          {/* Tutorial Video Trigger Button */}
          <div className="pt-2 pb-1 flex justify-center">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0">
                <Play className="w-3 h-3 fill-white" />
              </div>
              <span>Ver Video Tutorial de Inducción</span>
            </button>
          </div>

          {/* Role Switcher Tabs */}
          <div className="max-w-xl mx-auto w-full pt-2">
            <div className="grid grid-cols-2 p-1.5 bg-slate-200/90 dark:bg-slate-800/90 rounded-2xl border border-slate-300/80 dark:border-slate-700 gap-1.5 shadow-inner">
              <button
                type="button"
                onClick={() => setSelectedRole('aprendiz')}
                className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all text-xs sm:text-sm font-bold cursor-pointer ${
                  selectedRole === 'aprendiz'
                    ? 'bg-white dark:bg-slate-900 text-[#39A900] shadow-md border border-slate-200 dark:border-slate-700 scale-[1.01]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className={`w-5 h-5 shrink-0 ${selectedRole === 'aprendiz' ? 'text-[#39A900]' : 'text-slate-400'}`} />
                <div className="text-left">
                  <span className="block leading-tight">Soy Aprendiz</span>
                  <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 hidden sm:block">
                    Sin clave · Caracterización
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('instructor')}
                className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all text-xs sm:text-sm font-bold cursor-pointer ${
                  selectedRole === 'instructor'
                    ? 'bg-white dark:bg-slate-900 text-[#39A900] shadow-md border border-slate-200 dark:border-slate-700 scale-[1.01]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Shield className={`w-5 h-5 shrink-0 ${selectedRole === 'instructor' ? 'text-[#39A900]' : 'text-slate-400'}`} />
                <div className="text-left">
                  <span className="block leading-tight">Soy Instructor</span>
                  <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 hidden sm:block">
                    Acceso institucional · Gestión
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Exclusive Single Card View: Only renders the chosen role */}
        <div className="w-full">
          {/* APPRENTICE CARD - ONLY VISIBLE WHEN selectedRole === 'aprendiz' */}
          {selectedRole === 'aprendiz' && (
            <div className="max-w-2xl mx-auto w-full transition-all duration-300">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-[#39A900] ring-4 ring-[#39A900]/10 shadow-2xl overflow-hidden">
                {/* Card Header */}
                <div className="p-6 sm:p-7 bg-gradient-to-br from-emerald-500/10 via-white to-slate-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#39A900] text-white flex items-center justify-center shadow-md shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                            Perfil Aprendiz
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Sin clave de acceso
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                          Caracterización & Ruta del Aprendiz
                        </h2>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    Ingresa tus datos personales y de ficha para personalizar tu inducción institucional, registrar tus logros y emitir tu Certificado Oficial con Código Único de Validación.
                  </p>
                </div>

                {/* Characterization Form */}
                <form onSubmit={handleApprenticeSubmit} className="p-6 sm:p-7 space-y-4">
                  {apprenticeFormError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                      <span>{apprenticeFormError}</span>
                    </div>
                  )}

                  {/* Gamified Avatar Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Selecciona tu Avatar Gamificado *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {SENA_AVATARS.map((av) => {
                        const isSelected = apprenticeForm.avatar === av.id;
                        return (
                          <button
                            key={av.id}
                            type="button"
                            onClick={() => setApprenticeForm({ ...apprenticeForm, avatar: av.id })}
                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] ring-2 ring-[#39A900]/30 shadow-xs scale-105'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                            title={av.name}
                          >
                            <span className="text-2xl mb-1">{av.icon}</span>
                            <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 text-center truncate w-full">
                              {av.name.split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nombre Completo del Aprendiz *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Jennie Upeguí"
                      value={apprenticeForm.name}
                      onChange={(e) =>
                        setApprenticeForm({ ...apprenticeForm, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  {/* Document Type & Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo Documento
                      </label>
                      <select
                        value={apprenticeForm.documentType}
                        onChange={(e) =>
                          setApprenticeForm({
                            ...apprenticeForm,
                            documentType: e.target.value as any
                          })
                        }
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      >
                        <option value="CC">CC - Cédula</option>
                        <option value="TI">TI - Tarjeta Id</option>
                        <option value="CE">CE - Extranjería</option>
                        <option value="PEP">PEP - Permiso</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: 1023847519"
                        value={apprenticeForm.documentNumber}
                        onChange={(e) =>
                          setApprenticeForm({
                            ...apprenticeForm,
                            documentNumber: e.target.value
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>

                  {/* Ficha & Program */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Ficha SENA *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="2873491"
                        value={apprenticeForm.ficha}
                        onChange={(e) =>
                          setApprenticeForm({ ...apprenticeForm, ficha: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-[#39A900] rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Programa de Formación *
                      </label>
                      <input
                        type="text"
                        list="landing-programs-list"
                        required
                        placeholder="Ej: Análisis y Desarrollo de Software (ADSO)"
                        value={apprenticeForm.programName}
                        onChange={(e) =>
                          setApprenticeForm({
                            ...apprenticeForm,
                            programName: e.target.value
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                      <datalist id="landing-programs-list">
                        {SAMPLE_PROGRAMS.map((prog) => (
                          <option key={prog} value={prog} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  {/* Regional & Center */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Regional
                      </label>
                      <select
                        value={apprenticeForm.regional}
                        onChange={(e) =>
                          setApprenticeForm({
                            ...apprenticeForm,
                            regional: e.target.value
                          })
                        }
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      >
                        {REGIONAL_LIST.map((reg) => (
                          <option key={reg} value={reg}>
                            {reg}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Centro de Formación
                      </label>
                      <input
                        type="text"
                        value={apprenticeForm.center}
                        onChange={(e) =>
                          setApprenticeForm({
                            ...apprenticeForm,
                            center: e.target.value
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Correo Electrónico (Para recibir certificación)
                    </label>
                    <input
                      type="email"
                      placeholder="ejemplo@soy.sena.edu.co"
                      value={apprenticeForm.email}
                      onChange={(e) =>
                        setApprenticeForm({ ...apprenticeForm, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Ingresar a mi Inducción SENA</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
                      No requiere contraseña · Tus datos se sincronizan con la ficha oficial
                    </p>
                  </div>
                </form>

                {/* Bottom Switcher Link */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    ¿Es usted Instructor o Coordinador de Ficha?
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('instructor')}
                    className="font-bold text-[#39A900] hover:text-[#2d8500] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Cambiar a ingreso de Instructor</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* INSTRUCTOR CARD - ONLY VISIBLE WHEN selectedRole === 'instructor' */}
          {selectedRole === 'instructor' && (
            <div className="max-w-xl mx-auto w-full transition-all duration-300">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-800 dark:border-slate-600 ring-4 ring-slate-800/10 dark:ring-slate-700/30 shadow-2xl overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border-b border-slate-800">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-[#39A900] flex items-center justify-center shadow-md shrink-0">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
                            Perfil Administrativo
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                          Instructor & Coordinación
                        </h2>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                      Consola para el seguimiento de la ficha, sincronización en Google Drive / Google Sheets, métricas pedagógicas y generación de actas.
                    </p>
                  </div>

                  {/* Password Form */}
                  <form onSubmit={handleInstructorSubmit} className="p-6 sm:p-7 space-y-4">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <KeyRound className="w-4 h-4 text-[#39A900]" />
                        <span>Requiere Clave Institucional</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        Para resguardar los registros del grupo y las opciones de Google Drive, ingrese la clave autorizada de instructor asignada por el centro.
                      </p>
                    </div>

                    {instructorError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                        <span>{instructorError}</span>
                      </div>
                    )}

                    {instructorSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                        <span>Clave verificada. Abriendo Consola del Instructor...</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Clave de Acceso del Instructor *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Ingrese la clave institucional"
                          value={instructorPassword}
                          onChange={(e) => {
                            setInstructorPassword(e.target.value);
                            setInstructorError(null);
                          }}
                          className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!instructorPassword.trim() || instructorSuccess}
                        className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-transparent dark:border-slate-700"
                      >
                        <span>Acceder a Consola del Instructor</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Instructor Feature Highlights */}
                <div className="p-6 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px] uppercase tracking-wider">
                    Funciones exclusivas del instructor:
                  </span>
                  <ul className="space-y-1.5 text-[11px]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>Sincronización en Google Drive y Hojas de cálculo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>Generador de enlaces para compartir por WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>Exportación de Acta de Inducción de la Ficha en CSV</span>
                    </li>
                  </ul>
                </div>

                {/* Bottom Switcher Link */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    ¿Es usted Aprendiz SENA?
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('aprendiz')}
                    className="font-bold text-[#39A900] hover:text-[#2d8500] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Ir a caracterización de Aprendiz</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>Servicio Nacional de Aprendizaje SENA · República de Colombia</span>
            <span aria-hidden="true">·</span>
            <span>Acuerdo 009 de 2024 (Diario Oficial 52.947)</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Dirección de Formación Profesional Integral · Bienestar al Aprendiz
          </div>
        </div>
      </footer>

      {/* Video Tutorial Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="font-bold font-display text-slate-900 dark:text-white text-sm sm:text-base">
                    Video Tutorial Oficial · Inducción SENA 360°
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Aprenda a utilizar las herramientas, módulos y rutas de aprendizaje.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Cerrar video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full max-h-[70vh] rounded-2xl shadow-xl object-contain bg-black"
                src="/assets/aistudio/2026__4_27_p.m._0abd5587.mp4"
              >
                Su navegador no soporta la reproducción de video HTML5.
              </video>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Reproduciendo tutorial en ventana flotante</span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-colors cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
