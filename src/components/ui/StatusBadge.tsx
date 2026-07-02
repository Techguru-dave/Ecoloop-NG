import React from 'react'

export type PickupStatus = 'requested' | 'accepted' | 'completed' | 'cancelled' | 'in-progress' | 'pending'

interface StatusBadgeProps {
  status: PickupStatus
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const variants: Record<PickupStatus, { bg: string; text: string; label: string }> = {
    requested: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Requested' },
    accepted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepted' },
    completed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Completed' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Progress' },
    pending: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Pending' }
  }

  const variant = variants[status]

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variant.bg} ${variant.text} ${className}`}>
      {variant.label}
    </span>
  )
}

export default StatusBadge
