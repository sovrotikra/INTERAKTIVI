const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL
const REQUEST_TIMEOUT_MS = 8000

/**
 * שולח את נתוני הליד ל-Webhook של Make.com.
 *
 * עקרון מרכזי: הפונקציה לעולם לא זורקת שגיאה כלפי מעלה ולא חוסמת את חוויית
 * המשתמשת. גם אם ה-Webhook לא מוגדר, נכשל, או מגיב לאט - מחזירים תוצאה
 * תקינה וה-UI ממשיך מיד לתוצאות המלאות. כל כישלון נרשם בשקט ל-console בלבד.
 *
 * @param {object} payload - אובייקט הנתונים המלא (פרטי ליד, תקרה, ניקוד, חותמת זמן)
 * @returns {Promise<{ ok: boolean }>}
 */
export async function sendLeadToMake(payload) {
  // אם אין כתובת Webhook מוגדרת - לא חוסמים את המשתמשת
  if (!WEBHOOK_URL || WEBHOOK_URL.includes('your-custom-webhook-id')) {
    console.warn('Webhook URL is not configured. Skipping lead submission.')
    return { ok: false }
  }

  // הגנת timeout: אם Make לא מגיב תוך 8 שניות - מבטלים ולא מחכים
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    return { ok: response.ok }
  } catch (error) {
    // כישלון רשת / timeout / abort - נרשם בשקט, לא חוסם את הזרימה
    console.error(
      'Webhook integration sync bypassed or failed, falling back gracefully.',
      error,
    )
    return { ok: false }
  } finally {
    clearTimeout(timeoutId)
  }
}
