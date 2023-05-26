import mongoose from 'mongoose'
const ContactSchema = new mongoose.Schema({
  desc: {
    type: String,
    default: 'contact desc item',
  },
  phone: {
    type: String,
    default: 'contact phone item',
  },
  email: {
    type: String,
    default: 'contact email item',
  },
  address: {
    type: String,
    default: 'contact address item',
  },
  fbLink: {
    type: String,
    default: 'contact fbLink item',
  },
  insLink: {
    type: String,
    default: 'contact insLink item',
  },
  googleLink: {
    type: String,
    default: 'contact googleLink item',
  },
  footerDesc: {
    type: String,
    default: 'contact footerDesc item',
  },
})

export default mongoose.model('Contact', ContactSchema)
