import { z } from 'zod'

export const userSchema = z
  .object({
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    email: z.string().email(),
    password: z.string().refine(
      password => {
        if (password.length < 8) {
          return false
        }

        if (password.length < 8) {
          return false
        }

        if (!/[!@#$%^&*]/.test(password)) {
          return false
        }

        if (!/[A-Z]/.test(password)) {
          return false
        }

        return true
      },
      {
        message: 'Password must contain at least 8 characters, 1 special character, and 1 uppercase letter'
      }
    ),
    confirmPassword: z.string().refine(
      confirmPassword => {
        if (confirmPassword.length < 8) {
          return false // Asegúrate de que el campo confirmPassword no sea nulo o undefined
        }
        return true
      },
      { message: 'Confirm Password is required' }
    ),
    age: z.number().min(18).max(100)
  })
  .refine(data => data.password === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })
