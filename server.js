import { connect } from './config/database.js'
import express from 'express'
import router from './routes/airportRoutes.js'

const PORT = process.env.PORT || 3000
connect()

const api = express()
api.use(express.json())

api.use('/api/v1', router)

api.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT} 🚀`)
})
