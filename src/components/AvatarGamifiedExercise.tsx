import React, { useState } from 'react';
import { Sparkles, Award, CheckCircle2, Shield, Zap, Star } from 'lucide-react';
import { SENA_AVATARS, SenaAvatar } from '../data/avatars';
import { ApprenticeProfile } from '../types/induction';
import { triggerCelebration } from '../utils/celebration';

interface AvatarGamifiedExerciseProps {
  profile: ApprenticeProfile;
  onUpdateAvatar: (avatarId: string) => void;
  onAddXp: (amount: number) => void;
}

export const AvatarGamifiedExercise: React.FC<AvatarGamifiedExerciseProps> = ({
  profile,
  onUpdateAvatar,
  onAddXp,
}) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(profile.avatar || 'dev');
  const [claimedBonus, setClaimedBonus] = useState<boolean>(false);
  const [testPowerActive, setTestPowerActive] = useState<boolean>(false);

  const activeAvatar = SENA_AVATARS.find((a) => a.id === selectedAvatarId) || SENA_AVATARS[0];

  const handleSelectAndClaim = (av: SenaAvatar) => {
    setSelectedAvatarId(av.id);
    onUpdateAvatar(av.id);
    if (!claimedBonus) {
      setClaimedBonus(true);
      onAddXp(150);
      triggerCelebration('standard');
    }
  };

  const handleTestPower = () => {
    setTestPowerActive(true);
    triggerCelebration('standard');
    setTimeout(() => setTestPowerActive(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl border-2 border-[#39A900]/40 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden space-y-6">
      {/* Background glowing effects */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#39A900]/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39A900]/20 border border-[#39A900]/40 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Ejercicio de Gamificación · Identidad Institucional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
            Arena de Avatares y Superpoderes SENA
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Selecciona tu arquetipo profesional, desbloquea tu insignia de identidad digital y reclama bonificación inmediata de <strong className="text-emerald-400">+150 XP</strong> para tu perfil.
          </p>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-3 shrink-0">
          <span className="text-3xl">{activeAvatar.icon}</span>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Avatar Activo</span>
            <span className="text-xs font-bold text-white">{activeAvatar.name}</span>
          </div>
        </div>
      </div>

      {/* Avatar Selection Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {SENA_AVATARS.map((av) => {
          const isSelected = selectedAvatarId === av.id;
          return (
            <div
              key={av.id}
              onClick={() => handleSelectAndClaim(av)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-950/80 to-slate-900 border-[#39A900] ring-4 ring-[#39A900]/30 shadow-lg scale-[1.02]'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {av.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white truncate">{av.name}</h4>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />}
                </div>
                <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">{av.badgeTitle}</span>
                <span className="text-[10px] text-slate-400 block mt-1">Habilidad: Especialista Técnico</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Power Test Box */}
      <div className="relative z-10 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shrink-0">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Probar Habilidad de {activeAvatar.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Nivel 1</span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Ejecuta una simulación de superpoder institucional para recibir validación de destreza.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTestPower}
          className="px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Activar Superpoder (+50 XP)</span>
        </button>
      </div>

      {testPowerActive && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs text-center font-bold animate-bounce">
          ⚡ ¡Superpoder activado con éxito! Sincronizado con el perfil de {profile.name}.
        </div>
      )}

      {claimedBonus && (
        <div className="flex items-center justify-between text-xs text-slate-300 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
            <span>Avatar <strong>{activeAvatar.name}</strong> guardado correctamente en tu ficha #{profile.ficha}.</span>
          </span>
          <span className="text-emerald-400 font-mono font-bold">+150 XP Reclamados</span>
        </div>
      )}
    </div>
  );
};
