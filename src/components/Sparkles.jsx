import { useMemo } from 'react'

/**
 * שכבת ניצוצות זהב עדינה שמרצדת ברקע (מאחורי התוכן).
 * pointer-events-none כדי לא להפריע לאינטראקציה, ומיקום fixed כדי לכסות את כל המסך.
 * הניצוצות נוצרים פעם אחת (useMemo) עם מיקום, גודל, וקצב הבהוב אקראיים.
 */
const SPARKLE_COUNT = 50

export default function Sparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: i,
        top: Math.random() * 100, // אחוז מגובה המסך
        left: Math.random() * 100, // אחוז מרוחב המסך
        size: 3 + Math.random() * 6, // 3px - 9px
        delay: Math.random() * 5, // השהיה לפני תחילת ההבהוב
        duration: 2.5 + Math.random() * 3, // 2.5s - 5.5s למחזור הבהוב
      })),
    [],
  )

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
