import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.enum(['donor', 'recycler', 'admin']),
  avatar: z.string().optional()
})

export type User = z.infer<typeof UserSchema>
