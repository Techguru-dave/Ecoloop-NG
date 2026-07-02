import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BadgeCheck, CircleDollarSign, MapPin, Package2, Sparkles } from 'lucide-react'
import RoleGuard from '@/components/RoleGuard'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/Card'

export default function DonorReviewPickup() {
  const { id } = useParams()
  const donor = { name: 'Adebayo Chen', rating: 4.8, location: 'Lekki Phase 1, Lagos' }
  const items = [
    { type: 'PET Bottles', weight: 15, value: '₦1,800' },
    { type: 'Aluminum Cans', weight: 5, value: '₦600' },
    { type: 'Cardboard', weight: 12, value: '₦1,350' }
  ]

  return (
    <RoleGuard role="donor">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(27,94,32,0.14),_transparent_44%),linear-gradient(180deg,_#f8fcf8_0%,_#f3f8f2_100%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <header className="rounded-[2rem] border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Review request
              </span>
              <span className="text-sm text-muted-foreground">Confirm the pickup before it is locked in.</span>
            </div>
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Review pickup request</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  Look over the route, waste breakdown, and estimated value before accepting.
                </p>
              </div>
              <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Estimated value is updated in real time.
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
                        A
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-foreground">{donor.name}</p>
                        <p className="text-sm text-muted-foreground">⭐ {donor.rating} • Verified donor</p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          {donor.location}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/80 p-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        {id ? `Pickup ID ${id}` : 'Pickup ID ready'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardHeader className="border-b border-border/70 bg-white/70">
                  <CardTitle className="text-xl">Collection details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="rounded-3xl border border-border bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Package2 className="h-4 w-4" />
                      Materials to collect
                    </div>
                    <div className="mt-4 space-y-3">
                      {items.map((item) => (
                        <div key={item.type} className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-3 py-3">
                          <div>
                            <p className="font-medium text-foreground">{item.type}</p>
                            <p className="text-sm text-muted-foreground">{item.weight} kg</p>
                          </div>
                          <span className="text-sm font-semibold text-primary">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-border bg-[radial-gradient(circle_at_top_left,_rgba(27,94,32,0.18),_transparent_60%)] p-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <MapPin className="h-4 w-4" />
                      Route preview
                    </div>
                    <div className="mt-4 rounded-3xl border border-border bg-background/80 p-6 text-center text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">Lekki corridor</p>
                      <p className="mt-2">The recycler will follow this route and arrive with a confirmation message.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardContent className="space-y-4 p-4 sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <CircleDollarSign className="h-4 w-4" />
                    Estimated payout
                  </div>
                  <p className="text-4xl font-semibold text-foreground">₦4,250.00</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    This estimate is based on your selected material mix and current market rates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="overflow-hidden border-border/70 shadow-sm">
            <CardFooter className="flex flex-col gap-3 p-4 sm:flex-row sm:justify-between sm:p-6">
              <Link to="/donor/available" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Skip request
                </Button>
              </Link>
              <Button variant="primary" className="w-full sm:w-auto">
                Accept pickup <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </RoleGuard>
  )
}
