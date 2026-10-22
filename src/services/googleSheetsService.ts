import { InductionProgress } from '../types/induction';

export interface SyncedSpreadsheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
  updatedAt: string;
}

const HEADERS = [
  'ID Registro',
  'Fecha y Hora Registro',
  'Tipo Doc',
  'Número Documento',
  'Nombre Completo',
  'Correo Electrónico',
  'Ficha de Caracterización',
  'Programa de Formación',
  'Centro de Formación',
  'Regional',
  'Módulos Completados',
  'Casos Resueltos',
  'Calificación Evaluación',
  'Estado Inducción',
  'Código Certificado',
  'Fecha Emisión',
  'Puntos XP',
  'Normativa Aplicada'
];

/**
 * Searches in Google Drive for an existing spreadsheet created by this app for the specified ficha.
 */
export const findExistingInductionSpreadsheet = async (
  accessToken: string,
  ficha: string
): Promise<SyncedSpreadsheetInfo | null> => {
  try {
    const query = encodeURIComponent(
      `mimeType='application/vnd.google-apps.spreadsheet' and name contains 'SENA Inducción - Ficha ${ficha}' and trashed = false`
    );
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink,modifiedTime)&spaces=drive`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!res.ok) {
      console.warn('No se pudo buscar en Google Drive', await res.text());
      return null;
    }

    const data = await res.json();
    if (data.files && data.files.length > 0) {
      const file = data.files[0];
      return {
        spreadsheetId: file.id,
        spreadsheetUrl: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}`,
        title: file.name,
        updatedAt: file.modifiedTime,
      };
    }
    return null;
  } catch (error) {
    console.error('Error buscando hoja en Google Drive:', error);
    return null;
  }
};

/**
 * Creates a new Google Spreadsheet with SENA header formatting.
 */
