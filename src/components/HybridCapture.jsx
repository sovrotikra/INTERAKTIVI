import { useState } from 'react'

/**
 * המסך ההיברידי: חושף את סוג התקרה (title + intro) מיד, אך נועל את
 * הצעדים הפרקטיים מאחורי טופס פרטים. בשליחה - הנתונים נשלחים ל-Make
 * דרך onSubmit, וה-UI ממשיך לתוצאות המלאות ללא תלות בתגובת ה-Webhook.
 *
 * @param {{ title: string, intro: string }} ceiling - נתוני התקרה שזוהתה
 * @param {(lead: {name: string, email: string, phone: string}) => Promise<void> | void} onSubmit
 */
export default function HybridCapture({ ceiling, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    // onSubmit אחראי על שליחה ל-Make ועל המעבר לתוצאות; לא חוסם גם אם נכשל
    await onSubmit(form)
  }

  return (
    <div className="fade-in space-y-6">
      {/* חשיפת התקרה */}
      <div className="text-center space-y-2 border-b border-white/5 pb-5">
        <span className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold">
          הניתוח הסתיים. נמצא צוואר הבקבוק המרכזי שלך:
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white font-brand">{ceiling.title}</h2>
      </div>

      <p className="text-white/85 text-base sm:text-lg leading-relaxed text-center max-w-xl mx-auto font-light">
        {ceiling.intro}
      </p>

      {/* נעילת התוכן מאחורי טופס פרטים */}
      <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5">
        <div className="text-center space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            רוצה לפתוח את תוכנית הפעולה המלאה?
          </h3>
          <p className="text-sm sm:text-base text-white/70 max-w-md mx-auto leading-relaxed">
            הזיני את פרטייך וקבלי גישה מיידית לטעות המרכזית שאת עושה כרגע, ל-3
            הצעדים הפרקטיים לתיקון, ומפת הדרכים המלאה תישלח ישירות למייל שלך.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="שם פרטי"
              required
              className="w-full bg-[#001C46] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-right"
            />
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="כתובת אימייל"
              required
              dir="ltr"
              className="w-full bg-[#001C46] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-left"
            />
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              placeholder="מספר טלפון"
              required
              dir="ltr"
              className="w-full bg-[#001C46] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-left"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D4AF37] hover:bg-[#bfa032] text-[#001C46] font-bold py-4 rounded-xl transition-all duration-300 shadow-md text-base cursor-pointer disabled:opacity-70 disabled:cursor-wait"
          >
            {isSubmitting ? 'מעבד נתונים ומאבטח גישה...' : 'כן, פתחי לי את תוכנית הפעולה'}
          </button>

          {/* הוכחה חברתית להורדת חיכוך לפני המילוי */}
          <p className="text-xs text-white/40 text-center font-light">
            👈 הצטרפי ל-1,347 נשים עצמאיות שכבר קיבלו את תוכנית הפעולה שלהן
          </p>
        </form>
      </div>
    </div>
  )
}
