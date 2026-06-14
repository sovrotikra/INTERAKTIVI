import { useState } from 'react'
import Layout from './components/Layout'
import IntroView from './components/IntroView'
import QuizContainer from './components/QuizContainer'
import LoadingView from './components/LoadingView'
import HybridCapture from './components/HybridCapture'
import FullResults from './components/FullResults'
import {
  questionsDatabase,
  categoryPrettyNames,
  analysisContentEngine,
  initialCategoryScores,
} from './data/quizData'
import { evaluateLowestCategory } from './lib/scoring'
import { sendLeadToMake } from './lib/webhook'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '972500000000'
const ANALYSIS_DURATION_MS = 1600

export default function App() {
  const [view, setView] = useState('intro') // intro | quiz | loading | hybrid | results
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [scores, setScores] = useState({ ...initialCategoryScores })
  const [finalCategory, setFinalCategory] = useState('')

  const ceiling = finalCategory ? analysisContentEngine[finalCategory] : null

  /** מענה על שאלה: צבירת ניקוד ומעבר לשאלה הבאה או לסיום */
  const handleAnswer = (score) => {
    const question = questionsDatabase[currentQuestionIdx]
    const nextScores = {
      ...scores,
      [question.category]: scores[question.category] + score,
    }
    setScores(nextScores)

    const isLastQuestion = currentQuestionIdx === questionsDatabase.length - 1
    if (!isLastQuestion) {
      setCurrentQuestionIdx((idx) => idx + 1)
    } else {
      finishQuiz(nextScores)
    }
  }

  /** סיום השאלון: חישוב התקרה, מסך טעינה דרמטי, ואז חשיפה היברידית */
  const finishQuiz = (finalScores) => {
    const lowest = evaluateLowestCategory(finalScores)
    setFinalCategory(lowest)
    setView('loading')

    setTimeout(() => {
      setView('hybrid')
    }, ANALYSIS_DURATION_MS)
  }

  /** שליחת הליד ל-Make ומעבר לתוצאות המלאות - לא חוסם גם אם ה-Webhook נכשל */
  const handleLeadSubmit = async (lead) => {
    // שולחים את כל התוכן המלא של התקרה, כך שברב מסר אפשר לבנות מייל אחד
    // עם "חלוניות" שמתמלאות אוטומטית לכל אחת מ-5 התקרות.
    const payload = {
      // פרטי הלקוחה
      firstName: lead.name,
      email: lead.email,
      phone: lead.phone,

      // התוצאה - שם התקרה
      ceiling: categoryPrettyNames[finalCategory],

      // התוכן המלא של התקרה (להדבקה ישירה במייל)
      ceilingIntro: ceiling.intro,
      ceilingMistake: ceiling.mistake,
      ceilingAction1: ceiling.actions[0],
      ceilingAction2: ceiling.actions[1],
      ceilingAction3: ceiling.actions[2],
      ceilingActionsText: ceiling.actions
        .map((action, i) => `${i + 1}. ${action}`)
        .join('\n'),
      ceilingEmpower: ceiling.empower,

      // נתונים גולמיים וחותמת זמן
      rawScores: scores,
      timestamp: new Date().toISOString(),
    }

    // sendLeadToMake לעולם לא זורק; ממשיכים לתוצאות בכל מקרה
    await sendLeadToMake(payload)
    setView('results')
  }

  /** פתיחת וואטסאפ עם הודעה מותאמת לפי התקרה שזוהתה */
  const redirectToWhatsApp = () => {
    const resolvedCeiling = categoryPrettyNames[finalCategory]
    const text = `היי לאה, הגעתי דרך האבחון ויצא שיש לי את ${resolvedCeiling}. קראתי את הפעולות לביצוע ואני רוצה לתאם איתך את שיחת האבחון האישית כדי ליישם את זה על העסק שלי.`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
    )
  }

  return (
    <Layout>
      {view === 'intro' && <IntroView onStart={() => setView('quiz')} />}

      {view === 'quiz' && (
        <QuizContainer currentIndex={currentQuestionIdx} onAnswer={handleAnswer} />
      )}

      {view === 'loading' && <LoadingView />}

      {view === 'hybrid' && ceiling && (
        <HybridCapture ceiling={ceiling} onSubmit={handleLeadSubmit} />
      )}

      {view === 'results' && ceiling && (
        <FullResults ceiling={ceiling} onWhatsApp={redirectToWhatsApp} />
      )}
    </Layout>
  )
}
