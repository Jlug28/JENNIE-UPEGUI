/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleList } from './components/ModuleList';
import { ModuleReaderModal } from './components/ModuleReaderModal';
import { DilemmaSimulator } from './components/DilemmaSimulator';
import { GamifiedQuiz } from './components/GamifiedQuiz';
import { CertificateView } from './components/CertificateView';
import { StructuredPlanView } from './components/StructuredPlanView';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { InstructorDashboardModal } from './components/InstructorDashboardModal';
import { InstructorPortalView } from './components/InstructorPortalView';
import { RoleAuthModal } from './components/RoleAuthModal';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { AvatarGamifiedExercise } from './components/AvatarGamifiedExercise';
import { AutoSyncProvider } from './context/AutoSyncContext';
import { Shield, Eye, ArrowRight, KeyRound, LogOut } from 'lucide-react';

import {
  INITIAL_REGULATION_MODULES,
  CASE_DILEMMAS,
  EVALUATION_QUIZ,
  INITIAL_BADGES,
} from './data/senaRegulationData';
import { InductionProgress, RegulationModule, ApprenticeProfile } from './types/induction';

const DEFAULT_PROFILE: ApprenticeProfile = {
  name: 'Jennie Upeguí',
  documentType: 'CC',
  documentNumber: '1023847519',
  ficha: '2873491',
  programName: 'Análisis y Desarrollo de Software (ADSO)',
  regional: 'Regional Distrito Capital',
  center: 'Centro de Electricidad, Electrónica y Telecomunicaciones',
  email: 'jennie.upe@gmail.com',
  avatar: 'dev'
};

const STORAGE_KEY = 'sena_induction_state_v1';
const THEME_KEY = 'sena_induction_theme_v1';
const ROLE_KEY = 'sena_active_role_v1';
const SESSION_KEY = 'sena_session_active_v1';

