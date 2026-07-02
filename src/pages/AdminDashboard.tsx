import RoleGuard from '@/components/RoleGuard'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function AdminDashboard() {
  return (
    <RoleGuard role="admin">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">Manage pickups, users, roles, and live collection status.</p>
          </div>
          <Button variant="primary">Create pickup</Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-slate-900">128</p>
              <p className="text-sm text-slate-600">Active and scheduled requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Recyclers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-slate-900">24</p>
              <p className="text-sm text-slate-600">Currently available nearby</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-slate-900">8</p>
              <p className="text-sm text-slate-600">Awaiting admin approval</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  )
}
