import { useLayoutEffect, useRef, useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { update, useStore, type Habit } from './store'
import FillSheet, { type Target } from './FillSheet'
import { WEEKDAY_LABELS, boardDays, weekdayIdx, ymd } from './dates'

const CELL = 48
const GAP = 4
const PAD = 24 // 화면 왼쪽 여백. 띠는 이 여백 뒤에서 시작해 화면 끝까지 이어진다

function isRestDay(habit: Habit, d: Date): boolean {
  return habit.cycle.type === 'days' && !habit.cycle.days.includes(weekdayIdx(d))
}

export default function Home() {
  const { habits, frames, notice } = useStore()
  const scroller = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<Target | null>(null)
  const [scrollDate, setScrollDate] = useState<string | null>(null)

  const keys = Object.keys(frames).map((k) => k.split('|')[1])
  const earliest = keys.length ? keys.sort()[0] : undefined
  const days = boardDays(earliest)
  const todayStr = ymd(new Date())
  const todayIdx = days.findIndex((d) => ymd(d) === todayStr)
  const width = PAD * 2 + days.length * (CELL + GAP) - GAP

  // 처음 열면 오늘 칸이 보이게 스크롤
  useLayoutEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollLeft = PAD + todayIdx * (CELL + GAP) + CELL / 2 - el.clientWidth / 2
  }, [todayIdx, habits.length])

  // 채운 칸이 보이도록 그 날짜 열로 스크롤
  useLayoutEffect(() => {
    const el = scroller.current
    if (!el || !scrollDate) return
    const idx = days.findIndex((d) => ymd(d) === scrollDate)
    if (idx >= 0) el.scrollLeft = PAD + idx * (CELL + GAP) + CELL / 2 - el.clientWidth / 2
    setScrollDate(null)
  }, [scrollDate, days])

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[480px] flex-col pb-10">
      <h1 className="px-6 pt-6 text-[20px] leading-7 font-bold">데일리롤</h1>

      {habits.length > 0 && (
        <div ref={scroller} className="no-scrollbar mt-6 overflow-x-auto overflow-y-hidden pb-2" data-board>
          <div style={{ width }}>
            {/* 날짜 줄 — 모든 띠가 같은 날짜 열을 쓴다 */}
            <div className="flex" style={{ paddingLeft: PAD, paddingRight: PAD, gap: GAP }}>
              {days.map((d) => {
                const isToday = ymd(d) === todayStr
                const first = d.getDate() === 1
                return (
                  <div key={ymd(d)} className="flex shrink-0 flex-col items-center" style={{ width: CELL }}>
                    <span className="h-4 text-[12px] leading-4 font-medium whitespace-nowrap text-muted">
                      {first ? `${d.getMonth() + 1}월` : ''}
                    </span>
                    <span className="text-[12px] leading-[18px] font-medium text-muted">
                      {WEEKDAY_LABELS[weekdayIdx(d)]}
                    </span>
                    <span
                      className={`mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-[14px] leading-5 font-medium ${
                        isToday ? 'bg-fg text-white' : 'text-fg-2'
                      }`}
                    >
                      {d.getDate()}
                    </span>
                  </div>
                )
              })}
            </div>

            {habits.map((h) => (
              <section key={h.id} className="mt-5" aria-label={h.name}>
                <h2
                  className="sticky mb-2 w-fit text-[16px] leading-[26px] font-bold"
                  style={{ left: PAD }}
                >
                  {h.name}
                </h2>
                <div className="flex" style={{ paddingLeft: PAD, paddingRight: PAD, gap: GAP }}>
                  {days.map((d) => {
                    const key = ymd(d)
                    const frame = frames[`${h.id}|${key}`]
                    const future = key > todayStr
                    const rest = isRestDay(h, d)
                    return (
                      <Cell
                        key={key}
                        label={`${h.name} ${d.getMonth() + 1}월 ${d.getDate()}일`}
                        frame={frame}
                        future={future}
                        rest={rest}
                        today={key === todayStr}
                        onTap={() => {
                          // 이미 채워진 칸을 탭하면 보여주는 건 F2에서 그린다
                          if (!frame) setTarget({ habit: h, date: key })
                        }}
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 px-6">
        {habits.length === 0 ? (
          <p className="text-[16px] leading-6 text-fg-2">습관을 만들면 여기에 칸이 생겨요.</p>
        ) : (
          notice && <p className="text-[16px] leading-6 text-fg-2">{notice}</p>
        )}
        <button className="btn-secondary mt-4 flex items-center justify-center gap-1.5" onClick={() => update({ screen: 'create', notice: null })}>
          <Plus size={20} strokeWidth={2} />
          습관 추가
        </button>
      </div>
      {target && <FillSheet target={target} onClose={() => setTarget(null)} onFilled={setScrollDate} />}
    </main>
  )
}

function Cell({
  label,
  frame,
  future,
  rest,
  today,
  onTap,
}: {
  label: string
  frame: import('./store').Frame | undefined
  future: boolean
  rest: boolean
  today: boolean
  onTap: () => void
}) {
  // 안 한 날 / 쉬는 날 / 체크만 한 날 / 사진 — 모두 중립 톤 (D-016: 오류 색 금지, accent로 칸을 채우지 않음)
  let cls = 'border border-line bg-canvas' // 안 한 날
  if (rest) cls = 'bg-line' // 쉬는 날
  if (frame?.kind === 'check') cls = 'border border-muted bg-canvas'
  if (today && !frame) cls = `${rest ? 'bg-line' : 'bg-canvas'} border border-fg`
  return (
    <button
      type="button"
      aria-label={label}
      disabled={future}
      onClick={onTap}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-chip p-0 ${cls} ${
        future ? 'opacity-40' : ''
      }`}
      style={{ width: CELL, height: CELL }}
    >
      {frame?.kind === 'photo' && <img src={frame.src} alt="" className="h-full w-full object-cover" />}
      {frame?.kind === 'check' && <Check size={20} strokeWidth={2} className="text-fg-2" />}
    </button>
  )
}
