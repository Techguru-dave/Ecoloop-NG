import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock3, MapPin, Package2 } from 'lucide-react'
import RoleGuard from '@/components/RoleGuard'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import StatusBadge, { type PickupStatus } from '@/components/ui/StatusBadge'

interface DonorPickup {
  id: string
  title: string
  status: PickupStatus
  date: string
  requests: number
  details: string
  location: string
  weight: number
}

const availablePickups: DonorPickup[] = [
  {
    id: 'pickup-001',
    title: 'PET bottles from Surulere',
    status: 'requested',
    date: 'Today • 4:30 PM',
    requests: 4,
    details: 'Ready for same-day collection and fast payout.',
    location: 'Surulere, Lagos',
    weight: 42,
  },
  {
    id: 'pickup-002',
    title: 'Mixed plastics at a warehouse',
    status: 'in-progress',
    date: 'Tomorrow • 9:00 AM',
    requests: 2,
    details: 'Plastic bundles waiting at the gate.',
    location: 'Yaba, Lagos',
    weight: 28,
  },
  {
    id: 'pickup-003',
    title: 'Cardboard stack near Ikorodu',
    status: 'pending',
    date: 'Thursday • 2:00 PM',
    requests: 1,
    details: 'Large boxes available for pickup.',
    location: 'Ikorodu, Lagos',
    weight: 36,
  },
]

export default function DonorAvailablePickups() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>('pickup-001')

  const selectedPickup = availablePickups.find((pickup) => pickup.id === selected)

  return (
    <RoleGuard role="donor">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(27,94,32,0.14),_transparent_44%),linear-gradient(180deg,_#f8fcf8_0%,_#f3f8f2_100%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <header className="rounded-[2rem] border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Available pickups</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Review the requests nearby and select the one you want to confirm.
                </p>
              </div>
              <Link to="/donor/schedule">
                <Button variant="secondary">Schedule new pickup</Button>
              </Link>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              {availablePickups.map((pickup) => {
                const isSelected = selected === pickup.id
                return (
                  <button
                    key={pickup.id}
                    type="button"
                    onClick={() => setSelected(pickup.id)}
                    aria-pressed={isSelected}
                    className={`w-full rounded-[1.5rem] border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/50 sm:p-5 ${
                      isSelected ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-card hover:border-primary hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusBadge status={pickup.status} />
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                            {pickup.requests} request{pickup.requests > 1 ? 's' : ''}
                          </span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-foreground">{pickup.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{pickup.details}</p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-background/80 p-3 text-sm text-muted-foreground sm:min-w-[166px]">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          {pickup.date}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {pickup.location}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <Card className="overflow-hidden border-border/70 shadow-sm">
              <CardHeader className="border-b border-border/70 bg-white/70">
                <CardTitle className="text-xl">Selected pickup summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                {selectedPickup ? (
                  <>
                    <div className="rounded-3xl border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Package2 className="h-4 w-4" />
                        Pickup snapshot
                      </div>
                      <p className="mt-3 text-lg font-semibold text-foreground">{selectedPickup.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedPickup.details}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border bg-background/70 p-3">
                        <p className="text-sm text-muted-foreground">Estimated weight</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">{selectedPickup.weight} kg</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-background/70 p-3">
                        <p className="text-sm text-muted-foreground">Time window</p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Clock3 className="h-4 w-4 text-primary" />
                          {selectedPickup.date}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-3xl border border-dashed border-border bg-background/70 p-6 text-sm text-muted-foreground">
                    Choose a pickup request to continue.
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-3 border-t border-border/70 bg-white/60 p-4 sm:flex-row sm:justify-between sm:p-6">
                <Link to="/donor/schedule" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Schedule new pickup
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  className="w-full sm:w-auto"
                  disabled={!selected}
                  onClick={() => selected && navigate(`/donor/review/${selected}`)}
                >
                  Review request <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
