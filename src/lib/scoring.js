/**
 * מחזיר את מפתח הקטגוריה (התקרה) עם הניקוד הנמוך ביותר -
 * זהו צוואר הבקבוק המרכזי של המשתמשת.
 *
 * @param {Record<string, number>} scores - ניקוד מצטבר לכל קטגוריה
 * @returns {string} מפתח הקטגוריה החלשה ביותר
 */
export function evaluateLowestCategory(scores) {
  let minimumScore = Infinity
  let lowestCategory = 'clarity'

  for (const category in scores) {
    if (scores[category] < minimumScore) {
      minimumScore = scores[category]
      lowestCategory = category
    }
  }

  return lowestCategory
}
