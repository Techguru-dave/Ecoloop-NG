import { useState } from 'react'
import { MapPin, MessageCircle, Phone, Route } from 'lucide-react'
import RoleGuard from '@/components/RoleGuard'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

const hubs = [
  {
    id: 1,
    name: 'Lekki Hub',
    address: 'Lekki Phase 1, Lagos',
    phone: '+234 701 234 5678',
    materials: ['Plastic', 'Paper', 'Metal'],
    distance: '2.3 km'
  },
  {
    id: 2,
    name: 'VI Collection Center',
    address: 'Victoria Island, Lagos',
    phone: '+234 702 345 6789',
    materials: ['Plastic', 'Glass', 'Aluminum'],
    distance: '4.1 km'
  },
  {
    id: 3,
    name: 'Ajah Recycling Point',
    address: 'Ajah, Lagos',
    phone: '+234 703 456 7890',
    materials: ['Textile', 'Paper', 'Cardboard'],
    distance: '6.8 km'
  }
]

export default function RecyclerCollectionMap() {
  const [selectedHub, setSelectedHub] = useState(hubs[0])

  return (
    <RoleGuard role="recycler">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(27,94,32,0.14),_transparent_44%),linear-gradient(180deg,_#f8fcf8_0%,_#f3f8f2_100%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <header className="rounded-[2rem] border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Collection map</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Tap a nearby hub to review the address, accepted materials, and navigation options.
                </p>
              </div>
              <div className="rounded-3xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                {selectedHub.distance} away from your current route
              </div>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(135deg,_#dfeee0_0%,_#f8fcf8_100%)] p-4 shadow-sm sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(27,94,32,0.14),_transparent_28%),radial-gradient(circle_at_75%_30%,_rgba(255,107,53,0.12),_transparent_24%)]" />
              <div className="relative flex h-[360px] flex-col justify-between rounded-[1.5rem] border border-border/70 bg-white/60 p-5 backdrop-blur sm:h-[460px]">
                <div className="flex items-center justify-between rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Live route view
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{selectedHub.distance}</span>
                </div>

                <div className="relative flex-1 rounded-[1.5rem] border border-dashed border-primary/20 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9)_0%,_rgba(227,241,224,0.95)_100%)] p-4">
                  <div className="absolute left-[18%] top-[24%] h-12 w-12 rounded-full border border-primary/20 bg-primary/10" />
                  <div className="absolute right-[22%] top-[38%] h-14 w-14 rounded-full border border-primary/20 bg-primary/10" />
                  <div className="absolute bottom-[20%] left-[30%] h-10 w-10 rounded-full border border-primary/20 bg-background" />
                  <div className="absolute right-[16%] bottom-[16%] h-10 w-10 rounded-full border border-primary/20 bg-background" />
                  <button
                    type="button"
                    className="absolute left-[22%] top-[46%] flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm"
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    {selectedHub.name}
                  </button>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-border/70 shadow-sm">
              <CardHeader className="border-b border-border/70 bg-white/70">
                <CardTitle className="text-xl">Nearby hubs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 sm:p-6">
                {hubs.map((hub) => (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setSelectedHub(hub)}
                    className={`w-full rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      selectedHub.id === hub.id ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-card hover:border-primary hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{hub.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{hub.distance}</p>
                      </div>
                      <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        {hub.materials.length} materials
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/70 bg-white/70">
              <CardTitle className="text-xl">{selectedHub.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="mt-1 font-medium text-foreground">{selectedHub.address}</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-muted-foreground">Materials accepted</p>
                <div className="flex flex-wrap gap-2">
                  {selectedHub.materials.map((material) => (
                    <span key={material} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t border-border/70 bg-white/60 p-4 sm:flex-row sm:p-6">
              <Button variant="outline" className="flex-1 items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" className="flex-1 items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
              <Button variant="primary" className="flex-1 items-center justify-center gap-2">
                <Route className="h-4 w-4" />
                Navigate
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </RoleGuard>
  )
}
