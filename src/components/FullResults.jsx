/**
 * מסך התוצאות המלאות (לאחר מילוי הטופס): כותרת התקרה, הטעות המרכזית,
 * 3 הצעדים הפרקטיים, ציטוט העצמה של לאה ו-CTA לתיאום שיחת אבחון בוואטסאפ.
 *
 * @param {object} ceiling - נתוני התקרה (title, mistake, actions, empower)
 * @param {() => void} onWhatsApp - מופעל בלחיצה על כפתור הוואטסאפ
 */
export default function FullResults({ ceiling, onWhatsApp }) {
  return (
    <div className="fade-in space-y-6">
      {/* כותרת */}
      <div className="border-b border-white/5 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <span className="text-xs text-[#D4AF37] font-bold block mb-0.5">
            מפת דרכים אישית עבורך:
          </span>
          <h2 className="text-2xl font-black text-white font-brand">{ceiling.title}</h2>
        </div>
        <div className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/60">
          תוצאה מחושבת
        </div>
      </div>

      <div className="space-y-5">
        {/* הטעות המרכזית */}
        <div className="bg-red-500/5 border border-red-500/15 p-5 rounded-2xl">
          <h4 className="text-sm font-bold text-red-400 mb-1.5">
            הטעות שאת כנראה עושה כרגע בשטח:
          </h4>
          <p className="text-white/90 text-sm leading-relaxed font-light">
            {ceiling.mistake}
          </p>
        </div>

        {/* 3 הצעדים */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#D4AF37]">
            3 פעולות ראשונות ומיידיות שאת חייבת לעשות:
          </h4>
          <ul className="text-white/90 text-sm space-y-2.5 font-light pr-1">
            {ceiling.actions.map((action, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex items-center justify-center min-w-[20px] h-[20px] rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-white/90">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ציטוט העצמה */}
      <div className="p-4 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10 text-center text-xs sm:text-sm italic font-medium text-white/90">
        לאה מזכירה לך: &rdquo;{ceiling.empower}&rdquo;
      </div>

      {/* CTA לשיחת אבחון */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/15 space-y-4 text-center mt-6">
        <h3 className="text-xl font-bold text-white">
          איך את פורצת את התקרה הזו ועולה שלב?
        </h3>
        <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
          האבחון מציב בפנייך מראה חדה. הצעדים למעלה הם ההתחלה. אבל כדי ליישם אותם
          במדויק על העסק שלך ולבנות מנגנון צמיחה יציב, אני מזמינה אותך לשיחת אבחון
          אישית איתי, ללא עלות.
        </p>
        <button
          onClick={onWhatsApp}
          className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#bfa032] text-[#001C46] font-bold text-sm px-10 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2.5 shadow-lg shadow-[#D4AF37]/5 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.416 1.452 5.534 0 10.036-4.502 10.039-10.04.001-2.683-1.04-5.204-2.935-7.1A9.935 9.935 0 0 0 12.003 1.5c-5.536 0-10.039 4.502-10.043 10.04-.001 1.968.514 3.89 1.494 5.582l-1.019 3.72 3.812-.998z" />
          </svg>
          אני רוצה לפרוץ את התקרה, בואי נדבר
        </button>

        {/* שורת ביטחון מתחת ל-CTA */}
        <p className="text-[11px] text-white/45 font-light max-w-sm mx-auto">
          השיחה ללא עלות וללא התחייבות. מיועדת למי שמוכנה באמת ליישם.
        </p>
      </div>
    </div>
  )
}
