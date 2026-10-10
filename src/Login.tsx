import { useState } from 'react'
import PhotoGallery from './PhotoGallery'
import { update, useStore } from './store'

export default function Login() {
  const { habits } = useStore()
  const [waiting, setWaiting] = useState(false)

  function signIn() {
    // 흉내: 구글 로그인 — 구글 창 없이 바로 통과 (SETUP)
    if (waiting) return
    setWaiting(true)
    setTimeout(() => {
      update({ signedIn: true, screen: habits.length > 0 ? 'home' : 'create' })
    }, 400)
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[480px] flex-col justify-between px-6 pt-16 pb-10">
      <div className="flex flex-1 flex-col items-center justify-center pb-12 text-center">
        <PhotoGallery />
        <h1 className="mt-8 text-[24px] leading-8 font-bold">데일리롤</h1>
        <p className="mt-3 text-[16px] leading-6 text-fg-2">
          습관마다 사진으로 칸을 채우고,
          <br />한 주와 한 달을 돌아봐요.
        </p>
      </div>
      <div>
        <button className="btn-primary" onClick={signIn} aria-busy={waiting}>
          구글로 시작해요
        </button>
        <p className="mt-3 text-center text-[14px] leading-5 font-medium text-muted">
          시작하면 약관·개인정보 동의로 봐요.
        </p>
      </div>
    </main>
  )
}
