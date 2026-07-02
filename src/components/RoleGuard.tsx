import React from 'react'
import { useAuth } from '../lib/useAuth'

type Role = 'donor' | 'recycler' | 'admin'

export default function RoleGuard({ role, children }: { role: Role | Role[]; children: React.ReactNode }) {
  const { user } = useAuth()
  const allowed = Array.isArray(role) ? role : [role]
  if (!user) {
    return <div className="p-6 text-center text-sm text-gray-600">Please sign in to continue.</div>
  }
  if (!allowed.includes(user.role as Role)) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800">Access denied</h3>
        <p className="mt-2 text-sm text-gray-600">You do not have permission to view this page.</p>
      </div>
    )
  }
  return <>{children}</>
}
