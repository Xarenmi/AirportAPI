import Flight from '../models/Airport.js'

const createFlight = async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body)
    res.status(201).json(newFlight)
  } catch (error) {
    res.status(400).json({ msg: 'Error creating flight', error })
  }
}

const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find()
    res.status(200).json(flights)
  } catch (error) {
    res.status(400).json({ msg: 'Error getting flights', error })
  }
}

const getFlightByNum = async (req, res) => {
  try {
    const findFlight = await Flight.find({ flight: req.params.flightNum })
    res.status(200).json(findFlight)
  } catch (error) {
    res.status(400).json({ msg: `Flight ${req.params.flightNum} not found` })
  }
}

const updateFlightByNum = async (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ msg: 'No data to update' })
  const filter = { flight: req.params.flightNum }
  const update = { $set: req.body }

  try {
    const updateFlight = await Flight.updateOne(filter, update, { new: true })
    res.status(200).json(`${filter} updated`)
  } catch (error) {
    res.status(400).json({ msg: `Error updating info for flight ${req.params.flightNum}` })
  }
}

const deleteFlightByNum = async (req, res) => {
  if (!req.params.flightNum) return res.status(400).json({ msg: 'Missing flight number' })
  const filter = { flight: req.params.flightNum }

  if (req.query.destroy === 'true') {
    try {
      const removeFlight = await Flight.deleteOne(filter)
      if (removeFlight.deletedCount === 0) {
        return res.status(404).json({ msg: 'Flight not found for deletion' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ msg: 'Error deleting flight', error })
    }
  }

  try {
    const update = { $set: { flightStatus: 'CANCELLED' } }
    const updateFlight = await Flight.updateOne(filter, update, { new: true })
    res.status(200).json(updateFlight)
  } catch (error) {
    res.status(400).json({ msg: `Error updating info for flight ${req.params.flightNum}` })
  }
}

const deleteAllFlights = async (req, res) => {
  if (req.query.deleteAll === 'true') {
    try {
      const deleteAll = await Flight.deleteMany({})
      if (deleteAll.deletedCount === 0) {
        return res.status(404).json({ msg: 'No flights found for deletion' })
      }
      return res.status(204).json()
    } catch (error) {
      console.error('Error deleting flights:', error)
      return res.status(400).json({ msg: 'Error deleting all flights' })
    }
  }
}

export {
  createFlight,
  getAllFlights,
  getFlightByNum,
  updateFlightByNum,
  deleteFlightByNum,
  deleteAllFlights
}
