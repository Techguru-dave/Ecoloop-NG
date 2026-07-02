import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Sparkles, Truck } from 'lucide-react'
import RoleGuard from '@/components/RoleGuard'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const wasteCategories = [
  { id: 'pet', label: 'PET', pricePerKg: 120, subtitle: 'Bottles & containers' },
  { id: 'plastic', label: 'Plastic', pricePerKg: 85, subtitle: 'Mixed plastics' },
  { id: 'nylon', label: 'Nylon', pricePerKg: 50, subtitle: 'Packaging films' },
  { id: 'paper', label: 'Paper', pricePerKg: 75, subtitle: 'Cardboard & paper' },
  { id: 'textile', label: 'Textile', pricePerKg: 110, subtitle: 'Clothes & fabrics' },
  { id: 'aluminum', label: 'Aluminum', pricePerKg: 200, subtitle: 'Scrap metal' }
]

function WasteCategoryIcon({ id, className }: { id: string; className?: string }) {
  const common = `h-6 w-6 ${className ?? ''}`.trim()

  switch (id) {
    case 'pet':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 4v5c0 4.2-2.7 7.7-7 9-4.3-1.3-7-4.8-7-9V7l7-4Z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
      )
    case 'plastic':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="7" width="14" height="10" rx="2" />
          <path d="M9 7V5h6v2" />
          <path d="M8 12h8" />
        </svg>
      )
    case 'nylon':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 6h10" />
          <path d="M8 6v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
          <path d="M10 12h4" />
        </svg>
      )
    case 'paper':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
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
    case 'aluminum':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8h12" />
          <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M8 8v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8" />
          <path d="M10 11h4" />
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

export default function RecyclerSelectWasteType() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]))
  }

  const maxRate = useMemo(
    () =>
      selected.length > 0
        ? Math.max(...selected.map((id) => wasteCategories.find((w) => w.id === id)?.pricePerKg || 0))
        : 0,
    [selected]
  )

  return (
    <RoleGuard role="recycler">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(27,94,32,0.14),_transparent_44%),linear-gradient(180deg,_#f8fcf8_0%,_#f3f8f2_100%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <header className="rounded-[2rem] border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Step 1 of 2
              </span>
              <span className="text-sm text-muted-foreground">Choose the materials your team can collect</span>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Select waste types</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  Pick the categories that fit your collection routes so donors are matched with the right recycler.
                </p>
              </div>
              <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-background p-2 shadow-sm">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Route-ready collection</p>
                    <p className="text-sm text-muted-foreground">Set your preferred materials and launch the nearby pickups list.</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <Card className="overflow-hidden border-border/70 shadow-sm">
              <CardHeader className="border-b border-border/70 bg-white/70">
                <CardTitle className="text-xl">Available categories</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {wasteCategories.map((category) => {
                    const isSelected = selected.includes(category.id)
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleToggle(category.id)}
                        aria-pressed={isSelected}
                        className={`rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-sm'
                            : 'border-border bg-card hover:border-primary hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                            <WasteCategoryIcon id={category.id} />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{category.label}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{category.subtitle}</p>
                            <p className="mt-2 text-sm font-medium text-primary">₦{category.pricePerKg}/kg</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <BadgeCheck className="h-4 w-4" />
                    Selected materials
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-foreground">{selected.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selected.length > 0 ? 'Materials are ready for matching.' : 'Choose your first material to continue.'}
                  </p>
                  <div className="mt-5 rounded-2xl border border-border bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Highest rate
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-foreground">₦{maxRate}/kg</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <p className="text-sm font-medium text-muted-foreground">Why this helps</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Donors can see the right pickup options instantly, and your team can focus on the materials you can collect reliably.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border/70 bg-card/90 p-4 shadow-sm sm:flex-row sm:justify-between sm:p-6">
            <p className="text-sm text-muted-foreground">{selected.length > 0 ? `${selected.length} categories selected` : 'Select one or more categories to begin.'}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" className="w-full sm:w-auto" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                disabled={selected.length === 0}
                onClick={() => selected.length > 0 && navigate('/recycler/map')}
              >
                Start collecting <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
