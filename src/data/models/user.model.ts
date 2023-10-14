import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const userModel = model('User', userSchema)
