import mongoose from 'mongoose'

const aboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [50, 'Expense name must not be more than 40 characters'],
    default: 'aboutUs item title',
  },
  desc: {
    type: String,
    default: 'AboutUs item desc',
  },
})
const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [50, 'Expense name must not be more than 40 characters'],
    default: 'service item title',
  },
  desc: {
    type: String,
    default: 'service item desc',
  },
  icon: {
    type: String,
    maxlength: 100,
    default: 'service item icon',
  },
})
const roomsSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [40, 'Expense name must not be more than 40 characters'],
    default: 'rooms item title',
  },
  desc: {
    type: String,
    default: 'rooms item desc',
  },
  image: {
    type: String,

    default: 'rooms item image',
  },
})
const hotelInfoSchema = new mongoose.Schema({
  desc: {
    type: String,
    maxlength: [100, 'Expense name must not be more than 40 characters'],
    default: 'service item title',
  },
  icon: {
    type: String,
    maxlength: 100,
    default: 'service item icon',
  },
})
const HomeSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    required: [true, 'Please provide page title'],
    default: 'Lavinia',
    maxlength: 50,
  },
  titleDesc: {
    type: String,
    required: [true, 'Please provide page title'],
    default: 'Lavinia desc',
  },
  aboutUsItem: {
    type: [aboutUsSchema],
  },

  servicesItem: {
    type: [servicesSchema],
  },
  roomsItem: {
    type: [roomsSchema],
  },
  hotelInfo: {
    type: [hotelInfoSchema],
  },
  titleImageUrl: {
    type: [String],
    required: true,
  },
  aboutUsImageUrl: {
    type: String,
    required: true,
  },
})

export default mongoose.model('HomePage', HomeSchema)
