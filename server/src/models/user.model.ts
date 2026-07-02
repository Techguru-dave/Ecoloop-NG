import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
  email: string
  name: string
  password: string
  role: 'donor' | 'recycler' | 'admin'
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['donor', 'recycler', 'admin'], default: 'donor' }
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as any)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = model<IUser>('User', userSchema)

export default User
