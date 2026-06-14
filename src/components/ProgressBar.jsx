/**
 * פס התקדמות עם מטוס זהב קטן (בדמות מטוס הנייר מהלוגו) שטס לאורך הפס
 * ככל שמתקדמים בשאלון. נותן תחושת תנועה והתקדמות.
 *
 * RTL: הפס מתמלא מימין (התחלה) לשמאל (סיום), והמטוס רוכב על קצה ההתקדמות.
 *
 * @param {number} percent - אחוז ההתקדמות (0-100)
 */
export default function ProgressBar({ percent }) {
  return (
    <div className="relative w-full py-2">
      {/* מסילת הפס + המילוי הזהוב */}
      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-l from-[#bfa032] to-[#f0d77a] transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* מטוס הזהב שרוכב על קצה ההתקדמות */}
      <div
        className="absolute top-1/2 transition-all duration-500 ease-out"
        style={{ right: `${percent}%`, transform: 'translate(50%, -50%)' }}
      >
        <svg
          className="w-5 h-5 text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.7)]"
          style={{ transform: 'scaleX(-1)' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
        </svg>
      </div>
    </div>
  )
}
