import ProgressBar from './ProgressBar'
import { questionsDatabase, categoryPrettyNames } from '../data/quizData'

const SCALE_OPTIONS = [1, 2, 3, 4, 5]

/**
 * מסך השאלון: פס התקדמות, השאלה הפעילה, וכפתורי דירוג 1-5.
 *
 * @param {number} currentIndex - אינדקס השאלה הנוכחית
 * @param {(score: number) => void} onAnswer - מופעל בבחירת תשובה
 */
export default function QuizContainer({ currentIndex, onAnswer }) {
  const question = questionsDatabase[currentIndex]
  const total = questionsDatabase.length
  const progressPercent = (currentIndex / total) * 100

  return (
    <div className="space-y-8">
      {/* פס התקדמות + מטא */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-white/50 tracking-wider">
          <span>
            שאלה {currentIndex + 1} מתוך {total}
          </span>
          <span className="text-[#D4AF37] font-bold">
            {categoryPrettyNames[question.category]}
          </span>
        </div>
        <ProgressBar percent={progressPercent} />
      </div>

      {/* השאלה - key מאלץ re-mount לאנימציית fade-in בכל מעבר */}
      <div key={currentIndex} className="fade-in space-y-8">
        <div className="min-h-[100px] flex items-center">
          <h2 className="text-xl sm:text-2xl font-medium text-white leading-snug">
            {question.text}
          </h2>
        </div>

        {/* כפתורי הדירוג */}
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {SCALE_OPTIONS.map((score) => (
              <button
                key={score}
                onClick={() => onAnswer(score)}
                className="group py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-white/10 transition-all duration-200 cursor-pointer text-center"
              >
                <span className="text-xl font-bold block group-hover:scale-110 transition-transform">
                  {score}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/40 px-1 font-light">
            <span>ממש לא נכון עבורי</span>
            <span>נכון מאוד לגביי</span>
          </div>
        </div>
      </div>
    </div>
  )
}
