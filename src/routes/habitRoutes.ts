import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Habits retrieved successfully' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Habit ${req.params.id} retrieved successfully` })
})

router.post('/', (req, res) => {
  res.json({ message: 'Habit created successfully' }).status(201)
})

router.delete('/:id', (req, res) => {
  res.json({ message: `Habit ${req.params.id} deleted successfully` })
})

router.post('/:id/complete', (req, res) => {
  res.json({ message: `Habit ${req.params.id} marked as complete` })
})

export default router
