import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Role = 'donor' | 'recycler' | 'admin'

const roleCards: Array<{ id: Role; title: string; description: string; path: string }> = [
  { id: 'donor', title: 'Donor Pickup', description: 'Schedule a pickup for recyclable waste and see available recyclers.', path: '/donor/schedule' },
  { id: 'recycler', title: 'Recycler Dashboard', description: 'Find nearby collections, select waste categories, and plan your route.', path: '/recycler/select' },
  { id: 'admin', title: 'Admin Console', description: 'Monitor pickups, manage users, and review collection progress.', path: '/admin' }
]

export default function Home() {
  const navigate = useNavigate()
  const [currentRole, setCurrentRole] = useState<Role | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ecoloop_user')
      if (raw) {
        const saved = JSON.parse(raw)
        setCurrentRole(saved?.role ?? null)
      }
    } catch {
      setCurrentRole(null)
    }
  }, [])

  const assignRole = (role: Role) => {
    const user = {
      id: `${role}-user`,
      name: role === 'admin' ? 'Admin User' : role === 'recycler' ? 'Recycler User' : 'Donor User',
      role,
      avatar: undefined
    }
    localStorage.setItem('ecoloop_user', JSON.stringify(user))
    setCurrentRole(role)
    const path = roleCards.find(card => card.id === role)?.path || '/'
    navigate(path)
  }

  const clearRole = () => {
    localStorage.removeItem('ecoloop_user')
    setCurrentRole(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl p-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Welcome to EcoLoop NG</h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          A modern circular economy platform for scheduling waste pickups, matching recyclers, and managing community recycling programs.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {roleCards.map(card => (
            <button
              key={card.id}
              type="button"
              onClick={() => assignRole(card.id)}
              className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </button>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Current session</h2>
            <p className="mt-2 text-sm text-slate-600">Use the buttons above to choose your role and move directly into the app flow.</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-slate-700">
                Current Role: <span className="font-semibold text-slate-900">{currentRole ?? 'None'}</span>
              </p>
              <button
                type="button"
                onClick={clearRole}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-800 hover:bg-slate-200"
              >
                Clear session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
