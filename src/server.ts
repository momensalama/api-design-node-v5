import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res
    .status(200)
    .json({ status: 'healthy', message: 'Server is running smoothly' })
})

export default app
