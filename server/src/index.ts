import express, { Request, Response } from 'express'
import http from 'http'
import { Server as IOServer } from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import { PickupSchema } from '../../shared/schemas/pickup.schema.js'
import { UserSchema } from '../../shared/schemas/user.schema.js'
import PickupModel from './models/pickup.model.js'
import UserModel from './models/user.model.js'
import { authMiddleware, roleMiddleware, generateToken, verifyToken, type AuthUser } from './middleware/auth.js'

const app = express()
const server = http.createServer(app)
const io = new IOServer(server, {
  cors: { origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }
})

// Middleware
app.use(helmet())
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }))
app.use(express.json())

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/ecoloop'
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error', err))

// ==================== AUTH ENDPOINTS ====================

// Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body

    if (!email || !name || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const user = new UserModel({ email, name, password, role })
    await user.save()

    const authUser: AuthUser = {
      id: user._id.toString(),
      name: user.name,
      role: user.role as 'donor' | 'recycler' | 'admin',
      email: user.email
    }

    const token = generateToken(authUser)
    res.json({ user: authUser, token })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' })
    }

    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isPasswordValid = await (user as any).comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const authUser: AuthUser = {
      id: user._id.toString(),
      name: user.name,
      role: user.role as 'donor' | 'recycler' | 'admin',
      email: user.email
    }

    const token = generateToken(authUser)
    res.json({ user: authUser, token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// ==================== PICKUP ENDPOINTS ====================

// Create pickup (donor only)
app.post('/api/pickups', authMiddleware, roleMiddleware('donor'), async (req: Request, res: Response) => {
  try {
    const parsed = PickupSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() })
    }

    const created = await PickupModel.create({
      ...parsed.data,
      donorId: req.user!.id,
      status: 'requested'
    })

    io.emit('pickup:created', { id: created._id, ...created.toObject() })
    res.status(201).json(created)
  } catch (err) {
    console.error('Error creating pickup:', err)
    res.status(500).json({ error: 'Failed to create pickup' })
  }
})

// Get all pickups (with filters based on role)
app.get('/api/pickups', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { status } = req.query
    const filter: any = {}

    if (status) filter.status = status

    // Donors only see their own pickups
    if (req.user!.role === 'donor') {
      filter.donorId = req.user!.id
    }

    const pickups = await PickupModel.find(filter).limit(100)
    res.json({ pickups })
  } catch (error) {
    console.error('Fetch pickups error:', error)
    res.status(500).json({ error: 'Failed to fetch pickups' })
  }
})

// Get single pickup
app.get('/api/pickups/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const pickup = await PickupModel.findById(req.params.id)
    if (!pickup) {
      return res.status(404).json({ error: 'Pickup not found' })
    }
    res.json(pickup)
  } catch (error) {
    console.error('Fetch pickup error:', error)
    res.status(500).json({ error: 'Failed to fetch pickup' })
  }
})

// Accept pickup (recycler only)
app.patch('/api/pickups/:id/accept', authMiddleware, roleMiddleware('recycler'), async (req: Request, res: Response) => {
  try {
    const pickup = await PickupModel.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted', assignedRecycler: req.user!.id },
      { new: true }
    )

    if (!pickup) {
      return res.status(404).json({ error: 'Pickup not found' })
    }

    io.emit('pickup:accepted', { id: pickup._id, ...pickup.toObject() })
    res.json(pickup)
  } catch (error) {
    console.error('Accept pickup error:', error)
    res.status(500).json({ error: 'Failed to accept pickup' })
  }
})

// Complete pickup
app.patch('/api/pickups/:id/complete', authMiddleware, async (req: Request, res: Response) => {
  try {
    const pickup = await PickupModel.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    )

    if (!pickup) {
      return res.status(404).json({ error: 'Pickup not found' })
    }

    io.emit('pickup:completed', { id: pickup._id, ...pickup.toObject() })
    res.json(pickup)
  } catch (error) {
    console.error('Complete pickup error:', error)
    res.status(500).json({ error: 'Failed to complete pickup' })
  }
})

// ==================== SOCKET.IO EVENT HANDLERS ====================

io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`)

  socket.on('join:donor', (userId: string) => {
    socket.join(`donor:${userId}`)
  })

  socket.on('join:recycler', (userId: string) => {
    socket.join(`recycler:${userId}`)
  })

  socket.on('join:admin', () => {
    socket.join('admin')
  })

  socket.on('status:update', (data: { pickupId: string; status: string }) => {
    io.emit('status:changed', data)
  })

  socket.on('disconnect', () => {
    console.log(`🔴 Socket disconnected: ${socket.id}`)
  })
})

// ==================== HEALTH CHECK ====================

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ==================== START SERVER ====================

const PORT = process.env.PORT ?? 4000
server.listen(PORT, () => {
  console.log(`🚀 EcoLoop server listening on port ${PORT}`)
})
