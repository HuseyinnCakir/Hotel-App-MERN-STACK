import express from 'express'
const router = express.Router()

import {
  updateHomePageData,
  getHomePageData,
  postHomePageImage,
  updateHomePageImage,
  createHotelInfo,
  deleteHotelInfo,
  updateAboutUsImage,
  updateHomePageRoomsImage,
  createRoom,
  getRoomPageData,
  createRoomFeature,
  createRoomFeatureV2,
  createRoomFeatureUl,
  postRoomPageImage,
  deleteRoomFeature,
  deleteRoomFeatureV2,
  updateRoomPageImage,
  updateRoomPageData,
  deleteRoomFeatureUl,
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
} from '../controllers/adminController.js'
import auth from '../middleware/auth.js'
router.patch('/updateHomePageData', auth, updateHomePageData)
router.patch('/updateHomePageImage', auth, updateHomePageImage)
router.get('/getHomePageData', getHomePageData)
router.post('/addHomePageImage', auth, postHomePageImage)
router.post('/createHotelInfo', auth, createHotelInfo)
router.delete('/deleteHotelInfo', auth, deleteHotelInfo)
router.patch('/updateAboutUsImage', auth, updateAboutUsImage)
router.patch('/updateHomePageRoomsImage', auth, updateHomePageRoomsImage)
router.post('/createRoom', auth, createRoom)
router.get('/getRoomPageData', getRoomPageData)
router.post('/createRoomFeature', auth, createRoomFeature)
router.post('/createRoomFeatureV2', auth, createRoomFeatureV2)
router.post('/createRoomFeatureUl', auth, createRoomFeatureUl)
router.post('/addRoomPageImage', auth, postRoomPageImage)
router.patch('/updateRoomPageImage', auth, updateRoomPageImage)
router.delete('/deleteRoomFeature', auth, deleteRoomFeature)
router.delete('/deleteRoomFeatureV2', auth, deleteRoomFeatureV2)
router.delete('/deleteRoomFeatureUl', auth, deleteRoomFeatureUl)
router.patch('/updateRoomPageData', auth, updateRoomPageData)
router.post('/createService', auth, createService)
router.get('/getServices', getServices)
router.delete('/deleteService', auth, deleteService)
router.patch('/updateService', auth, updateService)
router.patch('/postServiceImage', auth, postServiceImage)
router.post('/postGalleryPageImage', auth, postGalleryPageImage)
router.get('/getGalleryPageData', getGalleryPageData)
router.patch('/updateGalleryPageImage', auth, updateGalleryPageImage)
router.patch('/updateContactPageData', auth, updateContactPageData)
router.get('/getContactPageData', getContactPageData)
router.post('/passwordChange', passwordChange)
router.post('/createUser', createUser)
export default router
