import mongoose, { Schema, Document } from 'mongoose'

export interface IAnswer extends Document {
  questionId: 'q1' | 'q2'
  text: string
  tokens: string[]
  createdAt: Date
  ipHash?: string
  ua?: string
}

const AnswerSchema = new Schema<IAnswer>({
  questionId: {
    type: String,
    required: true,
    enum: ['q1', 'q2'],
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  tokens: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ipHash: {
    type: String,
    maxlength: 16,
  },
  ua: {
    type: String,
    maxlength: 500,
  },
})

// Create indexes for performance
AnswerSchema.index({ questionId: 1, createdAt: -1 })
AnswerSchema.index({ ipHash: 1, createdAt: -1 })

export default mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema)