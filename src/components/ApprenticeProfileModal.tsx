import React, { useState } from 'react';
import { X, Award, CheckCircle2 } from 'lucide-react';
import { ApprenticeProfile, Badge } from '../types/induction';
import { SENA_AVATARS } from '../data/avatars';

interface ApprenticeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  badges: Badge[];
  xp: number;
  onSaveProfile: (profile: ApprenticeProfile) => void;
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
  'Regional Meta'
];

const SAMPLE_PROGRAMS = [
  'Análisis y Desarrollo de Software (ADSO)',
  'Gestión Empresarial y Administrativa',
  'Mantenimiento Mecatrónico Industrial',
  'Producción Multimedia y Animación 3D',
  'Gestión del Talento Humano',
  'Contabilidad y Finanzas',
  'Desarrollo de Procesos Biotecnológicos',
  'Logística y Operaciones Portuarias'
];

export const ApprenticeProfileModal: React.FC<ApprenticeProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  badges,
  xp,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#39A900]/20 border border-[#39A900]/40 flex items-center justify-center text-xl">
              {SENA_AVATARS.find((a) => a.id === formData.avatar)?.icon || '💻'}
            </div>
            <div>
              <h2 className="text-lg font-bold font-display leading-snug">
                Perfil del Aprendiz SENA
              </h2>
              <p className="text-xs text-slate-300 dark:text-slate-400">
                Ficha {formData.ficha} · {formData.programName}
              </p>
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
          {/* XP & Badges Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-750">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Puntaje Total XP</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">{xp} XP</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Insignias Desbloqueadas</span>
              <span className="text-xl font-bold text-[#39A900] dark:text-[#52c41a] font-mono tabular-nums">
                {badges.filter(b => b.unlocked).length} / {badges.length}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Estado de Inducción</span>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded inline-block mt-1">
                En Progreso Activo
              </span>
            </div>
          </div>

          {/* Apprentice Form */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Seleccionar Avatar Gamificado
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {SENA_AVATARS.map((av) => {
                    const isSelected = formData.avatar === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: av.id })}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] ring-2 ring-[#39A900]/30 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                        title={av.name}
                      >
                        <span className="text-xl mb-0.5">{av.icon}</span>
                        <span className="text-[9px] font-bold text-slate-800 dark:text-slate-200 text-center truncate w-full">
                          {av.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tipo</label>
                    <select
                      value={formData.documentType}
                      onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                      className="w-full px-2 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      <option value="CC">CC</option>
                      <option value="TI">TI</option>
                      <option value="CE">CE</option>
                      <option value="PEP">PEP</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Número Documento</label>
                    <input
                      type="text"
                      required
                      value={formData.documentNumber}
                      onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Número de Ficha</label>
                  <input
                    type="text"
                    required
                    value={formData.ficha}
                    onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Correo Institucional / Personal</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Programa de Formación</label>
                <input
                  type="text"
                  required
                  list="programs-list"
                  value={formData.programName}
                  onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <datalist id="programs-list">
                  {SAMPLE_PROGRAMS.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Regional SENA</label>
                  <select
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    {REGIONAL_LIST.map((reg) => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Centro de Formación</label>
                  <input
                    type="text"
                    required
                    value={formData.center}
                    onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#39A900] text-white rounded-lg hover:bg-[#2e8800] transition-colors"
                >
                  Guardar Datos
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-750">
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Nombre Registrado:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{formData.name}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-750">
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Identificación:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">
                    {formData.documentType} {formData.documentNumber}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-750">
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Programa & Ficha:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm block">{formData.programName}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono">Ficha #{formData.ficha}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-750">
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Sede Institucional:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm block">{formData.center}</span>
                  <span className="text-slate-500 dark:text-slate-400">{formData.regional}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Editar Información Personal
                </button>
              </div>
            </div>
          )}

          {/* Badges Section */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#39A900] dark:text-[#52c41a]" />
              Insignias de Mérito Formativo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    badge.unlocked
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      badge.unlocked
                        ? 'bg-[#39A900] text-white shadow-2xs'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{badge.title}</span>
                      {badge.unlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{badge.description}</p>
                    {badge.unlocked && badge.earnedAt && (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium block mt-1">
                        Desbloqueado · {badge.earnedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-slate-900 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
