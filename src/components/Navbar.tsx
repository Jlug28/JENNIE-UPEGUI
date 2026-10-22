import React from 'react';
import { Award, Shield, Moon, Sun, ExternalLink, Share2, Eye, UserCheck, KeyRound, LogOut } from 'lucide-react';
import { InductionProgress } from '../types/induction';
import { useAutoSync } from '../context/AutoSyncContext';
import { SENA_AVATARS } from '../data/avatars';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  userRole: 'instructor' | 'aprendiz';
  onSwitchToInstructorAuth: () => void;
  onSwitchToApprenticeView: () => void;
  onExitToRoleSelection: () => void;
  activeTab: 'modulos' | 'dilemas' | 'evaluacion' | 'certificado' | 'plan' | 'avatar' | 'instructor';
  setActiveTab: (tab: 'modulos' | 'dilemas' | 'evaluacion' | 'certificado' | 'plan' | 'avatar' | 'instructor') => void;
  progress: InductionProgress;
  onOpenProfile: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userRole,
  onSwitchToInstructorAuth,
  onSwitchToApprenticeView,
  onExitToRoleSelection,
  activeTab,
  setActiveTab,
  progress,
  onOpenProfile,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const isCertified = Boolean(progress.certificateId);
  const { user, sheetInfo, syncStatus, connectGoogleDrive } = useAutoSync();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab(userRole === 'instructor' ? 'instructor' : 'modulos')}
          className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform shrink-0">
            <img
              src="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%201000%201000'%20style='enable-background:new%200%200%201000%201000;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id='path47-5'%20class='st0'%20d='M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z'/%3e%3cg%20id='_x23_000000ff-2'%20transform='matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)'%3e%3c/g%3e%3c/svg%3e"
              alt="Logo Oficial SENA"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display whitespace-nowrap block">
                SENA Inducción 360°
              </span>
              {userRole === 'instructor' ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hidden sm:inline-block">
                  Instructor
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hidden sm:inline-block">
                  Aprendiz
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block whitespace-nowrap">
              Reglamento del Aprendiz Acuerdo 009 de 2024
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {/* Tab Instructor (Only visible when userRole === 'instructor') */}
          {userRole === 'instructor' && (
            <button
              onClick={() => setActiveTab('instructor')}
              className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
                activeTab === 'instructor'
                  ? 'text-[#39A900] dark:text-[#52c41a] font-bold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white text-slate-900 dark:text-white font-semibold'
              }`}
            >
              <Shield className="w-4 h-4 text-[#39A900]" />
              Consola de la Ficha
            </button>
          )}

          <button
            onClick={() => setActiveTab('modulos')}
            className={`whitespace-nowrap transition-colors py-1 flex-shrink-0 ${
              activeTab === 'modulos'
                ? 'text-[#39A900] dark:text-[#52c41a] font-semibold border-b-2 border-[#39A900]'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Módulos Normativos
          </button>

          <button
            onClick={() => setActiveTab('dilemas')}
            className={`whitespace-nowrap transition-colors py-1 flex-shrink-0 ${
              activeTab === 'dilemas'
                ? 'text-[#39A900] dark:text-[#52c41a] font-semibold border-b-2 border-[#39A900]'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Casos y Dilemas ({progress.completedCaseIds.length}/6)
          </button>

          <button
            onClick={() => setActiveTab('evaluacion')}
            className={`whitespace-nowrap transition-colors py-1 flex-shrink-0 ${
              activeTab === 'evaluacion'
                ? 'text-[#39A900] dark:text-[#52c41a] font-semibold border-b-2 border-[#39A900]'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Evaluación Gamificada
          </button>

          <button
            onClick={() => setActiveTab('certificado')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'certificado'
                ? 'text-[#39A900] dark:text-[#52c41a] font-semibold border-b-2 border-[#39A900]'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            Certificado {isCertified ? '✓' : ''}
          </button>

          <button
            onClick={() => setActiveTab('plan')}
            className={`whitespace-nowrap transition-colors py-1 flex-shrink-0 ${
              activeTab === 'plan'
                ? 'text-[#39A900] dark:text-[#52c41a] font-semibold border-b-2 border-[#39A900]'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Plan Pedagógico
          </button>

          <button
            onClick={() => setActiveTab('avatar')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'avatar'
                ? 'text-[#39A900] dark:text-[#52c41a] font-bold border-b-2 border-[#39A900]'
                : 'hover:text-slate-900 dark:hover:text-white text-slate-700 dark:text-slate-300 font-semibold'
            }`}
          >
            <span>🎭 Arena Avatares</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Role Control */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-all focus:outline-none"
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-all focus:outline-none flex items-center gap-1 shadow-xs"
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            aria-label="Toggle language"
          >
            <span>🌐</span>
            <span>{language === 'es' ? 'EN' : 'ES'}</span>
          </button>

          {/* INSTRUCTOR EXCLUSIVE CONTROLS */}
          {userRole === 'instructor' && (
            <>
              {/* Google Drive Status Link (Only for Instructor) */}
              {user && sheetInfo && (
                <a
                  href={sheetInfo.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold transition-colors"
                  title="Abrir hoja de cálculo de la ficha en Google Drive"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      syncStatus === 'syncing' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
                    }`}
                  />
                  <span>Hoja en Drive</span>
                  <ExternalLink className="w-3 h-3 text-[#39A900]" />
                </a>
              )}

              {/* Quick Share Link Trigger */}
              <button
                onClick={() => setActiveTab('instructor')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-semibold shadow-xs transition-colors"
                title="Generar y copiar el enlace para compartir con los aprendices"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartir a Aprendices</span>
              </button>

              {/* Switch to Apprentice View Button */}
              <button
                onClick={onSwitchToApprenticeView}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                title="Probar la vista de aprendiz"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">Vista Aprendiz</span>
              </button>

              {/* Exit to Role Selection Landing */}
              <button
                onClick={onExitToRoleSelection}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0 shadow-xs"
                title="Cerrar sesión de instructor y volver al inicio"
              >
                <LogOut className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Salir al Inicio</span>
              </button>
            </>
          )}

          {/* APPRENTICE MODE CONTROLS */}
          {userRole === 'aprendiz' && (
            <>
              {/* Profile Chip */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 transition-all text-xs font-medium whitespace-nowrap shadow-xs shrink-0"
                title="Ver y configurar tus datos de aprendiz"
              >
                <div className="w-5 h-5 rounded-full bg-[#39A900]/20 flex items-center justify-center text-xs">
                  {SENA_AVATARS.find((a) => a.id === progress.profile.avatar)?.icon || '💻'}
                </div>
                <span className="truncate max-w-[90px] sm:max-w-[130px]">
                  {progress.profile.name}
                </span>
                <span className="bg-slate-800 dark:bg-slate-950 px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 tabular-nums">
                  {progress.xp} XP
                </span>
              </button>

              {/* Discreet Switch to Instructor with PIN */}
              <button
                onClick={onSwitchToInstructorAuth}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                title="Acceso para Instructor / Coordinación (Requiere clave institucional)"
              >
                <KeyRound className="w-4 h-4" />
              </button>

              {/* Exit to Role Selection Landing */}
              <button
                onClick={onExitToRoleSelection}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0 shadow-xs"
                title="Cerrar sesión actual y volver al inicio"
              >
                <LogOut className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Salir al Inicio</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-2 px-4 py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto text-xs text-slate-600 dark:text-slate-400 font-medium bg-white dark:bg-slate-900">
        {userRole === 'instructor' && (
          <button
            onClick={() => setActiveTab('instructor')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded flex items-center gap-1 ${
              activeTab === 'instructor'
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold'
                : 'font-semibold text-slate-800 dark:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#39A900]" />
            Consola Ficha
          </button>
        )}

        <button
          onClick={() => setActiveTab('modulos')}
          className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
            activeTab === 'modulos'
              ? 'bg-slate-100 dark:bg-slate-800 text-[#39A900] dark:text-[#52c41a] font-semibold'
              : ''
          }`}
        >
          Módulos
        </button>

        <button
          onClick={() => setActiveTab('dilemas')}
          className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
            activeTab === 'dilemas'
              ? 'bg-slate-100 dark:bg-slate-800 text-[#39A900] dark:text-[#52c41a] font-semibold'
              : ''
          }`}
        >
          Dilemas ({progress.completedCaseIds.length}/6)
        </button>

        <button
          onClick={() => setActiveTab('evaluacion')}
          className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
            activeTab === 'evaluacion'
              ? 'bg-slate-100 dark:bg-slate-800 text-[#39A900] dark:text-[#52c41a] font-semibold'
              : ''
          }`}
        >
          Evaluación
        </button>

        <button
          onClick={() => setActiveTab('certificado')}
          className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
            activeTab === 'certificado'
              ? 'bg-slate-100 dark:bg-slate-800 text-[#39A900] dark:text-[#52c41a] font-semibold'
              : ''
          }`}
        >
          Certificado {isCertified ? '✓' : ''}
        </button>

        <button
          onClick={() => setActiveTab('plan')}
          className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
            activeTab === 'plan'
              ? 'bg-slate-100 dark:bg-slate-800 text-[#39A900] dark:text-[#52c41a] font-semibold'
              : ''
          }`}
        >
          Plan
        </button>

        <button
          onClick={onExitToRoleSelection}
          className="whitespace-nowrap shrink-0 px-2.5 py-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 ml-auto"
          title="Salir y cambiar de rol"
        >
          <LogOut className="w-3 h-3" />
          <span>Cambiar Rol</span>
        </button>
      </div>
    </header>
  );
};
