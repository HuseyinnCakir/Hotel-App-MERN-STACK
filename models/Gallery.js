import mongoose from 'mongoose'
const GallerySchema = new mongoose.Schema({
  imageUrl: {
    type: [String],

    default: 'gallery image item',
  },
})

export default mongoose.model('Gallery', GallerySchema)
