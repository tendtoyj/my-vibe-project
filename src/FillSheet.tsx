import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { update, useStore, type Habit } from './store'
import { monthDay, parseYmd } from './dates'
import { withIGa } from './text'

export type Target = { habit: Habit; date: string }

/** 칸을 탭하면 아래에서 올라오는 시트: 사진 또는 체크로 채운다 */
export default function FillSheet({ target, onClose }: { target: Target; onClose: () => void }) {
  const { frames } = useStore()
  const [error, setError] = useState<string | null>(null)
  const { habit, date } = target

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function checkOnly() {
    const ok = update({
      frames: { ...frames, [`${habit.id}|${date}`]: { kind: 'check' } },
      notice: `${withIGa(habit.name)} 한 칸 체크됐어요.`,
    })
    if (ok) onClose()
    else setError('칸을 저장하지 못했어요. 다시 시도해 주세요.')
  }

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center">
      <div className="sheet-backdrop absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <section
        role="dialog"
        aria-label={`${habit.name} · ${monthDay(parseYmd(date))}`}
        className="sheet-panel relative w-full max-w-[480px] rounded-t-container bg-canvas px-6 pt-6 pb-8 shadow-sheet"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] leading-7 font-bold">
            {habit.name} · {monthDay(parseYmd(date))}
          </h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="-mr-2 flex h-10 w-10 items-center justify-center border-0 bg-transparent text-fg"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button className="btn-primary" onClick={() => undefined /* 사진 고르기는 조각 5에서 */}>
            사진첩에서 고르기
          </button>
          <button className="btn-secondary" onClick={() => undefined /* 바로 찍기는 조각 5에서 */}>
            바로 찍기
          </button>
        </div>

        <button
          type="button"
          onClick={checkOnly}
          className="mt-4 w-full border-0 bg-transparent py-2 text-center text-[14px] leading-5 font-medium text-fg-2 underline underline-offset-4"
        >
          사진 없이 체크만 해요
        </button>

        {error && (
          <p role="alert" className="mt-3 text-center text-[14px] leading-5 font-medium text-error">
            {error}
          </p>
        )}
      </section>
    </div>
  )
}
