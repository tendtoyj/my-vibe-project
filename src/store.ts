import { useSyncExternalStore } from 'react'

// 브라우저에 저장되는 데이터 (SETUP: 데이터를 브라우저에 저장, 진짜 저장소는 나중에)

export type Cycle =
  | { type: 'daily' }
  | { type: 'weekly'; n: number }
  | { type: 'days'; days: number[] } // 0=월 … 6=일

export type Habit = { id: string; name: string; cycle: Cycle }
export type Frame = { kind: 'photo'; src: string } | { kind: 'check' }
export type Draft = { name: string; cycleType: Cycle['type']; n: number; days: number[] }
export type Screen = 'create' | 'home'

type State = {
  signedIn: boolean
  screen: Screen
  habits: Habit[]
  frames: Record<string, Frame> // `${habitId}|${YYYY-MM-DD}`
  draft: Draft
  notice: string | null // 홈에 한 줄로 보이는 안내. 저장하지 않음
}

export const emptyDraft: Draft = { name: '', cycleType: 'weekly', n: 3, days: [] }

const KEY = 'dailyroll.v1'

function load(): State {
  const base: State = { signedIn: false, screen: 'create', habits: [], frames: {}, draft: emptyDraft, notice: null }
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...base, ...JSON.parse(raw), notice: null }
  } catch {
    /* 저장된 걸 못 읽으면 빈 상태로 시작 */
  }
  return base
}

let state = load()
const listeners = new Set<() => void>()

/** 저장하지 못하면 false (용량 초과 등) */
function persist(): boolean {
  try {
    const { notice: _notice, ...saved } = state
    localStorage.setItem(KEY, JSON.stringify(saved))
    return true
  } catch {
    return false
  }
}

export function update(patch: Partial<State>): boolean {
  const prev = state
  state = { ...state, ...patch }
  const ok = persist()
  if (!ok) {
    state = prev
    return false
  }
  listeners.forEach((l) => l())
  return true
}

export function useStore(): State {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )
}
