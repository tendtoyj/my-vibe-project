import Login from './Login'
import { useStore } from './store'

export default function App() {
  const { signedIn, screen } = useStore()
  if (!signedIn) return <Login />
  if (screen === 'create') {
    return <div className="p-6">습관 이름과 주기를 정해요.</div>
  }
  return <div className="p-6">홈</div>
}
