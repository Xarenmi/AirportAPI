import express from 'express'
import * as flightController from '../controllers/airportController.js'

const router = express.Router()

router.post('/flights', flightController.createFlight)
router.get('/flights', flightController.getAllFlights)
router.get('/flights/:flightNum', flightController.getFlightByNum)
router.patch('/flights/:flightNum', flightController.updateFlightByNum)
router.delete('/flights/:flightNum', flightController.deleteFlightByNum)
router.delete('/flights', flightController.deleteAllFlights)

export default router
