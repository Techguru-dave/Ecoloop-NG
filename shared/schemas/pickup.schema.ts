import { z } from 'zod'

export const PickupSchema = z.object({
  donorId: z.string().min(1),
  wasteTypes: z.array(z.string()).min(1),
  photos: z.array(z.string()).optional(),
  estimatedWeight: z.number().positive().optional(),
  weightUnit: z.literal('KG').optional(),
  address: z.string().optional(),
  preferredDate: z.string().optional()
})

export type Pickup = z.infer<typeof PickupSchema>
