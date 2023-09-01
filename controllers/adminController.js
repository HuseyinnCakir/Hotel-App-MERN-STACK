import Home from '../models/Home.js'
import Services from '../models/Services.js'

import Room from '../models/Room.js'
import Gallery from '../models/Gallery.js'
import Contact from '../models/Contact.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from '../errors/index.js'
import fs from 'fs'
import User from '../models/User.js'
import checkPermissions from '../utils/checkPermission.js'
//#region HomePage
const updateHomePageData = async (req, res) => {
  //const { pageTitle, titleDesc } = req.body
  //Home.insertMany([{ pageTitle }, { titleDesc }])

  const {
    pageTitle,
    titleDesc,
    aboutUsItem,
    servicesItem,
    roomsItem,
    hotelInfo,
  } = req.body

  /* if (
    !pageTitle ||
    !titleDesc ||
    !aboutUsItem ||
    !servicesItem ||
    !roomsItem ||
    !hotelInfo
  ) {
    throw new BadRequestError('Please provide all values')
  }*/

  const home = await Home.findOne()

  home.pageTitle = pageTitle
  home.titleDesc = titleDesc
  home.aboutUsItem = aboutUsItem
  home.servicesItem = servicesItem
  home.roomsItem = roomsItem
  home.hotelInfo = hotelInfo

  await home.save()
  res.status(StatusCodes.OK).json({ response: home })
}

const getHomePageData = async (req, res) => {
  const response = await Home.find({})
  res.status(StatusCodes.OK).json({ response })
}
const postHomePageImage = async (req, res) => {
  //console.log(req)
  if (!req.files) {
    const error = new Error('No image provided.')
    error.statusCode = 422
    throw error
  }
  const home = await Home.findOne()
  let imageUrl

  //console.log(req.files)
  req.files.forEach(function (value) {
    if (value) {
      //console.log(value)
      imageUrl = value.filename
      home.titleImageUrl.push(imageUrl)
    }
  })

  await home.save()
  /*
  const home = await Home.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { titleImageUrl: imageUrl } }
  )*/
  const response = home.titleImageUrl
  res.status(StatusCodes.OK).json({ response })
}

const updateHomePageImage = async (req, res) => {
  const { imageUrl } = req.body
  // console.log(imageUrl)
  const home = await Home.findOne({})
  //console.log(Array.isArray(imageUrl))
  if (Array.isArray(imageUrl)) {
    imageUrl.forEach(function (value) {
      if (Home.find({ titleImageUrl: value })) {
        //console.log(value)
        home.titleImageUrl.pull(value)
        clearImage(value)
      }
    })
  } else {
    home.titleImageUrl.pull(imageUrl)
    clearImage(imageUrl)
  }

  /* Home.updateMany(
    { _id: '6436aa3f26b098fa0900777c' },
    { $pull: { titleImageUrl: { $in: imageUrl } } }
  )*/

  await home.save()
  res.status(StatusCodes.OK).json(home.titleImageUrl)
}
const clearImage = (path) => {
  const filePath = './images/' + path
  //console.log(filePath)
  fs.unlinkSync(filePath, (err) => console.log(err))
}
const createHotelInfo = async (req, res) => {
  const desc = req.body.desc
  const icon = req.body.icon
  if (!icon || !desc) {
    throw new BadRequestError('Please provide all values')
  }
  const newObject = { desc: desc, icon: icon }
  const home = await Home.findOne({})
  home.hotelInfo.push(newObject)
  await home.save()
  res.status(StatusCodes.CREATED).json(home.hotelInfo)
}
const deleteHotelInfo = async (req, res) => {
  const _id = req.body.id
  //console.log(_id)
  const home = await Home.findOne({})
  const updatedHotelInfo = home.hotelInfo.pull({ _id: _id })
  //console.log(updatedHotelInfo)
  /* if (!updatedHotelInfo) {
    throw new NotFoundError(`No hotel info with id :${_id}`)
  }*/
  await home.save()

  /*if (!home) {
    throw new NotFoundError(`No hote info with id :${_id}`)
  }

  await home.remove()
*/
  /*await Home.update(
    { _id: ObjectId('6436aa3f26b098fa0900777c' },
    { $pull: { hotelInfo: { _id: _id } } },
    { safe: true, multi: true },
    function (err, obj) {
      //do something smart
    }
  )*/
  res.status(StatusCodes.OK).json(updatedHotelInfo)
}
const updateAboutUsImage = async (req, res) => {
  //console.log(req)
  if (!req.files) {
    const error = new Error('No image provided.')
    error.statusCode = 422
    throw error
  }
  const home = await Home.findOne()
  //console.log(home)
  clearImage(home.aboutUsImageUrl)
  let imageUrl
  imageUrl = req.files[0].filename
  //console.log(imageUrl)
  home.aboutUsImageUrl = imageUrl

  //console.log(req.files)

  await home.save()
  //console.log(imageUrl)
  /*
  const home = await Home.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { titleImageUrl: imageUrl } }
  )*/
  const response = home.aboutUsImageUrl
  res.status(StatusCodes.OK).json({ response })
}

