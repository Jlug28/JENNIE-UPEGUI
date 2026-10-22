import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    'brand.title': 'SENA Inducción 360°',
    'brand.subtitle': 'Reglamento del Aprendiz Acuerdo 009 de 2024',
    'nav.modules': 'Módulos Normativos',
    'nav.dilemmas': 'Casos y Dilemas',
    'nav.evaluation': 'Evaluación Gamificada',
    'nav.certificate': 'Certificado',
    'nav.plan': 'Plan Pedagógico',
    'nav.avatar': 'Arena Avatares',
    'nav.console': 'Consola de la Ficha',
    'nav.apprenticeView': 'Vista Aprendiz',
    'nav.exit': 'Salir al Inicio',
    'nav.changeRole': 'Cambiar Rol / Salir',
    'nav.instructorAccess': 'Acceso Instructor',
    'landing.badge': 'Sistema Oficial de Inducción Institucional',
    'landing.title': 'Selecciona tu Perfil de Ingreso',
    'landing.subtitle': 'Para garantizar la correcta diferenciación de pantallas y permisos, ingresa de acuerdo con tu rol en el centro de formación.',
    'landing.videoBtn': 'Ver Video Tutorial de Inducción',
    'landing.apprenticeTab': 'Soy Aprendiz',
    'landing.apprenticeSub': 'Sin clave · Caracterización',
    'landing.instructorTab': 'Soy Instructor',
    'landing.instructorSub': 'Acceso institucional · Gestión',
    'landing.apprenticeTitle': 'Caracterización & Ruta del Aprendiz',
    'landing.apprenticeDesc': 'Ingresa tus datos personales y de ficha para personalizar tu inducción institucional, registrar tus logros y emitir tu Certificado Oficial con Código Único de Validación.',
    'landing.avatarLabel': 'Selecciona tu Avatar Gamificado *',
    'landing.fullName': 'Nombre Completo del Aprendiz *',
    'landing.docType': 'Tipo Documento',
    'landing.docNum': 'Número de Documento *',
    'landing.ficha': 'Ficha SENA *',
    'landing.program': 'Programa de Formación *',
    'landing.regional': 'Regional',
    'landing.center': 'Centro de Formación',
    'landing.email': 'Correo Electrónico (Para recibir certificación)',
    'landing.submitApprentice': 'Ingresar a mi Inducción SENA',
    'landing.instructorTitle': 'Instructor & Coordinación',
    'landing.instructorDesc': 'Consola para el seguimiento de la ficha, sincronización en Google Drive / Google Sheets, métricas pedagógicas y generación de actas.',
    'landing.instructorPass': 'Clave de Acceso del Instructor *',
    'landing.submitInstructor': 'Acceder a Consola del Instructor',
    'theme.light': 'Cambiar a modo claro',
    'theme.dark': 'Cambiar a modo oscuro',
    'lang.toggle': 'EN / ES',
  },
  en: {
    'brand.title': 'SENA Induction 360°',
    'brand.subtitle': 'Apprentice Regulations Agreement 009 of 2024',
    'nav.modules': 'Regulatory Modules',
    'nav.dilemmas': 'Cases & Dilemmas',
    'nav.evaluation': 'Gamified Quiz',
    'nav.certificate': 'Certificate',
    'nav.plan': 'Pedagogical Plan',
    'nav.avatar': 'Avatar Arena',
    'nav.console': 'Roster Console',
    'nav.apprenticeView': 'Apprentice View',
    'nav.exit': 'Exit to Home',
    'nav.changeRole': 'Change Role / Exit',
    'nav.instructorAccess': 'Instructor Access',
    'landing.badge': 'Official Institutional Induction System',
    'landing.title': 'Select Your Access Profile',
    'landing.subtitle': 'To ensure correct screen and permission partitioning, please log in according to your role in the training center.',
    'landing.videoBtn': 'Watch Induction Video Tutorial',
    'landing.apprenticeTab': 'I am an Apprentice',
    'landing.apprenticeSub': 'No password · Characterization',
    'landing.instructorTab': 'I am an Instructor',
    'landing.instructorSub': 'Institutional access · Management',
    'landing.apprenticeTitle': 'Apprentice Characterization & Path',
    'landing.apprenticeDesc': 'Enter your personal and roster details to personalize your institutional induction, track your achievements, and issue your Official Certificate with Unique Validation Code.',
    'landing.avatarLabel': 'Select your Gamified Avatar *',
    'landing.fullName': 'Apprentice Full Name *',
    'landing.docType': 'Document Type',
    'landing.docNum': 'Document Number *',
    'landing.ficha': 'SENA Roster (Ficha) *',
    'landing.program': 'Training Program *',
    'landing.regional': 'Regional Branch',
    'landing.center': 'Training Center',
    'landing.email': 'Email Address (To receive certification)',
    'landing.submitApprentice': 'Enter my SENA Induction',
    'landing.instructorTitle': 'Instructor & Coordination',
    'landing.instructorDesc': 'Console for roster tracking, Google Drive / Google Sheets synchronization, pedagogical metrics, and minutes generation.',
    'landing.instructorPass': 'Instructor Access Password *',
    'landing.submitInstructor': 'Access Instructor Console',
    'theme.light': 'Switch to light mode',
    'theme.dark': 'Switch to dark mode',
    'lang.toggle': 'ES / EN',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
});

const LANG_KEY = 'sena_induction_lang_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'es') return saved;
    } catch {
      // Ignore
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // Ignore
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['es'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
