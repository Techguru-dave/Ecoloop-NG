import { useMemo, useState } from 'react'
import { ArrowRight, Camera, CheckCircle2, MapPin, Sparkles, Truck } from 'lucide-react'
import RoleGuard from '@/components/RoleGuard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

const WASTE_CATALOG = [
  { id: 'plastic', label: 'Plastic', subtitle: 'PET bottles & wrappers' },
  { id: 'paper', label: 'Paper', subtitle: 'Cardboard & office paper' },
  { id: 'metal', label: 'Metal', subtitle: 'Cans & aluminum scraps' },
  { id: 'glass', label: 'Glass', subtitle: 'Bottles & jars' },
  { id: 'ewaste', label: 'Electronic Waste', subtitle: 'Chargers & old devices' },
  { id: 'textile', label: 'Textiles', subtitle: 'Clothes & upholstery' }
]

function WasteIcon({ id, className }: { id: string; className?: string }) {
  const common = `h-6 w-6 ${className ?? ''}`.trim()

  switch (id) {
    case 'plastic':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 4v5c0 4.2-2.7 7.7-7 9-4.3-1.3-7-4.8-7-9V7l7-4Z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
      )
    case 'paper':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
          <path d="M9 17h4" />
        </svg>
      )
    case 'metal':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8h14" />
          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          <path d="M7 8v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8" />
          <path d="M10 12h4" />
        </svg>
      )
    case 'glass':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3h8" />
          <path d="M9 3v3h6V3" />
          <path d="M8 6h8l-1 13a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2Z" />
          <path d="M10 10h4" />
        </svg>
      )
    case 'ewaste':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9z" />
          <path d="M10 4v3" />
          <path d="M14 4v3" />
          <path d="M10 17v3" />
          <path d="M14 17v3" />
        </svg>
      )
    case 'textile':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 5h10" />
          <path d="M8 5l2 3h4l2-3" />
          <path d="M9 8v11a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      )
  }
}

export default function DonorSchedulePickup() {
  const [selected, setSelected] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [notes, setNotes] = useState('')
  const [photoName, setPhotoName] = useState<string | null>(null)
  const [estimatedWeight, setEstimatedWeight] = useState<string>('')

  const selectedCount = useMemo(() => selected.length, [selected])

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )

  return (
    <RoleGuard role="donor">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(27,94,32,0.14),_transparent_44%),linear-gradient(180deg,_#f8fcf8_0%,_#f3f8f2_100%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <header className="rounded-[2rem] border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Step 1 of 3
              </span>
              <span className="text-sm text-muted-foreground">Mobile-first flow with desktop support</span>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Schedule a pickup</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Tell us what waste you have ready, where it is, and when you want it collected.
                </p>
              </div>
              <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-background p-2 shadow-sm">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Pickup planning</p>
                    <p className="text-sm text-muted-foreground">Recyclers receive a clearer request before arrival.</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardHeader className="border-b border-border/70 bg-white/70">
                  <CardTitle className="text-xl">Updated waste types</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {WASTE_CATALOG.map((waste) => {
                      const isSelected = selected.includes(waste.id)
                      return (
                        <button
                          key={waste.id}
                          type="button"
                          onClick={() => toggle(waste.id)}
                          aria-pressed={isSelected}
                          className={`rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            isSelected
                              ? 'border-primary bg-primary/10 shadow-sm'
                              : 'border-border bg-card hover:border-primary hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                              <WasteIcon id={waste.id} />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{waste.label}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{waste.subtitle}</p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 border-t border-border/70 bg-white/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-sm text-muted-foreground">
                    {selectedCount > 0
                      ? `${selectedCount} selected for collection`
                      : 'Select at least one waste type.'}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    Best match for nearby recyclers
                  </div>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Pickup details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Pickup location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="123 Main Street, Lagos"
                    />
                    <Input
                      label="Preferred pickup time"
                      value={pickupTime}
                      onChange={(event) => setPickupTime(event.target.value)}
                      placeholder="Tomorrow morning"
                    />
                  </div>
                  <Textarea
                    id="notes"
                    label="Additional notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Leave the boxes by the gate or ring the bell"
                    className="min-h-[120px]"
                    helperText="Add access instructions or pickup preferences."
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Upload photos</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <label
                    htmlFor="pickup-photo"
                    className="flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-secondary/50 p-6 text-center text-sm text-muted-foreground transition hover:border-primary hover:bg-background"
                  >
                    <input
                      id="pickup-photo"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? null)}
                    />
                    <div className="rounded-2xl bg-background p-3 shadow-sm">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <span className="mt-4 block font-medium text-foreground">Upload a photo</span>
                    <span className="mt-1">Show the waste you want picked up.</span>
                    {photoName && <span className="mt-3 text-xs font-medium text-primary">Selected: {photoName}</span>}
                  </label>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Estimated weight</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <Input
                      label="Weight estimate"
                      value={estimatedWeight}
                      onChange={(event) => setEstimatedWeight(event.target.value)}
                      placeholder="e.g. 12"
                      className="flex-1"
                      type="number"
                      min={0}
                    />
                    <div className="inline-flex items-center rounded-2xl bg-secondary px-4 py-3 text-sm font-medium text-muted-foreground">
                      kg
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-border bg-background/70 p-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Accurate estimates help recyclers plan arrival and payment.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border/70 bg-card/90 p-4 shadow-sm sm:flex-row sm:justify-between sm:p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {location ? `Pickup location ready: ${location}` : 'Add a pickup location to continue'}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                disabled={selected.length === 0 || !location || !pickupTime}
              >
                Request pickup <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