const updateHomePageRoomsImage = async (req, res) => {
  //console.log(req)
  const id = req.body._id
  //console.log(id)
  //const ids = [...id]
  /* if (!req.files) {
    const error = new Error('No image provided.')
    error.statusCode = 422
    throw error
  }
  const home = await Home.findOne()
  //clearImage(home.aboutUsImageUrl)
  let newImageUrl
  newImageUrl = req.files[0].filename*/
  const imageUrl = await Home.find(
    {},
    { roomsItem: { $elemMatch: { _id: id } } }
  )
  //console.log(imageUrl)
  clearImage(imageUrl[0].roomsItem[0].image)
  // console.log(imageUrl[0].roomsItem[0].image)
  /*const updatedImageUrl = await home.roomsItem.findOneAndUpdate(
    { _id: id },
    { image: imageUrl }
  )*/

  //console.log(req.files)
  // const doc = home.roomsItem
  let newImageUrl
  newImageUrl = req.files[0].filename
  const doc = await Home.updateOne(
    {
      roomsItem: { $elemMatch: { _id: id } },
    },
    { $set: { 'roomsItem.$.image': newImageUrl } }
  )

  console.log(doc)

  // console.log(updatedImageUrl)
  /*
  const home = await Home.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { titleImageUrl: imageUrl } }
  )*/
  // const response = updatedImageUrl
  const home = await Home.findOne()
  const response = home.roomsItem
  res.status(StatusCodes.OK).json({ response })
}
//#endregion

