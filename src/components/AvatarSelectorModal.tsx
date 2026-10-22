import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface AvatarSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (avatarId: string) => void;
  currentAvatarId?: string;
}

const AVATARS = [
  { id: 'av-1', name: 'Aprendiz Enfocado' },
  { id: 'av-2', name: 'Aprendiz Creativo' },
  { id: 'av-3', name: 'Aprendiz Analítico' },
  { id: 'av-4', name: 'Aprendiz Lider' },
];

export const AvatarSelectorModal: React.FC<AvatarSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectAvatar,
  currentAvatarId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#39A900]" />
            Elige tu Avatar de Inducción
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => onSelectAvatar(avatar.id)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                currentAvatarId === avatar.id
                  ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/40'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-2xl">
                {avatar.id === 'av-1' ? '👤' : avatar.id === 'av-2' ? '🧑‍🎨' : avatar.id === 'av-3' ? '🧑‍💻' : '🧑‍💼'}
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{avatar.name}</span>
            </button>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-700"
        >
          Confirmar Elección
        </button>
      </div>
    </div>
  );
};
