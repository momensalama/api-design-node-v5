import { Router } from 'express'
import { authenticatedToken } from '../middleware/auth.ts'
import {
  createHabit,
  getHabits,
  updateHabit,
} from '../controllers/habitController.ts'
import z from 'zod'
import { validateBody } from '../middleware/validation.ts'

const createHabitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  frequency: z.string(),
  targetCount: z.number(),
  tagIds: z.array(z.string()).optional(),
})

const router = Router()

router.use(authenticatedToken)

router.get('/', getHabits)

router.get('/:id', (req, res) => {
  res.json({ message: `Habit ${req.params.id} retrieved successfully` })
})
router.patch('/:id', updateHabit)

router.post('/', validateBody(createHabitSchema), createHabit)

router.delete('/:id', (req, res) => {
  res.json({ message: `Habit ${req.params.id} deleted successfully` })
})

router.post('/:id/complete', (req, res) => {
  res.json({ message: `Habit ${req.params.id} marked as complete` })
})

export default router