export const createInductionSpreadsheet = async (
  accessToken: string,
  ficha: string,
  programName: string
): Promise<SyncedSpreadsheetInfo> => {
  const title = `SENA Inducción - Ficha ${ficha} (${programName.slice(0, 30)})`;

  // 1. Create Spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Aprendices Inducción',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorDetails = await createRes.text();
    throw new Error(`Error al crear hoja de cálculo en Google Drive: ${errorDetails}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const sheetId = createdData.sheets[0].properties.sheetId;

  // 2. Set headers and format row 1 with SENA Green (#39A900)
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Aprendices Inducción'!A1:R1?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [HEADERS],
    }),
  });

  // 3. Apply nice styles (Green background, bold white text)
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: HEADERS.length,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 57 / 255, green: 169 / 255, blue: 0 / 255 }, // #39A900
                textFormat: {
                  foregroundColor: { red: 1, green: 1, blue: 1 },
                  bold: true,
                  fontSize: 10,
                },
                horizontalAlignment: 'CENTER',
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
          },
        },
        {
          autoResizeDimensions: {
            dimensions: {
              sheetId,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: HEADERS.length,
            },
          },
        },
      ],
    }),
  });

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    title,
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Maps an apprentice progress and profile into a row array.
 */
export const formatApprenticeRow = (
  progress: InductionProgress,
  studentId?: string
): (string | number)[] => {
  const prof = progress.profile;
  const isCert = Boolean(progress.certificateId);
  const status = isCert ? 'Certificado' : progress.completedModuleIds.length > 0 ? 'En Proceso' : 'Pendiente';

  return [
    studentId || `AP-${prof.documentNumber}`,
    new Date().toLocaleString('es-CO'),
    prof.documentType,
    prof.documentNumber,
    prof.name,
    prof.email,
    prof.ficha,
    prof.programName,
    prof.center,
    prof.regional,
    `${progress.completedModuleIds.length} / 5`,
    `${progress.completedCaseIds.length} / 6`,
    progress.quizSubmitted ? `${progress.quizScore}%` : 'Pendiente',
    status,
    progress.certificateId || 'N/A',
    progress.certificateDate || 'N/A',
    progress.xp,
    'Acuerdo 009 de 2024 (Mod. 2026)'
  ];
};

/**
 * Reads existing sheet data and updates existing rows in-place (matching by Document Number or Apprentice ID)
 * or appends new rows if they don't already exist.
 * This guarantees zero duplicated rows.
 */
export const upsertApprenticesToSpreadsheet = async (
  accessToken: string,
  spreadsheetId: string,
  rows: (string | number)[][]
): Promise<{ updatedCount: number; appendedCount: number; spreadsheetUrl: string }> => {
  // 1. Fetch current rows in the sheet
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Aprendices Inducción'!A:R`;
  const getRes = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!getRes.ok) {
    const errorDetails = await getRes.text();
    throw new Error(`Error al leer hoja de cálculo: ${errorDetails}`);
  }

  const getData = await getRes.json();
  const existingRows: any[][] = getData.values || [];

  // Existing header is row 1 (index 0).
  // Document number is Column D (index 3). Apprentice ID is Column A (index 0).
  const docIndexMap = new Map<string, number>();
  const idIndexMap = new Map<string, number>();
  const originalTimestamps = new Map<number, string>();

  for (let i = 1; i < existingRows.length; i++) {
    const r = existingRows[i];
    const rowNumber = i + 1; // 1-based index in Google Sheets
    if (r[0]) {
      idIndexMap.set(String(r[0]).trim().toLowerCase(), rowNumber);
    }
    if (r[3]) {
      docIndexMap.set(String(r[3]).trim().toLowerCase(), rowNumber);
    }
    if (r[1]) {
      originalTimestamps.set(rowNumber, String(r[1]));
    }
  }

  const updateBatchData: { range: string; values: (string | number)[][] }[] = [];
  const appendRows: (string | number)[][] = [];

  for (const row of rows) {
    const apprenticeId = String(row[0] || '').trim().toLowerCase();
    const docNumber = String(row[3] || '').trim().toLowerCase();

    // Check if apprentice already has a row in the sheet
    const matchingRowNumber = (docNumber ? docIndexMap.get(docNumber) : undefined) || (apprenticeId ? idIndexMap.get(apprenticeId) : undefined);

    if (matchingRowNumber) {
      // Preserve original registration timestamp if available
      const origTimestamp = originalTimestamps.get(matchingRowNumber);
      const updatedRow = [...row];
      if (origTimestamp) {
        updatedRow[1] = origTimestamp; // Keep original creation timestamp
      }
      updateBatchData.push({
        range: `'Aprendices Inducción'!A${matchingRowNumber}:R${matchingRowNumber}`,
        values: [updatedRow],
      });
    } else {
      // New row to append
      appendRows.push(row);
      // Mark as occupied so multiple entries in same batch won't duplicate
      const prospectiveRow = existingRows.length + appendRows.length;
      if (docNumber) docIndexMap.set(docNumber, prospectiveRow);
      if (apprenticeId) idIndexMap.set(apprenticeId, prospectiveRow);
    }
  }

  // 2. Perform in-place row updates via values:batchUpdate
  if (updateBatchData.length > 0) {
    const batchUpdateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`;
    const batchRes = await fetch(batchUpdateUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data: updateBatchData,
      }),
    });

    if (!batchRes.ok) {
      const errorDetails = await batchRes.text();
      throw new Error(`Error actualizando filas en Google Sheets: ${errorDetails}`);
    }
  }

  // 3. Append new rows if any
  if (appendRows.length > 0) {
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Aprendices Inducción'!A:R:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const appendRes = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: appendRows,
      }),
    });

    if (!appendRes.ok) {
      const errorDetails = await appendRes.text();
      throw new Error(`Error agregando nuevos aprendices en Google Sheets: ${errorDetails}`);
    }
  }

  return {
    updatedCount: updateBatchData.length,
    appendedCount: appendRows.length,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  };
};

/**
 * Backward-compatible wrapper that now automatically uses in-place upsert
 * to avoid any duplicated rows.
 */
export const syncApprenticesToSpreadsheet = async (
  accessToken: string,
  spreadsheetId: string,
  rows: (string | number)[][]
): Promise<{ updatedRows: number; spreadsheetUrl: string }> => {
  const result = await upsertApprenticesToSpreadsheet(accessToken, spreadsheetId, rows);
  return {
    updatedRows: result.updatedCount + result.appendedCount,
    spreadsheetUrl: result.spreadsheetUrl,
  };
};
