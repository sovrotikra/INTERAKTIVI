/**
 * מעטפת העיצוב הראשית: רקע פרימיום, קווים דקורטיביים, header עם הלוגו,
 * חלון התוכן המרכזי (app-window) ו-footer.
 */
export default function Layout({ children }) {
  return (
    <div className="premium-bg min-h-screen flex flex-col justify-between overflow-x-hidden relative">
      {/* קווים דקורטיביים עדינים ברקע */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="-5%" y1="20%" x2="105%" y2="50%" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="-5%" y1="80%" x2="105%" y2="60%" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      </div>

      {/* כותרת עליונה: לוגו המותג */}
      <header className="w-full py-6 px-6 max-w-5xl mx-auto flex justify-between items-center z-10 relative border-b border-white/5">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="שוברות תקרה - לאה גרוס"
            className="h-14 sm:h-16 w-auto"
          />
          <span className="hidden sm:block text-xs text-white/50 tracking-widest border-r border-white/10 pr-3">
            לאה גרוס
            <br />
            אסטרטגיה, שיווק ומיינדסט עסקי
          </span>
        </div>
      </header>

      {/* אזור התוכן המרכזי */}
      <main className="w-full max-w-2xl mx-auto px-4 py-12 flex-grow flex items-center justify-center z-10 relative">
        <div className="w-full bg-[#001C46]/90 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl min-h-[460px] flex flex-col justify-center transition-all duration-500">
          {children}
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-white/20 z-10 relative border-t border-white/5">
        © 2026 שוברות תקרה - לאה גרוס. כל הזכויות שמורות.
      </footer>
    </div>
  )
}
