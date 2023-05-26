import mongoose from 'mongoose'

const featuresSchema = new mongoose.Schema({
  desc: {
    type: String,
    maxlength: [100, 'Expense name must not be more than 40 characters'],
    default: 'room feature  title',
  },

  icon: {
    type: String,
    maxlength: 50,
    default: 'room feature icon',
  },
})
const featuresV2Schema = new mongoose.Schema({
  desc: {
    type: String,
    maxlength: [100, 'Expense name must not be more than 40 characters'],
    default: 'room feature  title',
  },

  icon: {
    type: String,
    maxlength: 50,
    default: 'room feature icon',
  },
  ulFeatures: {
    type: [String],
  },
})
const roomsSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [40, 'Expense name must not be more than 40 characters'],
    default: 'rooms item title',
  },
  image: {
    type: [String],

    default: 'rooms item image',
  },
  features: {
    type: [featuresSchema],
  },
  featuresV2: {
    type: [featuresV2Schema],
  },
})

const RoomSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    required: [true, 'Please provide page title'],
    default: 'Lavinia',
    maxlength: 50,
  },

  roomsItem: {
    type: [roomsSchema],
  },
})

export default mongoose.model('RoomPage', RoomSchema)