const getRoomPageData = async (req, res) => {
  const response = await Room.find({})
  res.status(StatusCodes.OK).json({ response })
}
const createRoom = async (req, res) => {
  const { title } = req.body
  const features = { desc: 'desc', icon: 'icon' }
  const newObject = { title: 'desc', features: features }
  const room = await Room.findOne({})
  room.roomsItem.push(newObject)
  await room.save()

  res.status(StatusCodes.OK).json({ room })
}
const createRoomFeature = async (req, res) => {
  const icon = req.body.icon
  const desc = req.body.desc
  const id = req.body._id
  //console.log(id)
  if (!desc || !icon) {
    throw new BadRequestError('Please provide all values')
  }
  const newObject = { desc: desc, icon: icon }
  const room = await Room.updateOne(
    { roomsItem: { $elemMatch: { _id: id } } },
    { $push: { 'roomsItem.$.features': newObject } }
  )

  //room[0].roomsItem[0].features.push(newObject)
  const roomPage = await Room.findOne()
  //await roomPage.save()
  res.status(StatusCodes.CREATED).json(roomPage.roomsItem)
}
const createRoomFeatureV2 = async (req, res) => {
  const icon = req.body.icon
  const desc = req.body.desc
  const id = req.body._id
  // console.log(id)
  if (!desc || !icon) {
    throw new BadRequestError('Please provide all values')
  }
  const newObject = { desc: desc, icon: icon }
  const room = await Room.updateOne(
    { roomsItem: { $elemMatch: { _id: id } } },
    { $push: { 'roomsItem.$.featuresV2': newObject } }
  )

  //room[0].roomsItem[0].features.push(newObject)
  const roomPage = await Room.findOne()
  //await roomPage.save()
  res.status(StatusCodes.CREATED).json(roomPage.roomsItem)
}
const createRoomFeatureUl = async (req, res) => {
  const desc = req.body.desc
  const id = req.body._id
  const subId = req.body.subId
  //console.log(subId)
  if (!desc) {
    throw new BadRequestError('Please provide all values')
  }

  const room = await Room.findOne(
    {},
    {
      roomsItem: { $elemMatch: { _id: id } },
    }
  )
  room.roomsItem[0].featuresV2.map((item) => {
    if (item._id == subId) {
      item.ulFeatures.push(desc)
    }
  })
  await room.save()
  // console.log(room.roomsItem[0].featuresV2)
  //room.push(desc)

  //room[0].roomsItem[0].features.push(newObject)
  const roomPage = await Room.findOne()
  //await roomPage.save()
  res.status(StatusCodes.CREATED).json(roomPage.roomsItem)
}
const deleteRoomFeatureUl = async (req, res) => {
  const desc = req.body.desc
  const id = req.body._id
  const subId = req.body.subId
  //console.log(subId)
  if (!desc) {
    throw new BadRequestError('Please provide all values')
  }

  const room = await Room.findOne(
    {},
    {
      roomsItem: { $elemMatch: { _id: id } },
    }
  )
  room.roomsItem[0].featuresV2.map((item) => {
    if (item._id == subId) {
      item.ulFeatures.pull(desc)
    }
  })
  await room.save()
  // console.log(room.roomsItem[0].featuresV2)
  //room.push(desc)

  //room[0].roomsItem[0].features.push(newObject)
  const roomPage = await Room.findOne()
  //await roomPage.save()
  res.status(StatusCodes.CREATED).json(roomPage.roomsItem)
}
const postRoomPageImage = async (req, res) => {
  //console.log(req)
  const id = req.body._id
  //console.log(id)
  if (!req.files) {
    const error = new Error('No image provided.')
    error.statusCode = 422
    throw error
  }
  //const home = await Home.findOne()
  let imageUrl

  //console.log(req.files)
  req.files.forEach(async function (value) {
    if (value) {
      //console.log(value)
      imageUrl = value.filename
      await Room.updateOne(
        { roomsItem: { $elemMatch: { _id: id } } },
        { $push: { 'roomsItem.$.image': imageUrl } }
      )
    }
  })

  //await home.save()
  /*
  const home = await Home.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { titleImageUrl: imageUrl } }
  )*/
  //const response = home.titleImageUrl
  const roomPage = await Room.findOne()
  res.status(StatusCodes.OK).json(roomPage.roomsItem)
}
const deleteRoomFeature = async (req, res) => {
  const roomId = req.body._id
  const featuresId = req.body.featuresId
  // console.log(featuresId)

  await Room.updateOne(
    { roomsItem: { $elemMatch: { _id: roomId } } },
    { $pull: { 'roomsItem.$.features': { _id: featuresId } } }
  )

  //room[0].roomsItem[0].features.push(newObject)
  const roomPage = await Room.findOne()
  //await roomPage.save()
  res.status(StatusCodes.OK).json(roomPage.roomsItem)
}
const deleteRoomFeatureV2 = async (req, res) => {
  const roomId = req.body._id
  const featuresId = req.body.featuresId
  //console.log(featuresId)

  await Room.updateOne(
    { roomsItem: { $elemMatch: { _id: roomId } } },
    { $pull: { 'roomsItem.$.featuresV2': { _id: featuresId } } }
  )

  //room[0].roomsItem[0].features.push(newObject)
  const roomPage = await Room.findOne()
  //await roomPage.save()
  res.status(StatusCodes.OK).json(roomPage.roomsItem)
}
const updateRoomPageImage = async (req, res) => {
  const { imageUrl } = req.body
  //console.log(imageUrl)
  const roomId = req.body._id
  // console.log(roomId)
  //console.log(Array.isArray(imageUrl))

  await Room.updateMany(
    { roomsItem: { $elemMatch: { _id: roomId } } },
    { $pullAll: { 'roomsItem.$.image': imageUrl } }
  )
  if (Array.isArray(imageUrl)) {
    imageUrl.forEach(function (value) {
      clearImage(value)
    })
  } else {
    clearImage(imageUrl)
  }

  /* Home.updateMany(
    { _id: '6436aa3f26b098fa0900777c' },
    { $pull: { titleImageUrl: { $in: imageUrl } } }
  )*/

  const roomPage = await Room.findOne()
  res.status(StatusCodes.OK).json(roomPage.roomsItem)
}
const updateRoomPageData = async (req, res) => {
  //const { pageTitle, titleDesc } = req.body
  //Home.insertMany([{ pageTitle }, { titleDesc }])

  const { pageTitle, roomsItem } = req.body

  /* if (
    !pageTitle ||
    !titleDesc ||
    !aboutUsItem ||
    !servicesItem ||
    !roomsItem ||
    !hotelInfo
  ) {
    throw new BadRequestError('Please provide all values')
  }*/

  const room = await Room.findOne()

  room.pageTitle = pageTitle

  room.roomsItem = roomsItem

  await room.save()
  res.status(StatusCodes.OK).json({ response: room })
}
const createService = async (req, res) => {
  const { title, desc } = req.body
  if (!req.files) {
    const error = new Error('No image provided.')
    error.statusCode = 422
    throw error
  }
  let newImageUrl
  newImageUrl = req.files[0].filename
  const newObject = { title: title, desc: desc, imageUrl: newImageUrl }
  const doc = new Services(newObject)
  await doc.save()
  //console.log(doc)
  const allServices = await Services.find()
  res.status(StatusCodes.CREATED).json({ allServices })
}
const getServices = async (req, res) => {
  const doc = await Services.find()

  res.status(StatusCodes.CREATED).json({ doc })
}
const deleteService = async (req, res) => {
  const _id = req.body._id
  //console.log(_id)
  const doc = await Services.findOneAndDelete({ _id: _id })
  //console.log(doc)
  clearImage(doc.imageUrl)

  const allServices = await Services.find()
  res.status(StatusCodes.OK).json({ allServices })
}
const updateService = async (req, res) => {
  const { _id, title, desc } = req.body
  const doc = await Services.findOneAndUpdate(
    { _id: _id },
    { title: title, desc: desc }
  )

  await doc.save()
  const allServices = await Services.find()
  res.status(StatusCodes.CREATED).json({ allServices })
}
const postServiceImage = async (req, res) => {
  const _id = req.body._id
  const doc = await Services.findOne({ _id: _id })
  clearImage(doc.imageUrl)
  let newImageUrl
  newImageUrl = req.files[0].filename
  //console.log(newImageUrl)
  doc.imageUrl = newImageUrl
  await doc.save()
  const allServices = await Services.find()
  res.status(StatusCodes.OK).json({ allServices })
}
const postGalleryPageImage = async (req, res) => {
  //console.log(req)
  if (!req.files) {
    const error = new Error('No image provided.')
    error.statusCode = 422
    throw error
  }
  const gallery = await Gallery.findOne()
  let imageUrl

  //console.log(req.files)
  req.files.forEach(function (value) {
    if (value) {
      //console.log(value)
      imageUrl = value.filename
      gallery.imageUrl.push(imageUrl)
    }
  })

  await gallery.save()
  /*
  const home = await Home.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { titleImageUrl: imageUrl } }
  )*/
  const response = gallery
  //console.log(response)
  res.status(StatusCodes.OK).json({ response })
}
const getGalleryPageData = async (req, res) => {
  const response = await Gallery.find()

  res.status(StatusCodes.CREATED).json({ response })
}
const updateGalleryPageImage = async (req, res) => {
  const { imageUrl } = req.body
  // console.log(imageUrl)
  const gallery = await Gallery.findOne({})
  //console.log(Array.isArray(imageUrl))
  if (Array.isArray(imageUrl)) {
    imageUrl.forEach(function (value) {
      if (Gallery.find({ imageUrl: value })) {
        //console.log(value)
        gallery.imageUrl.pull(value)
        clearImage(value)
      }
    })
  } else {
    gallery.imageUrl.pull(imageUrl)
    clearImage(imageUrl)
  }

  /* Home.updateMany(
    { _id: '6436aa3f26b098fa0900777c' },
    { $pull: { titleImageUrl: { $in: imageUrl } } }
  )*/

  await gallery.save()
  const response = gallery
  res.status(StatusCodes.OK).json({ response })
}
const getContactPageData = async (req, res) => {
  const response = await Contact.find()

  res.status(StatusCodes.CREATED).json({ response })
}
const updateContactPageData = async (req, res) => {
  const {
    desc,
    phone,
    email,
    address,
    fbLink,
    insLink,
    googleLink,
    footerDesc,
  } = req.body
  // console.log(desc)
  /* const contact = new Contact(
    desc,
    phone,
    email,
    address,
    fbLink,
    insLink,
    googleLink,
    footerDesc
  )*/
  const contact = await Contact.findOne()
  console.log(contact)
  contact.desc = desc
  contact.phone = phone
  contact.email = email
  contact.address = address
  contact.fbLink = fbLink
  contact.insLink = insLink
  contact.googleLink = googleLink
  contact.footerDesc = footerDesc
  await contact.save()
  console.log(contact)
  const response = contact
  res.status(StatusCodes.OK).json({ response })
}
const passwordChange = async (req, res) => {
  const { email, password, newPassword, newPasswordConfirm } = req.body

  if (!email || !password || !newPassword || !newPasswordConfirm) {
    throw new BadRequestError('Please provide all values')
  }
  if (newPassword !== newPasswordConfirm) {
    throw new BadRequestError('New passwords Dont Match!')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: 'Password Change' })
}
const createUser = async (req, res) => {
  const { user, name, email, password } = req.body
  if (!email || !password || !name) {
    throw new BadRequestError('Please provide all values')
  }
  checkPermissions(user)
  const newUser = await User.create({ name, email, password })
  res.status(StatusCodes.CREATED).json({ msg: 'User created!' })
}
export {
  createRoom,
  updateHomePageData,
  getHomePageData,
  postHomePageImage,
  updateHomePageImage,
  createHotelInfo,
  deleteHotelInfo,
  updateAboutUsImage,
  updateHomePageRoomsImage,
  getRoomPageData,
  createRoomFeature,
  createRoomFeatureV2,
  createRoomFeatureUl,
  postRoomPageImage,
  deleteRoomFeature,
  deleteRoomFeatureV2,
  deleteRoomFeatureUl,
  updateRoomPageImage,
  updateRoomPageData,
  createService,
  getServices,
  deleteService,
  updateService,
  postServiceImage,
  postGalleryPageImage,
  getGalleryPageData,
  updateGalleryPageImage,
  updateContactPageData,
  getContactPageData,
  passwordChange,
  createUser,
}
