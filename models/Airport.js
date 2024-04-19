import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema({
  aircraft: { type: String, required: true },
  registry: { type: String, required: true, unique: true },
  flight: { type: String, required: true },
  airline: { type: String, required: true },
  destination: { type: String, required: true },
  departure: { type: Date, required: true },
  gate: { type: Number, required: true },
  flightStatus: {
    type: String,
    required: true,
    enum: [
      'ON TIME',
      'DELAYED',
      'DEPARTING',
      'CANCELLED'
    ]
  }
})

const Flight = new mongoose.model('Flight', flightSchema)
export default Flight
