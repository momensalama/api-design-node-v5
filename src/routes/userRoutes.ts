import { Router } from 'express'
import { authenticatedToken } from '../middleware/auth.ts'

const router = Router()

router.use(authenticatedToken)

router.get('/', (req, res) => {
  res.json({ message: 'Users retrieved successfully' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} retrieved successfully` })
})

router.put('/', (req, res) => {
  res.json({ message: 'User updated successfully' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted successfully` })
})

export default router
