/**
 * מסך טעינה קצר בזמן "ניתוח" התשובות, לבניית ציפייה ודרמה.
 */
export default function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
      <p className="text-white/70 font-light text-sm tracking-wide">
        מנתחת את 25 התשובות שלך ומאתרת את צוואר הבקבוק...
      </p>
    </div>
  )
}
