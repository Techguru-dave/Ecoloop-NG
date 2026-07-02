import mongoose, { Schema } from 'mongoose'

const PickupSchema = new Schema(
  {
    donorId: { type: String, required: true },
    wasteTypes: [{ type: String, required: true }],
    photos: [{ type: String }],
    estimatedWeight: { type: Number },
    weightUnit: { type: String, enum: ['KG'], default: 'KG' },
    address: { type: String },
    preferredDate: { type: Date },
    status: { type: String, enum: ['requested', 'accepted', 'completed', 'cancelled'], default: 'requested' },
    assignedRecycler: { type: String, default: null }
  },
  { timestamps: true }
)

export default mongoose.models.Pickup || mongoose.model('Pickup', PickupSchema)
