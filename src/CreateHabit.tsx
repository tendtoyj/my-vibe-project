import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { emptyDraft, update, useStore, type Cycle, type Draft } from './store'

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']
const CYCLES: { type: Cycle['type']; label: string }[] = [
  { type: 'daily', label: '매일' },
  { type: 'weekly', label: '주 N회' },
  { type: 'days', label: '요일 지정' },
]

const EMOJIS = [
  '🏃',
  '🧘',
  '💪',
  '🚴',
  '🏊',
  '🥗',
  '💧',
  '📚',
  '✍️',
  '🎧',
  '🎸',
  '🧹',
  '🛏️',
  '☀️',
  '🌱',
  '🍎',
  '☕',
  '🧠',
  '🦷',
  '🚶',
  '📝',
  '🎨',
  '🐶',
  '🧺',
]
const randomEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  // 선택 상태는 중립 톤(검정)으로 — 화면의 accent는 [다음] 하나만 (DESIGN 사용 경계)
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-chip border px-3 py-2.5 text-[16px] leading-6 font-medium ${
        selected ? 'border-fg bg-fg text-white' : 'border-line bg-canvas text-fg-2'
      }`}
    >
      {children}
    </button>
  )
}

export default function CreateHabit() {
  const { draft, habits } = useStore()
  const [error, setError] = useState(false)
  const [picking, setPicking] = useState(false)

  // 처음 들어오면 이모지를 하나 랜덤으로 정해 둔다
  useEffect(() => {
    if (!draft.emoji) update({ draft: { ...draft, emoji: randomEmoji() } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setDraft(patch: Partial<Draft>) {
    setError(false)
    update({ draft: { ...draft, ...patch } })
  }

  const name = draft.name.trim()
  const canNext = name.length > 0 && (draft.cycleType !== 'days' || draft.days.length > 0)

  function next() {
    if (!canNext) return
    const cycle: Cycle =
      draft.cycleType === 'daily'
        ? { type: 'daily' }
        : draft.cycleType === 'weekly'
          ? { type: 'weekly', n: draft.n }
          : { type: 'days', days: [...draft.days].sort() }
    const habit = { id: crypto.randomUUID(), name, emoji: draft.emoji, cycle }
    const ok = update({
      habits: [...habits, habit],
      draft: emptyDraft,
      screen: 'home',
      notice: `${name} 띠가 만들어졌어요. 칸을 눌러 사진을 채워요.`,
    })
    if (!ok) setError(true)
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[480px] flex-col px-6 pt-4 pb-10">
      <button
        type="button"
        aria-label="홈으로"
        onClick={() => update({ screen: 'home' })}
        className="-ml-2 flex h-10 w-10 items-center justify-center border-0 bg-transparent text-fg"
      >
        <ChevronLeft size={24} strokeWidth={2} />
      </button>

      <h1 className="mt-6 text-[20px] leading-7 font-bold">습관 이름과 주기를 정해요.</h1>

      <div className="relative mt-6 flex items-center gap-2">
        <button
          type="button"
          aria-label="이모지 바꾸기"
          aria-expanded={picking}
          onClick={() => setPicking(!picking)}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-action border bg-canvas text-[26px] leading-none ${
            picking ? 'border-fg' : 'border-line'
          }`}
        >
          {draft.emoji}
        </button>
        <input
          value={draft.name}
          onChange={(e) => setDraft({ name: e.target.value })}
          placeholder="조깅"
          aria-label="습관 이름"
          maxLength={20}
          className="h-14 min-w-0 flex-1 rounded-action border border-line bg-canvas px-4 text-[16px] text-fg outline-none placeholder:text-muted focus:border-fg"
        />

        {picking && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setPicking(false)} />
            <div
              role="listbox"
              aria-label="이모지 고르기"
              className="absolute top-full left-0 z-20 mt-2 grid w-full grid-cols-6 gap-1 rounded-action border border-line bg-canvas p-2 shadow-sheet"
            >
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  role="option"
                  aria-selected={draft.emoji === e}
                  onClick={() => {
                    setDraft({ emoji: e })
                    setPicking(false)
                  }}
                  className={`flex h-11 items-center justify-center rounded-chip border-0 text-[24px] leading-none ${
                    draft.emoji === e ? 'bg-line' : 'bg-transparent'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CYCLES.map((c) => (
          <Chip key={c.type} selected={draft.cycleType === c.type} onClick={() => setDraft({ cycleType: c.type })}>
            {c.label}
          </Chip>
        ))}
      </div>

      {draft.cycleType === 'weekly' && (
        <section className="mt-6">
          <p className="text-[14px] leading-5 font-medium text-fg-2">일주일에 몇 번 해요?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Chip key={n} selected={draft.n === n} onClick={() => setDraft({ n })}>
                {n}
              </Chip>
            ))}
          </div>
        </section>
      )}

      {draft.cycleType === 'days' && (
        <section className="mt-6">
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((w, i) => (
              <Chip
                key={w}
                selected={draft.days.includes(i)}
                onClick={() =>
                  setDraft({
                    days: draft.days.includes(i) ? draft.days.filter((d) => d !== i) : [...draft.days, i],
                  })
                }
              >
                {w}
              </Chip>
            ))}
          </div>
        </section>
      )}

      <div className="mt-auto pt-10">
        {error && (
          <p role="alert" className="mb-3 text-center text-[14px] leading-5 font-medium text-error">
            습관을 저장하지 못했어요. 다시 시도해 주세요.
          </p>
        )}
        <button className="btn-primary" disabled={!canNext} onClick={next}>
          다음
        </button>
      </div>
    </main>
  )
}
