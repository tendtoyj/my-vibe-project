import CreateHabit from './CreateHabit'
import Login from './Login'
import { useStore } from './store'

export default function App() {
  const { signedIn, screen } = useStore()
  if (!signedIn) return <Login />
  if (screen === 'create') return <CreateHabit />
  return <div className="p-6">홈</div>
}
