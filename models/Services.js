import mongoose from 'mongoose'
const ServicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'service item title',
  },
  desc: {
    type: String,
    required: true,
    default: 'service item desc',
  },
  imageUrl: {
    type: String,
    required: true,
    default: 'service item image',
  },
})

export default mongoose.model('Service', ServicesSchema)
