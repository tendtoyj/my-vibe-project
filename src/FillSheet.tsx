import { useEffect, useRef, useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { update, useStore, type Habit } from './store'
import { monthDay, parseYmd, ymd } from './dates'
import { makeThumb, readShotDate } from './photo'
import { withIGa } from './text'

export type Target = { habit: Habit; date: string }

/** 칸을 탭하면 아래에서 올라오는 시트: 사진 또는 체크로 채운다 */
export default function FillSheet({
  target,
  onClose,
  onFilled,
}: {
  target: Target
  onClose: () => void
  onFilled: (date: string) => void
}) {
  const { frames } = useStore()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const pick = useRef<HTMLInputElement>(null)
  const shoot = useRef<HTMLInputElement>(null)
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
    if (ok) {
      onClose()
      onFilled(date)
    } else setError('칸을 저장하지 못했어요. 다시 시도해 주세요.')
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // 같은 사진을 다시 골라도 반응하게
    if (!file) return // 선택창을 닫음 — 시트에 그대로 머문다
    setError(null)
    setBusy(true)
    try {
      const [src, shot] = await Promise.all([makeThumb(file), readShotDate(file)])
      // 촬영 날짜 칸에 놓는다(D-002). 날짜가 없거나 앞으로의 날짜면 탭한 칸에 놓는다
      const placed = shot && shot <= ymd(new Date()) ? shot : date
      const ok = update({
        frames: { ...frames, [`${habit.id}|${placed}`]: { kind: 'photo', src } },
        notice: `${withIGa(habit.name)} 한 칸 채워졌어요.`,
      })
      if (ok) {
        onClose()
        onFilled(placed)
      } else {
        setError('칸을 저장하지 못했어요. 다시 시도해 주세요.')
      }
    } catch {
      setError('사진을 불러오지 못했어요. 다시 시도해 주세요.')
    } finally {
      setBusy(false)
    }
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
          <button className="btn-primary" disabled={busy} onClick={() => pick.current?.click()}>
            사진첩에서 고르기
          </button>
          <button className="btn-secondary" disabled={busy} onClick={() => shoot.current?.click()}>
            바로 찍기
          </button>
        </div>
        {/* 흉내: 사진첩은 브라우저 선택창으로 대신. 바로 찍기는 폰에서 카메라, 컴퓨터에서는 파일 선택창 (SETUP) */}
        <input ref={pick} type="file" accept="image/*" hidden onChange={onFile} data-input="pick" />
        <input ref={shoot} type="file" accept="image/*" capture="environment" hidden onChange={onFile} data-input="shoot" />

        <button
          type="button"
          onClick={checkOnly}
          disabled={busy}
          className="mt-4 w-full border-0 bg-transparent py-2 text-center text-[14px] leading-5 font-medium text-fg-2 underline underline-offset-4"
        >
          사진 없이 체크만 해요
        </button>

        {busy && (
          <p role="status" className="mt-3 flex items-center justify-center gap-2 text-[14px] leading-5 font-medium text-fg-2">
            <Loader2 size={16} strokeWidth={2} className="animate-spin" />
            사진을 옮기고 있어요.
          </p>
        )}

        {error && (
          <p role="alert" className="mt-3 text-center text-[14px] leading-5 font-medium text-error">
            {error}
          </p>
        )}
      </section>
    </div>
  )
}
