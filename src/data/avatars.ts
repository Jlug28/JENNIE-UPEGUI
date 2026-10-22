export interface SenaAvatar {
  id: string;
  name: string;
  icon: string;
  badgeTitle: string;
  color: string;
}

export const SENA_AVATARS: SenaAvatar[] = [
  {
    id: 'dev',
    name: 'Desarrollador ADSO',
    icon: '💻',
    badgeTitle: 'Analista de Software',
    color: 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300'
  },
  {
    id: 'admin',
    name: 'Gestor Administrativo',
    icon: '📊',
    badgeTitle: 'Gestor de Procesos',
    color: 'bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300'
  },
  {
    id: 'tech',
    name: 'Técnico Mecatrónico',
    icon: '⚡',
    badgeTitle: 'Especialista Hardware',
    color: 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300'
  },
  {
    id: 'creative',
    name: 'Diseñador Multimedia',
    icon: '🎨',
    badgeTitle: 'Creador Visual 3D',
    color: 'bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300'
  },
  {
    id: 'bio',
    name: 'Experto Biotecnología',
    icon: '🌿',
    badgeTitle: 'Investigador Junior',
    color: 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300'
  },
  {
    id: 'leader',
    name: 'Vocero de Ficha',
    icon: '⭐',
    badgeTitle: 'Líder Institucional',
    color: 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300'
  }
];
