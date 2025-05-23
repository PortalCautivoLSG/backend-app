import { google } from 'googleapis';
import * as path from 'path';

// Autenticación global (ya configurada)
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(import.meta.dirname, "..","..", process.env.GOOGLE_KEY_JSON_PATH),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const googleSheetsClient = google.sheets({version: 'v4', auth});

const googleSheets = {
  /**
   * Write data to cells
   * https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update?hl=es-419
   * @param {string} spreadsheetId Google Spreedsheet ID
   * @param {string} range Range
   * @param {Array} values Data to insert
   * @param {string} valueInputOption Input options
   */
  write: async (spreadsheetId, range, values, valueInputOption) => {
    const resource = {
      values,
    };

    try {
      // Utiliza el cliente autenticado ya configurado
      const result = await googleSheetsClient.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption,
        resource,
      });

      return result;
    } catch (err) {
      throw err;
    }
  },
};
export default googleSheets;