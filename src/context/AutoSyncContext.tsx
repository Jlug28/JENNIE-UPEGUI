import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { User } from 'firebase/auth';
import { googleSignIn, logoutGoogle, subscribeToAuthToken, getAccessToken } from '../services/googleAuth';
import {
  findExistingInductionSpreadsheet,
  createInductionSpreadsheet,
  upsertApprenticesToSpreadsheet,
  formatApprenticeRow,
  SyncedSpreadsheetInfo
} from '../services/googleSheetsService';
import { InductionProgress } from '../types/induction';

const SPREADSHEET_CACHE_KEY = 'sena_induction_sheet_info_v1';
const AUTO_SYNC_ENABLED_KEY = 'sena_auto_sync_enabled_v1';

export type SyncStatusType = 'disconnected' | 'idle' | 'syncing' | 'synced' | 'error';

interface AutoSyncContextType {
  user: User | null;
  sheetInfo: SyncedSpreadsheetInfo | null;
  syncStatus: SyncStatusType;
  lastSyncedAt: Date | null;
  errorMessage: string | null;
  autoSyncEnabled: boolean;
  connectGoogleDrive: () => Promise<void>;
  disconnectGoogleDrive: () => Promise<void>;
  forceSyncNow: () => Promise<void>;
  toggleAutoSync: (enabled: boolean) => void;
  syncCurrentProgress: (progress: InductionProgress, cohort?: any[]) => Promise<void>;
}

const AutoSyncContext = createContext<AutoSyncContextType | null>(null);

export const AutoSyncProvider: React.FC<{
  children: React.ReactNode;
  currentProgress: InductionProgress;
}> = ({ children, currentProgress }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sheetInfo, setSheetInfo] = useState<SyncedSpreadsheetInfo | null>(() => {
    try {
      const cached = localStorage.getItem(SPREADSHEET_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [syncStatus, setSyncStatus] = useState<SyncStatusType>('disconnected');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(AUTO_SYNC_ENABLED_KEY);
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const debounceTimerRef = useRef<any>(null);
  const isSyncingRef = useRef(false);

  // Cache sheetInfo in localStorage
  useEffect(() => {
    if (sheetInfo) {
      try {
        localStorage.setItem(SPREADSHEET_CACHE_KEY, JSON.stringify(sheetInfo));
      } catch {
        // Ignore write error
      }
    }
  }, [sheetInfo]);

  // Save autoSyncEnabled
  const toggleAutoSync = (enabled: boolean) => {
    setAutoSyncEnabled(enabled);
    try {
      localStorage.setItem(AUTO_SYNC_ENABLED_KEY, String(enabled));
    } catch {
      // Ignore
    }
  };

  // Subscribe to Google auth token changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthToken((newToken, currentUser) => {
      setToken(newToken);
      setUser(currentUser);
      if (newToken) {
        setSyncStatus('idle');
      } else {
        setSyncStatus('disconnected');
      }
    });
    return () => unsubscribe();
  }, []);

  // Ensure active spreadsheet exists when token becomes available
  const getOrCreateSheet = useCallback(
    async (authToken: string, ficha: string, program: string): Promise<SyncedSpreadsheetInfo> => {
      if (sheetInfo) {
        return sheetInfo;
      }
      const existing = await findExistingInductionSpreadsheet(authToken, ficha);
      if (existing) {
        setSheetInfo(existing);
        return existing;
      }
      const created = await createInductionSpreadsheet(authToken, ficha, program);
      setSheetInfo(created);
      return created;
    },
    [sheetInfo]
  );

  // Core upsert sync function: in-place row update without duplicates
  const performSync = useCallback(
    async (progressToSync: InductionProgress, cohort?: any[]) => {
      const currentToken = token || (await getAccessToken());
      if (!currentToken) {
        setSyncStatus('disconnected');
        return;
      }

      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      setSyncStatus('syncing');
      setErrorMessage(null);

      try {
        const targetSheet = await getOrCreateSheet(
          currentToken,
          progressToSync.profile.ficha,
          progressToSync.profile.programName
        );

        // Format active apprentice row
        const rowsToSync: (string | number)[][] = [
          formatApprenticeRow(progressToSync, `AP-${progressToSync.profile.documentNumber}`)
        ];

        // Format cohort rows if provided
        if (cohort && cohort.length > 0) {
          cohort
            .filter((c) => c.id !== 'c-0')
            .forEach((c) => {
              rowsToSync.push([
                c.id,
                new Date().toLocaleString('es-CO'),
                c.document?.split(' ')[0] || 'CC',
                c.document?.split(' ')[1] || c.document,
                c.name,
                `${c.name.toLowerCase().replace(/\s+/g, '.')}@soy.sena.edu.co`,
                progressToSync.profile.ficha,
                progressToSync.profile.programName,
                progressToSync.profile.center,
                progressToSync.profile.regional,
                `${c.modulesDone} / 5`,
                `${c.dilemmasDone} / 6`,
                c.score > 0 ? `${c.score}%` : 'Pendiente',
                c.status,
                c.certificateCode || 'N/A',
                c.status === 'Certificado' ? new Date().toLocaleDateString('es-CO') : 'N/A',
                c.score * 10,
                'Acuerdo 009 de 2024 (Mod. 2026)'
              ]);
            });
        }

        // Upsert into spreadsheet (matches on row in-place, zero duplicates)
        await upsertApprenticesToSpreadsheet(currentToken, targetSheet.spreadsheetId, rowsToSync);

        setSyncStatus('synced');
        setLastSyncedAt(new Date());
      } catch (err: any) {
        console.error('Error durante sincronización automática:', err);
        setSyncStatus('error');
        setErrorMessage(err.message || 'Error al sincronizar con Google Sheets');
      } finally {
        isSyncingRef.current = false;
      }
    },
    [token, getOrCreateSheet]
  );

  // One-click Connect Google Drive
  const connectGoogleDrive = async () => {
    setErrorMessage(null);
    setSyncStatus('syncing');
    try {
      const res = await googleSignIn();
      if (res?.accessToken) {
        setToken(res.accessToken);
        setUser(res.user);
        // Run immediate initial sync
        await performSync(currentProgress);
      }
    } catch (err: any) {
      setSyncStatus('error');
      setErrorMessage(err.message || 'No se pudo conectar con Google Drive');
    }
  };

  // Disconnect Google Drive
  const disconnectGoogleDrive = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setSyncStatus('disconnected');
    setLastSyncedAt(null);
  };

  // Force manual sync
  const forceSyncNow = async () => {
    await performSync(currentProgress);
  };

  // Automatic background sync on progress changes (debounced)
  useEffect(() => {
    if (!token || !autoSyncEnabled) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      performSync(currentProgress);
    }, 1200);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [
    currentProgress.completedModuleIds.length,
    currentProgress.completedCaseIds.length,
    currentProgress.quizSubmitted,
    currentProgress.quizScore,
    currentProgress.certificateId,
    currentProgress.profile.documentNumber,
    currentProgress.profile.ficha,
    currentProgress.profile.name,
    token,
    autoSyncEnabled,
    performSync
  ]);

  return (
    <AutoSyncContext.Provider
      value={{
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
        syncCurrentProgress: performSync
      }}
    >
      {children}
    </AutoSyncContext.Provider>
  );
};

export const useAutoSync = () => {
  const context = useContext(AutoSyncContext);
  if (!context) {
    throw new Error('useAutoSync debe usarse dentro de un AutoSyncProvider');
  }
  return context;
};
