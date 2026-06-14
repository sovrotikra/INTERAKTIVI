/**
 * מסך הפתיחה: שורת-על (frame), כותרת, תיאור, הוכחה חברתית ו-CTA.
 *
 * @param {() => void} onStart - מופעל בלחיצה על כפתור ההתחלה
 */
export default function IntroView({ onStart }) {
  return (
    <div className="fade-in space-y-8 text-center">
      <div className="space-y-3">
        {/* שורת-על: ממסגרת את החוויה כאבחון ממוקד */}
        <span className="block text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#D4AF37]/80 font-bold">
          אבחון שוברות תקרה · 25 שאלות · 3 דקות · תוצאה מיידית
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          מה התקרה שמונעת מהעסק שלך{' '}
          <span className="text-[#D4AF37] font-brand">לגדול?</span>
        </h1>
        <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto font-light leading-relaxed">
          את משקיעה את הכל, לב, זמן ואנרגיה.
          <br />
          אבל ההכנסות תקועות באותו מקום כבר חודשים.
          <br />
          ב-3 דקות תגלי איזו מ-<span className="text-white font-medium">5 התקרות העסקיות</span> עוצרת אותך
          <br />
          וכמובן תקבלי פתרון.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={onStart}
          className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#bfa032] text-[#001C46] font-bold text-lg px-14 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-[#D4AF37]/10 cursor-pointer"
        >
          גלי את התקרה שלך עכשיו
        </button>

        {/* הוכחה חברתית */}
        <p className="text-xs text-white/50 font-light">
          👈 כבר 1,347 נשים עצמאיות גילו את התקרה שלהן
        </p>
      </div>
    </div>
  )
}
