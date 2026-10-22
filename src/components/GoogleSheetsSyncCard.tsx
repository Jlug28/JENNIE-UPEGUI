import React, { useState } from 'react';
import {
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Check,
  Copy,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useAutoSync } from '../context/AutoSyncContext';
import { InductionProgress } from '../types/induction';

interface GoogleSheetsSyncCardProps {
  currentProgress: InductionProgress;
  cohortData?: any[];
}

export const GoogleSheetsSyncCard: React.FC<GoogleSheetsSyncCardProps> = ({
  currentProgress,
  cohortData = []
}) => {
  const {
    user,
    sheetInfo,
    syncStatus,
    lastSyncedAt,
    errorMessage,
    autoSyncEnabled,
    connectGoogleDrive,
    disconnectGoogleDrive,
    forceSyncNow,
    toggleAutoSync,
    syncCurrentProgress
  } = useAutoSync();

  const [copiedLink, setCopiedLink] = useState(false);
  const [isManualSyncing, setIsManualSyncing] = useState(false);

  const handleCopy = () => {
    if (sheetInfo?.spreadsheetUrl) {
      navigator.clipboard.writeText(sheetInfo.spreadsheetUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleManualSync = async () => {
    setIsManualSyncing(true);
    try {
      await syncCurrentProgress(currentProgress, cohortData);
    } finally {
      setIsManualSyncing(false);
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-slate-50 to-emerald-500/10 dark:from-slate-800/80 dark:via-slate-900 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#39A900] flex items-center justify-center text-white shadow-xs shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Sincronización Automática en Google Drive & Sheets
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#39A900]" />
                En tiempo real · Sin duplicados
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Los avances, módulos completados, dilemas y certificado se actualizan automáticamente en la misma fila del aprendiz.
            </p>
          </div>
        </div>

        {/* User Account State */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Google'} className="w-5 h-5 rounded-full" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-medium text-slate-800 dark:text-slate-200 max-w-[130px] truncate">
                {user.displayName || user.email}
              </span>
              <button
                onClick={disconnectGoogleDrive}
                title="Desconectar cuenta de Google"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5 ml-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={connectGoogleDrive}
              disabled={syncStatus === 'syncing'}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{syncStatus === 'syncing' ? 'Conectando...' : 'Conectar Google Drive'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Spreadsheet Info Box */}
      {sheetInfo ? (
        <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-800/60 space-y-2 text-xs shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hoja en Drive: {sheetInfo.title}</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                ID: <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-[10px] font-mono">{sheetInfo.spreadsheetId}</code> · Actualización in-place sin duplicados
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors"
                title="Copiar enlace de Google Sheets"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? '¡Copiado!' : 'Copiar Enlace'}</span>
              </button>

              <a
                href={sheetInfo.spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#39A900] hover:bg-[#2d8500] text-white rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir en Google Drive</span>
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-sm sm:max-w-md font-mono">
              {sheetInfo.spreadsheetUrl}
            </span>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Upsert activo sobre documento: {currentProgress.profile.documentNumber}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            Conecta tu Google Drive una sola vez. A partir de allí, el prototipo sincronizará todos los avances automáticamente en segundo plano.
          </span>
          <button
            onClick={connectGoogleDrive}
            className="text-[#39A900] dark:text-[#52c41a] hover:underline font-semibold inline-flex items-center gap-1 shrink-0"
          >
            <span>Conectar ahora</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Auto-Sync Toggle & Status Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 text-xs">
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoSyncEnabled}
              onChange={(e) => toggleAutoSync(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4.5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#39A900]"></div>
            <span className="ml-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              Sincronización Automática en Segundo Plano
            </span>
          </label>

          {syncStatus === 'syncing' || isManualSyncing ? (
            <span className="text-amber-600 dark:text-amber-400 font-medium inline-flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Guardando en Google Sheets...</span>
            </span>
          ) : syncStatus === 'synced' && lastSyncedAt ? (
            <span className="text-emerald-700 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Actualizado: {lastSyncedAt.toLocaleTimeString('es-CO')}</span>
            </span>
          ) : null}

          {errorMessage && (
            <span className="text-red-600 dark:text-red-400 font-medium inline-flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </span>
          )}
        </div>

        {user && (
          <button
            onClick={handleManualSync}
            disabled={syncStatus === 'syncing' || isManualSyncing}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isManualSyncing ? 'animate-spin' : ''}`} />
            <span>Actualizar Fila Ahora</span>
          </button>
        )}
      </div>
    </div>
  );
};