export default function App() {
  // Check URL query parameters for role & ficha
  const [userRole, setUserRole] = useState<'instructor' | 'aprendiz'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('role');
        if (roleParam === 'aprendiz' || roleParam === 'instructor') {
          return roleParam;
        }
      }
      const savedRole = localStorage.getItem(ROLE_KEY);
      if (savedRole === 'aprendiz' || savedRole === 'instructor') {
        return savedRole;
      }
    } catch {
      // Ignore
    }
    return 'aprendiz';
  });

  // Track if user has passed the Landing Page and entered with their selected role
  const [hasActiveSession, setHasActiveSession] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        // If url explicitly contains ?landing=true or no session active yet, show landing
        if (params.get('landing') === 'true') {
          return false;
        }
        const savedSession = localStorage.getItem(SESSION_KEY);
        return savedSession === 'true';
      }
    } catch {
      // Ignore
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState<
    'modulos' | 'dilemas' | 'evaluacion' | 'certificado' | 'plan' | 'avatar' | 'instructor'
  >(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('role') === 'aprendiz') {
          return 'modulos';
        }
      }
      const savedRole = localStorage.getItem(ROLE_KEY);
      if (savedRole === 'instructor') {
        return 'instructor';
      }
    } catch {
      // Ignore
    }
    return 'modulos';
  });

  const handleUpdateAvatar = (avatarId: string) => {
    setProgress((prev) => ({
      ...prev,
      profile: { ...prev.profile, avatar: avatarId }
    }));
  };

  const handleAddXp = (amount: number) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const [selectedModule, setSelectedModule] = useState<RegulationModule | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isRoleAuthOpen, setIsRoleAuthOpen] = useState(false);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Screen blur transition effect flag
  const [isBlurTransitionActive, setIsBlurTransitionActive] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(THEME_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(THEME_KEY, 'light');
      }
    } catch {
      // Ignore localStorage issues
    }
  }, [isDarkMode]);

  // Persist role changes
  useEffect(() => {
    try {
      localStorage.setItem(ROLE_KEY, userRole);
    } catch {
      // Ignore
    }
  }, [userRole]);

  const handleToggleDarkMode = () => {
    setIsBlurTransitionActive(true);
    setIsDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsBlurTransitionActive(false);
    }, 550);
  };

  // Initialize progress from localStorage or defaults, checking URL params for ficha
  const [progress, setProgress] = useState<InductionProgress>(() => {
    let initialProfile = { ...DEFAULT_PROFILE };
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlFicha = params.get('ficha');
        const urlProgram = params.get('programa');
        if (urlFicha) initialProfile.ficha = urlFicha;
        if (urlProgram) initialProfile.programName = urlProgram;
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: InductionProgress = JSON.parse(saved);
        if (initialProfile.ficha !== DEFAULT_PROFILE.ficha) {
          parsed.profile.ficha = initialProfile.ficha;
        }
        return parsed;
      }
    } catch {
      // Ignore
    }

    return {
      profile: initialProfile,
      completedModuleIds: [],
      completedCaseIds: [],
      quizSubmitted: false,
      quizScore: 0,
      quizTotal: 10,
      xp: 150,
      badges: INITIAL_BADGES,
      certificateId: null,
      certificateDate: null,
    };
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  // Landing Page: Apprentice submitted characterization form (NO PASSWORD)
  const handleSelectApprentice = (characterizedProfile: ApprenticeProfile) => {
    setProgress((prev) => ({
      ...prev,
      profile: characterizedProfile,
    }));
    setUserRole('aprendiz');
    setActiveTab('modulos');
    setHasActiveSession(true);
    try {
      localStorage.setItem(SESSION_KEY, 'true');
      localStorage.setItem(ROLE_KEY, 'aprendiz');
    } catch {
      // Ignore
    }
  };

  // Landing Page: Instructor verified password 'Sena2026'
  const handleSelectInstructor = () => {
    setUserRole('instructor');
    setActiveTab('instructor');
    setHasActiveSession(true);
    try {
      localStorage.setItem(SESSION_KEY, 'true');
      localStorage.setItem(ROLE_KEY, 'instructor');
    } catch {
      // Ignore
    }
  };

  // Exit from current role view back to Landing Page
  const handleExitToLanding = () => {
    setHasActiveSession(false);
    try {
      localStorage.setItem(SESSION_KEY, 'false');
    } catch {
      // Ignore
    }
  };

  // Switch to apprentice role from instructor view
  const handleSwitchToApprenticeView = () => {
    setUserRole('aprendiz');
    setActiveTab('modulos');
  };

  // Switch to instructor role from apprentice view (after PIN 'Sena2026' verified in modal)
  const handleInstructorAuthSuccess = () => {
    setIsRoleAuthOpen(false);
    setUserRole('instructor');
    setActiveTab('instructor');
    setHasActiveSession(true);
    try {
      localStorage.setItem(SESSION_KEY, 'true');
      localStorage.setItem(ROLE_KEY, 'instructor');
    } catch {
      // Ignore
    }
  };

  // Complete a module
  const handleCompleteModule = (moduleId: string, earnedXp: number) => {
    setProgress((prev) => {
      if (prev.completedModuleIds.includes(moduleId)) return prev;

      const updatedModules = [...prev.completedModuleIds, moduleId];
      const newXp = prev.xp + earnedXp;

      let updatedBadges = [...prev.badges];
      if (updatedModules.length === INITIAL_REGULATION_MODULES.length) {
        updatedBadges = updatedBadges.map((b) =>
          b.id === 'b-modules'
            ? { ...b, unlocked: true, earnedAt: new Date().toLocaleDateString() }
            : b
        );
      }

      return {
        ...prev,
        completedModuleIds: updatedModules,
        xp: newXp,
        badges: updatedBadges,
      };
    });
  };

  // Solve a dilemma
  const handleSolveCase = (caseId: string, earnedXp: number) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedCaseIds.includes(caseId);
      const updatedCases = alreadyDone ? prev.completedCaseIds : [...prev.completedCaseIds, caseId];
      const newXp = prev.xp + earnedXp;

      let updatedBadges = [...prev.badges];
      if (updatedCases.length === CASE_DILEMMAS.length) {
        updatedBadges = updatedBadges.map((b) =>
          b.id === 'b-dilemmas'
            ? { ...b, unlocked: true, earnedAt: new Date().toLocaleDateString() }
            : b
        );
      }

      return {
        ...prev,
        completedCaseIds: updatedCases,
        xp: newXp,
        badges: updatedBadges,
      };
    });
  };

  // Finish Quiz
  const handleFinishQuiz = (scorePercentage: number, totalQuestions: number) => {
    setProgress((prev) => {
      const passed = scorePercentage >= 80;
      const certId = passed
        ? prev.certificateId || `SENA-IND-${Math.floor(100000 + Math.random() * 900000)}`
        : null;
      const certDate = passed
        ? prev.certificateDate ||
          new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : null;

      const updatedBadges = prev.badges.map((b) => {
        if (b.id === 'b-master' && passed) {
          return { ...b, unlocked: true, earnedAt: new Date().toLocaleDateString() };
        }
        if (b.id === 'b-certified' && passed) {
          return { ...b, unlocked: true, earnedAt: new Date().toLocaleDateString() };
        }
        return b;
      });

      return {
        ...prev,
        quizSubmitted: true,
        quizScore: scorePercentage,
        quizTotal: totalQuestions,
        xp: prev.xp + (passed ? 500 : 100),
        badges: updatedBadges,
        certificateId: certId,
        certificateDate: certDate,
      };
    });
  };

  // Update profile
  const handleSaveProfile = (newProfile: ApprenticeProfile) => {
    setProgress((prev) => ({
      ...prev,
      profile: newProfile,
    }));
  };

  // Update Ficha config from Instructor view
  const handleUpdateFichaConfig = (
    ficha: string,
    programName: string,
    regional: string,
    center: string
  ) => {
    setProgress((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ficha,
        programName,
        regional,
        center,
      },
    }));
  };

  return (
    <AutoSyncProvider currentProgress={progress}>
      {/* If user has not selected role and started session, show Role Selection Landing */}
      {!hasActiveSession ? (
        <RoleSelectionLanding
          initialProfile={progress.profile}
          initialRole={userRole}
          onSelectApprentice={handleSelectApprentice}
          onSelectInstructor={handleSelectInstructor}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      ) : (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 transition-colors relative">
          {/* Dynamic Screen Blur Overlay triggered during mode switch */}
          {isBlurTransitionActive && (
            <div
              className="fixed inset-0 z-50 pointer-events-none screen-blur-transition bg-emerald-500/10 dark:bg-slate-950/40"
              aria-hidden="true"
            />
          )}

          {/* Atmospheric glowing backdrop blur for dark mode */}
          <div
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-0 dark:opacity-100 transition-opacity duration-700"
            aria-hidden="true"
          >
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#39A900]/10 blur-3xl" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl" />
          </div>

          {/* Role Banner: Helpful status when in Apprentice Mode */}
          {userRole === 'aprendiz' && (
            <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
              <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>
                    <strong>Vista de Aprendiz activa</strong> · Ficha {progress.profile.ficha} ({progress.profile.name}).
                  </span>
                </span>
                <div className="flex items-center gap-4 ml-4 shrink-0">
                  <button
                    onClick={handleExitToLanding}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Cambiar Rol</span>
                  </button>
                  <button
                    onClick={() => setIsRoleAuthOpen(true)}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>Acceso Instructor</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navbar with Role Separation & Exit Button */}
          <Navbar
            userRole={userRole}
            onSwitchToInstructorAuth={() => setIsRoleAuthOpen(true)}
            onSwitchToApprenticeView={handleSwitchToApprenticeView}
            onExitToRoleSelection={handleExitToLanding}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            progress={progress}
            onOpenProfile={() => setIsProfileOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />

          {/* Main Content Area */}
          <main className="flex-1 pb-16 relative z-10 w-full px-4">
            {/* INSTRUCTOR PORTAL VIEW */}
            {userRole === 'instructor' && activeTab === 'instructor' ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
                <InstructorPortalView
                  currentProgress={progress}
                  onSwitchToApprenticeView={handleSwitchToApprenticeView}
                  onExitToLanding={handleExitToLanding}
                  onUpdateFichaConfig={handleUpdateFichaConfig}
                />
              </div>
            ) : (
              <>
                {/* Hero is shown when on Modules in learner view */}
                {activeTab === 'modulos' && (
                  <HeroSection
                    progress={progress}
                    onStartModules={() => {
                      const el = document.getElementById('modules-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onOpenDilemmas={() => setActiveTab('dilemas')}
                    onOpenEvaluation={() => setActiveTab('evaluacion')}
                    onOpenPlan={() => setActiveTab('plan')}
                    onViewCertificate={() => setActiveTab('certificado')}
                  />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
                  {activeTab === 'modulos' && (
                    <div id="modules-section">
                      <ModuleList
                        modules={INITIAL_REGULATION_MODULES}
                        completedIds={progress.completedModuleIds}
                        onSelectModule={(mod) => setSelectedModule(mod)}
                        onOpenDilemmas={() => setActiveTab('dilemas')}
                      />
                    </div>
                  )}

                  {activeTab === 'dilemas' && (
                    <DilemmaSimulator
                      cases={CASE_DILEMMAS}
                      completedCaseIds={progress.completedCaseIds}
                      onSolveCase={handleSolveCase}
                      onOpenEvaluation={() => setActiveTab('evaluacion')}
                    />
                  )}

                  {activeTab === 'evaluacion' && (
                    <GamifiedQuiz
                      questions={EVALUATION_QUIZ}
                      quizSubmitted={progress.quizSubmitted}
                      savedScore={progress.quizScore}
                      onFinishQuiz={handleFinishQuiz}
                      onGoToCertificate={() => setActiveTab('certificado')}
                      onReviewModules={() => setActiveTab('modulos')}
                    />
                  )}

                  {activeTab === 'certificado' && (
                    <CertificateView
                      progress={progress}
                      onGoToEvaluation={() => setActiveTab('evaluacion')}
                      showSyncCard={userRole === 'instructor'}
                    />
                  )}

                  {activeTab === 'plan' && (
                    <StructuredPlanView
                      onStartModules={() => setActiveTab('modulos')}
                      onOpenDilemmas={() => setActiveTab('dilemas')}
                    />
                  )}

                  {activeTab === 'avatar' && (
                    <AvatarGamifiedExercise
                      profile={progress.profile}
                      onUpdateAvatar={handleUpdateAvatar}
                      onAddXp={handleAddXp}
                    />
                  )}
                </div>
              </>
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 relative z-10 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%201000%201000'%20style='enable-background:new%200%200%201000%201000;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id='path47-5'%20class='st0'%20d='M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z'/%3e%3cg%20id='_x23_000000ff-2'%20transform='matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)'%3e%3c/g%3e%3c/svg%3e"
                    alt="Logo Oficial SENA"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>Servicio Nacional de Aprendizaje SENA · Dirección General</span>
                <span aria-hidden="true">·</span>
                <span>Acuerdo 009 de 2024 · Diario Oficial 52.947</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleExitToLanding}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 font-medium text-slate-500"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cambiar Rol / Salir</span>
                </button>

                {userRole === 'instructor' ? (
                  <>
                    <button
                      onClick={() => setActiveTab('instructor')}
                      className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 font-semibold text-[#39A900] shrink-0"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Consola de la Ficha</span>
                    </button>
                    <button
                      onClick={handleSwitchToApprenticeView}
                      className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Probar Vista Aprendiz</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsProfileOpen(true)}
                      className="hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
                    >
                      Configurar Perfil de Aprendiz
                    </button>
                    <button
                      onClick={() => setIsRoleAuthOpen(true)}
                      className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
                    >
                      <KeyRound className="w-3 h-3" />
                      <span>Acceso Instructor</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </footer>

          {/* Modals */}
          <ModuleReaderModal
            module={selectedModule}
            onClose={() => setSelectedModule(null)}
            isCompleted={Boolean(selectedModule && progress.completedModuleIds.includes(selectedModule.id))}
            onCompleteModule={handleCompleteModule}
          />

          <ApprenticeProfileModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            profile={progress.profile}
            badges={progress.badges}
            xp={progress.xp}
            onSaveProfile={handleSaveProfile}
          />

          <InstructorDashboardModal
            isOpen={isInstructorModalOpen}
            onClose={() => setIsInstructorModalOpen(false)}
            currentProgress={progress}
          />

          <RoleAuthModal
            isOpen={isRoleAuthOpen}
            onClose={() => setIsRoleAuthOpen(false)}
            onSuccess={handleInstructorAuthSuccess}
          />
        </div>
      )}
    </AutoSyncProvider>
  );
}
