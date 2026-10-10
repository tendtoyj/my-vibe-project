import CreateHabit from './CreateHabit'
import Home from './Home'
import Login from './Login'
import { useStore } from './store'

export default function App() {
  const { signedIn, screen } = useStore()
  if (!signedIn) return <Login />
  if (screen === 'create') return <CreateHabit />
  return <Home />
}
