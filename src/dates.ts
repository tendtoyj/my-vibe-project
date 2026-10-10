// 날짜는 모두 기기 시간 기준 'YYYY-MM-DD' 문자열로 다룬다. 한 주는 월요일부터 시작.

export const WEEKDAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

export function ymd(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function parseYmd(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

/** 월=0 … 일=6 */
export function weekdayIdx(d: Date): number {
  return (d.getDay() + 6) % 7
}

export function mondayOf(d: Date): Date {
  return addDays(d, -weekdayIdx(d))
}

export const PAST_WEEKS = 12

/** 보드에 깔리는 날짜들: 과거는 길게, 오른쪽은 이번 주 끝(일요일)까지. 더 오래된 사진이 있으면 그 주까지 늘린다 */
export function boardDays(earliest?: string): Date[] {
  const today = new Date()
  let start = mondayOf(addDays(today, -PAST_WEEKS * 7))
  if (earliest) {
    const e = mondayOf(parseYmd(earliest))
    if (e < start) start = e
  }
  const end = addDays(mondayOf(today), 6)
  const days: Date[] = []
  for (let d = start; d <= end; d = addDays(d, 1)) days.push(d)
  return days
}

export function monthDay(d: Date): string {
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}
