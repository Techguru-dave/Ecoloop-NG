import React from 'react'
import { MapPin, Package } from 'lucide-react'
import { Card, CardContent } from './Card'
import StatusBadge, { type PickupStatus } from './StatusBadge'

interface PickupCardProps {
  pickup: {
    id?: string
    status?: PickupStatus
    address?: { street?: string; city?: string } | string
    estimatedWeight?: number
    weightUnit?: string
    wasteTypes?: string[]
  }
  onSelect?: () => void
  compact?: boolean
}

export const PickupCard: React.FC<PickupCardProps> = ({ pickup, onSelect, compact = false }) => {
  const compactAddressStreet = typeof pickup.address === 'string' ? pickup.address : pickup.address?.street

  if (compact) {
    return (
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onSelect}>
        <CardContent className="py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{compactAddressStreet || 'Pickup location'}</p>
              <p className="text-xs text-muted mt-1">{pickup.estimatedWeight}kg • {pickup.wasteTypes?.join(', ')}</p>
            </div>
            <StatusBadge status={pickup.status || 'requested'} />
          </div>
        </CardContent>
      </Card>
    )
  }

  const addressStreet = typeof pickup.address === 'string' ? pickup.address : pickup.address?.street
  const addressCity = typeof pickup.address === 'string' ? undefined : pickup.address?.city

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-text">{addressStreet || 'Pickup location'}</h3>
          <StatusBadge status={pickup.status || 'requested'} />
        </div>
        
        <div className="space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{addressCity || 'Lagos'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={16} />
            <span>{pickup.wasteTypes?.join(', ') || 'Various materials'}</span>
          </div>
          <div className="text-gray-600">
            Weight: <span className="font-medium">{pickup.estimatedWeight} {pickup.weightUnit || 'KG'}</span>
          </div>
        </div>

        {onSelect && (
          <button
            onClick={onSelect}
            className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            View Details
          </button>
        )}
      </CardContent>
    </Card>
  )
}

export default PickupCard
