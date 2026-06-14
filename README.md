# מה התקרה שמונעת מהעסק שלך לגדול? | שוברות תקרה - לאה גרוס

אפליקציית אבחון אינטראקטיבית (Vite + React + Tailwind v4) לנשים עצמאיות.
מודל היברידי: חשיפת סוג התקרה העסקית מיד בסיום השאלון, ונעילת הצעדים הפרקטיים
מאחורי טופס פרטים שנשלח ל-Make.com (ומשם לרב מסר).

## הפעלה

```bash
npm install      # התקנת תלויות (פעם אחת)
npm run dev      # הרצה מקומית - http://localhost:5173
npm run build    # בניית גרסת פרודקשן לתיקיית dist/
npm run preview  # תצוגה מקדימה של גרסת הפרודקשן
```

## הגדרות (חובה לפני עלייה לאוויר)

ערכי החיבור נשמרים בקובץ `.env` (העתק מ-`.env.example`):

| משתנה | תיאור |
| --- | --- |
| `VITE_MAKE_WEBHOOK_URL` | כתובת ה-Webhook מ-Make.com שאליה נשלחים פרטי הלידים |
| `VITE_WHATSAPP_NUMBER` | מספר הוואטסאפ לתיאום שיחות, בפורמט בינלאומי (לדוגמה `972501234567`) |

> חשוב: לאחר שינוי `.env` יש להפעיל מחדש את `npm run dev`.

## מבנה הפרויקט

```
src/
├── App.jsx              # ניהול ה-state והמעבר בין המסכים
├── index.css           # Tailwind + צבעי מותג ואנימציות
├── data/quizData.js    # 25 השאלות + מנוע התוכן של 5 התקרות
├── lib/
│   ├── scoring.js      # חישוב התקרה (הקטגוריה החלשה)
│   └── webhook.js      # שליחה ל-Make עם טיפול שגיאות ו-timeout
└── components/         # Layout, IntroView, QuizContainer, ProgressBar,
                        # LoadingView, HybridCapture, FullResults
```

## הערות

- שכבת ה-Webhook (`lib/webhook.js`) לעולם לא חוסמת את המשתמשת: בכל מקרה של עיכוב,
  כישלון או חוסר הגדרה - הזרימה ממשיכה לתוצאות המלאות (עם timeout של 8 שניות).
- צבעי המותג: Navy `#001C46`, Gold `#D4AF37`, White `#FFFFFF`.
