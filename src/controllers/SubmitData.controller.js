import googleSheetsService from "../services/GoogleSheetService.js"; // Asegúrate de tener la extensión .js

// Exportación de la función directamente
export const insertData = async (req, res) => {
  const { name,lastname,email, country, termsAccepted } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!email || !country || termsAccepted === undefined) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  if (!spreadsheetId) {
    return res
      .status(500)
      .json({
        message: "ID de la hoja de cálculo no configurado en el archivo .env",
      });
  }

  try {
    const range = "Hoja 1!A2";
    // current timestamp in milliseconds
    const timestamp = Date.now();
    const dateObject = new Date(timestamp);

    const format = (num) => num.toString().padStart(2, "0");

    const [date, month, year, hours, minutes, seconds] = [
      dateObject.getDate(),
      dateObject.getMonth() + 1,
      dateObject.getFullYear(),
      dateObject.getHours(),
      dateObject.getMinutes(),
      dateObject.getSeconds(),
    ].map(format);

    const formattedDateTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    const values = [[name,lastname,email, country, termsAccepted, formattedDateTime]];
    const valueInputOption = "RAW";

    await googleSheetsService.write(
      spreadsheetId,
      range,
      values,
      valueInputOption
    );

    return res
      .status(200)
      .json({ message: "Datos recibidos y escritos correctamente" });
  } catch (error) {
    console.error("Error al escribir en Google Sheets:", error);
    return res
      .status(500)
      .json({
        message: "Error al escribir en Google Sheets",
        error: error.message,
      });
  }
};
