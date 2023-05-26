import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from './authService'
import axios from 'axios'
const initialState = {
  user: null,

  userLoading: true,
  alertType: '',
  alertText: '',
  isLoading: true,
  showAlert: false,
  homePage: null,
  roomPage: null,
  servicesPage: null,
  galleryPage: null,
  contactPage: null,
  isEditing: false,
  setEditData: '',
  modal: false,
}
const authFetch = axios.create({
  baseURL: '/api/v1',
})
// request

// response

authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // console.log(error.response)
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  }
)

/*export const loginUser = createAsyncThunk(
  'login',
  async ({ email, password }, thunkAPI) => {
    try {
      // console.log(name);
      //console.log(thunkAPI)
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      console.log(email, password)
      const resp = await axios.post('/api/v1/auth/login', email, password)

      return resp.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue()
    }
  }
)*/
//#region HomePage
export const getHomeData = createAsyncThunk(
  'home/getHomePage',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      const resp = await axios('api/v1/admin/getHomePageData')
      //console.log(resp)
      const homeData = resp.data.response[0]
      //console.log(homeData)
      return homeData
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const passwordChange = createAsyncThunk(
  'user/passwordChange',
  async (data, thunkAPI) => {
    try {
      //console.log(data)
      const resp = await authFetch.post('/admin/passwordChange', data)
      //console.log(resp)

      //console.log(homeData)
      return resp
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const createUser = createAsyncThunk(
  'user/createUser',
  async (data, thunkAPI) => {
    try {
      console.log(data)
      const resp = await authFetch.post('/admin/createUser', data)
      //console.log(resp)

      //console.log(homeData)
      return resp
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const updateHomeData = createAsyncThunk(
  'home/updateHomePage',
  async (
    { title, titleDesc, aboutUs, services, rooms, hotelInfo },
    thunkAPI
  ) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const newData = {
        pageTitle: title,
        titleDesc: titleDesc,
        aboutUsItem: aboutUs,
        servicesItem: services,
        roomsItem: rooms,
        hotelInfo: hotelInfo,
      }
      console.log(newData)
      const resp = await axios.patch('api/v1/admin/updateHomePageData', newData)
      console.log(resp)
      const updatedData = resp.data.response

      return updatedData
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

export const postHomePageImage = createAsyncThunk(
  'home/postHomeImage',
  async ({ files }, thunkAPI) => {
    try {
      //console.log(selectedFile)
      let formData = new FormData()
      files.forEach(function (value) {
        if (value) {
          //console.log(value)
          formData.append('images', value)
        }
      })
      //formData.append('images', files)
      //const formData = new FormData()
      /*const fileObjects = images.map((file) => {
        console.log(file)
        formData.append('files', file)
      })
      console.log(fileObjects)*/
      //formData.append('', files)
      //console.log(formData)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      // console.log(newData)
      const resp = await axios.post('api/v1/admin/addHomePageImage', formData)

      const response = resp.data.response
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const postAboutUsImage = createAsyncThunk(
  'home/postAboutUsImage',
  async ({ files }, thunkAPI) => {
    try {
      console.log(files[0])
      let formData = new FormData()

      //console.log(value)
      formData.append('images', files[0])

      //formData.append('images', files)
      //const formData = new FormData()
      /*const fileObjects = images.map((file) => {
        console.log(file)
        formData.append('files', file)
      })
      console.log(fileObjects)*/
      //formData.append('', files)
      //console.log(formData)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      // console.log(newData)
      const resp = await axios.patch(
        'api/v1/admin/updateAboutUsImage',
        formData
      )

      const response = resp.data.response
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

export const updateHomePageRoomImage = createAsyncThunk(
  'home/updateHomePageRoomImage',
  async ({ files, _id }, thunkAPI) => {
    try {
      console.log(_id)
      let formData = new FormData()

      //console.log(value)
      formData.append('images', files[0])
      formData.append('_id', _id)
      console.log(formData)
      //formData.append('images', files)
      //const formData = new FormData()
      /*const fileObjects = images.map((file) => {
        console.log(file)
        formData.append('files', file)
      })
      console.log(fileObjects)*/
      //formData.append('', files)
      //console.log(formData)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      // console.log(newData)
      const resp = await axios.patch(
        'api/v1/admin/updateHomePageRoomsImage',
        formData
      )

      const response = resp.data.response
      console.log(response)

      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const updateHomePageImage = createAsyncThunk(
  'home/updateHomePageImage',
  async (updatedImageData, thunkAPI) => {
    try {
      //Sconsole.log(data)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      //console.log(newData)
      const resp = await axios.patch(
        'api/v1/admin/updateHomePageImage',
        updatedImageData
      )
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

export const deleteHomeInfo = createAsyncThunk(
  'home/deleteHomeInfo',
  async ({ deleteElement }) => {
    try {
      console.log(deleteElement)
      //Sconsole.log(data)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      //console.log(newData)
      const resp = await axios.delete('api/v1/admin/deleteHotelInfo', {
        data: deleteElement,
      })
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const createHomeInfo = createAsyncThunk(
  'home/createHomeInfo',
  async (createElement) => {
    try {
      console.log(createElement)
      //Sconsole.log(data)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      //console.log(newData)
      const resp = await axios.post(
        'api/v1/admin/createHotelInfo',
        createElement
      )
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
//#endregion
//#region User
export const getRoomData = createAsyncThunk(
  'rooms/getRoomPage',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      const resp = await authFetch.get('/admin/getRoomPageData')
      //console.log(resp)
      const roomData = resp.data.response[0]
      //console.log(homeData)
      return roomData
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const createRoomFeature = createAsyncThunk(
  'home/createRoomFeature',
  async (createElement) => {
    try {
      console.log(createElement)
      //Sconsole.log(data)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      //console.log(newData)
      const resp = await authFetch.post(
        '/admin/createRoomFeature',
        createElement
      )
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const createRoomFeatureV2 = createAsyncThunk(
  'home/createRoomFeatureV2',
  async (createElement) => {
    try {
      console.log(createElement)
      //Sconsole.log(data)
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      //console.log(newData)
      const resp = await authFetch.post(
        '/admin/createRoomFeatureV2',
        createElement
      )
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const createRoomFeatureUl = createAsyncThunk(
  'home/createRoomFeatureUl',
  async (createElement) => {
    try {
      console.log(createElement)

      const resp = await authFetch.post(
        '/admin/createRoomFeatureUl',
        createElement
      )
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const postRoomPageImage = createAsyncThunk(
  'home/postRoomPageImage',
  async ({ files, _id }, thunkAPI) => {
    try {
      let formData = new FormData()
      files.forEach(function (value) {
        if (value) {
          formData.append('images', value)
        }
      })
      formData.append('_id', _id)

      const resp = await authFetch.post('/admin/addRoomPageImage', formData)

      const response = resp.data
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const deleteRoomFeature = createAsyncThunk(
  'home/deleteRoomFeature',
  async ({ deleteElement }) => {
    try {
      console.log(deleteElement)
      const resp = await authFetch.delete('/admin/deleteRoomFeature', {
        data: deleteElement,
      })
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const deleteRoomFeatureV2 = createAsyncThunk(
  'home/deleteRoomFeatureV2',
  async ({ deleteElement }) => {
    try {
      console.log(deleteElement)

      const resp = await authFetch.delete('/admin/deleteRoomFeatureV2', {
        data: deleteElement,
      })
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const deleteRoomFeatureUl = createAsyncThunk(
  'room/deleteRoomFeatureUl',
  async ({ deleteElement }) => {
    try {
      console.log(deleteElement)

      const resp = await authFetch.delete('/admin/deleteRoomFeatureUl', {
        data: deleteElement,
      })
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const updateRoomPageImage = createAsyncThunk(
  'room/updateRoomPageImage',
  async (updatedImageData, thunkAPI) => {
    try {
      console.log(updatedImageData)

      const resp = await authFetch.patch(
        '/admin/updateRoomPageImage',
        updatedImageData
      )
      const response = resp.data
      console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const updateRoomData = createAsyncThunk(
  'home/updateRoomData',
  async ({ title, rooms }, thunkAPI) => {
    try {
      const newData = {
        pageTitle: title,

        roomsItem: rooms,
      }
      console.log(newData)
      const resp = await authFetch.patch('/admin/updateRoomPageData', newData)
      console.log(resp)
      const updatedData = resp.data.response

      return updatedData
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const getServicesData = createAsyncThunk(
  'service/getServicesData',
  async (name, thunkAPI) => {
    try {
      const resp = await authFetch.get('/admin/getServices')
      //console.log(resp)
      const servicesData = resp.data.doc
      //console.log(servicesData)
      return servicesData
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const createService = createAsyncThunk(
  'services/createService',
  async ({ files, title, desc }, thunkAPI) => {
    try {
      // console.log(files[0])
      let formData = new FormData()
      formData.append('images', files[0])
      formData.append('title', title)
      formData.append('desc', desc)
      const resp = await authFetch.post('/admin/createService', formData)
      const response = resp.data.allServices
      //console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const deleteService = createAsyncThunk(
  'services/deleteService',
  async ({ deleteElement }, thunkAPI) => {
    try {
      console.log(deleteElement)
      const resp = await authFetch.delete('/admin/deleteService', {
        data: deleteElement,
      })
      const response = resp.data.allServices
      //console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ _id, title, desc }, thunkAPI) => {
    try {
      const resp = await authFetch.patch('/admin/updateService', {
        _id,
        title,
        desc,
      })
      const response = resp.data.allServices
      //console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const postServiceImage = createAsyncThunk(
  'services/postServiceImage',
  async ({ files, _id }, thunkAPI) => {
    try {
      console.log(files[0])
      let formData = new FormData()
      formData.append('images', files[0])
      formData.append('_id', _id)

      const resp = await authFetch.patch('/admin/postServiceImage', formData)

      const response = resp.data.allServices
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const postGalleryPageImage = createAsyncThunk(
  'gallery/postGalleryPageImage',
  async ({ files }, thunkAPI) => {
    try {
      //console.log(selectedFile)
      let formData = new FormData()
      files.forEach(function (value) {
        if (value) {
          //console.log(value)
          formData.append('images', value)
        }
      })

      const resp = await authFetch.post('/admin/postGalleryPageImage', formData)

      const response = resp.data.response
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const getGalleryData = createAsyncThunk(
  'gallery/getGalleryData',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      const resp = await authFetch.get('/admin/getGalleryPageData')
      //console.log(resp)
      const galleryData = resp.data.response[0]
      //console.log(homeData)
      return galleryData
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const updateGalleryPageImage = createAsyncThunk(
  'gallery/updateGalleryPageImage',
  async (updatedImageData, thunkAPI) => {
    try {
      const resp = await authFetch.patch(
        '/admin/updateGalleryPageImage',
        updatedImageData
      )
      const response = resp.data.response
      //console.log(resp)
      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const getContactData = createAsyncThunk(
  'contact/getContactData',
  async (name, thunkAPI) => {
    try {
      const resp = await authFetch.get('/admin/getContactPageData')
      //console.log(resp)
      const contactData = resp.data.response[0]
      //console.log(contactData)
      return contactData
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)
export const updateContactData = createAsyncThunk(
  'contact/updateContactData',
  async (
    { desc, phone, email, address, fbLink, insLink, googleLink, footerDesc },
    thunkAPI
  ) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const newData = {
        desc: desc,
        phone: phone,
        email: email,
        address: address,
        fbLink: fbLink,
        insLink: insLink,
        googleLink: googleLink,
        footerDesc: footerDesc,
      }
      console.log(newData)
      const resp = await authFetch.patch(
        '/admin/updateContactPageData',
        newData
      )
      console.log(resp)
      const updatedData = resp.data.response

      return updatedData
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

//#region  User
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password)

      return { user: data }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log(message)
      return thunkAPI.rejectWithValue()
    }
  }
)
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    const data = await AuthService.logout()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    console.log(message)
    return thunkAPI.rejectWithValue()
  }
})
//#endregion
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    displayAlert: (state, action) => {
      ;(state.showAlert = true),
        (state.alertType = 'danger'),
        (state.alertText = 'Please provide all values!')
    },

    clearAlert: (state) => {
      state.showAlert = false
      state.alertType = ''
      state.alertText = ''
    },
    setEditData: (state, action) => {
      state.isEditing = !state.isEditing
    },
    setModal: (state, action) => {
      state.modal = !state.modal
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log(action)
        state.isLoading = false
        ;(state.user = action.payload.user),
          (state.alertText = 'Giris Basarili Lütfen Bekleyiniz...'),
          (state.alertType = 'success'),
          (state.showAlert = true)
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action)
        ;(state.isLoading = false),
          (state.alertText = 'Email veya şifre yalnis!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null
        state.alertType = ''
        state.alertText = ''
        state.showAlert = false
        state.isLoading = false
      })
      .addCase(passwordChange.pending, (state) => {
        state.isLoading = true
      })
      .addCase(passwordChange.fulfilled, (state, action) => {
        // console.log(action)
        state.isLoading = false

        state.alertText = 'Şifreniz Başarıyla Güncellendi'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(passwordChange.rejected, (state, action) => {
        console.log(action)
        ;(state.isLoading = false),
          (state.alertText =
            'Yeni Şifreler Eşleşmiyor Veya Şuanki Şifreniz Yalnış!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        // console.log(action)
        state.isLoading = false

        state.alertText = 'Kullanıcı Başarıyla Eklendi!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log(action)
        ;(state.isLoading = false),
          (state.alertText =
            'Kullanıcı Eklenirken Hata Oluştu, Tekrar Deneyiniz!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log(action)
        ;(state.isLoading = false),
          (state.alertText = 'Çıkış işlemi başarısız'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(getHomeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHomeData.fulfilled, (state, action) => {
        state.homePage = action.payload
        state.isLoading = false
      })
      .addCase(getHomeData.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(updateHomeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateHomeData.fulfilled, (state, action) => {
        state.homePage = action.payload
        state.isLoading = false
        state.alertText = 'Veri Güncelleme  İşlemi Başarıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(updateHomeData.rejected, (state, action) => {
        state.isLoading = false
        ;(state.alertText = 'Güncelleme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(postHomePageImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postHomePageImage.fulfilled, (state, action) => {
        state.homePage.titleImageUrl = action.payload
        state.isLoading = false
        ;(state.alertText = 'Fotoğraf Yükleme İşlemi Başarılıyla Gerçekleşti!'),
          (state.alertType = 'success'),
          (state.showAlert = true)
      })
      .addCase(postHomePageImage.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Güncelleme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(updateHomePageImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateHomePageImage.fulfilled, (state, action) => {
        state.homePage.titleImageUrl = action.payload
        state.isLoading = false
        state.alertText = 'Fotoğraf Silme İşlemi Başarılıyla Gerçekleşti!'

        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(updateHomePageImage.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Fotoğraf silme işlemi başarısız oldu!'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(deleteHomeInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteHomeInfo.fulfilled, (state, action) => {
        state.homePage.hotelInfo = action.payload
        state.isLoading = false
        state.alertText = 'Veri Silme İşlemi Başarılıyla Gerçekleşti!'

        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(deleteHomeInfo.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Hotel info silme işlemi başarısız oldu!'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(createHomeInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createHomeInfo.fulfilled, (state, action) => {
        state.homePage.hotelInfo = action.payload
        state.isLoading = false
        state.alertText = 'Veri Ekleme İşlemi Başarılıyla Gerçekleşti!'
        ;(state.alertType = 'success'), (state.showAlert = true)
      })
      .addCase(createHomeInfo.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Hotel info ekleme işlemi başarısız oldu!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(postAboutUsImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postAboutUsImage.fulfilled, (state, action) => {
        state.homePage.aboutUsImageUrl = action.payload
        ;(state.isLoading = false(
          (state.alertText =
            'Fotoğraf Güncelleme İşlemi Başarılıyla Gerçekleşti!')
        )),
          (state.alertType = 'success'),
          (state.showAlert = true)
      })
      .addCase(postAboutUsImage.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText =
            'hakkında kısmı için foto ekleme  başarısız oldu!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(updateHomePageRoomImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateHomePageRoomImage.fulfilled, (state, action) => {
        state.isLoading = false
        state.homePage.roomsItem = action.payload
        state.alertText = 'Fotoğraf Güncelleme İşlemi Başarılıyla Gerçekleşti!'
        ;(state.alertType = 'success'), (state.showAlert = true)
      })
      .addCase(updateHomePageRoomImage.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Oda  Kısmı için foto ekleme  başarısız oldu!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(getRoomData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRoomData.fulfilled, (state, action) => {
        state.roomPage = action.payload
        state.isLoading = false
      })
      .addCase(getRoomData.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(createRoomFeature.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRoomFeature.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
        state.alertText = 'Oda Özelliği Başarılıyla Eklendi!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(createRoomFeature.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(createRoomFeatureV2.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRoomFeatureV2.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
        state.alertText = 'Maddeli Oda Özelliği Başarılıyla Eklendi!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(createRoomFeatureV2.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Maddeli Oda Özelliği Eklenemedi!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(createRoomFeatureUl.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRoomFeatureUl.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
        state.alertText = 'Maddeli Oda Özelliği Başarılıyla Eklendi!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(createRoomFeatureUl.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Maddeli Oda Özelliği Eklenemedi!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(postRoomPageImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postRoomPageImage.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
      })
      .addCase(postRoomPageImage.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(deleteRoomFeature.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRoomFeature.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
        state.alertText = 'Oda özelliği silme işlemi başarısız oldu!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(deleteRoomFeature.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Veri Getirme Işlemi Başarıyla Gerçekleşti!'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(deleteRoomFeatureV2.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRoomFeatureV2.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
        state.alertText = 'Oda Özelliği Silme İşlemi Başarıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(deleteRoomFeatureV2.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Veri Getirme Işlemi Başarısız oldu!'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(deleteRoomFeatureUl.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRoomFeatureUl.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
        state.alertText = 'Oda Özelliği Silme İşlemi Başarıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(deleteRoomFeatureUl.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Veri Getirme Işlemi Başarısız oldu!'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(updateRoomPageImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateRoomPageImage.fulfilled, (state, action) => {
        state.roomPage.roomsItem = action.payload
        state.isLoading = false
        state.alertText = 'Fotoğraf Güncelleme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(updateRoomPageImage.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Veri Getirme Işlemi Başarısız!'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(updateRoomData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateRoomData.fulfilled, (state, action) => {
        state.roomPage = action.payload
        state.isLoading = false
        state.alertText = 'Veri Güncelleme  İşlemi Başarıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(updateRoomData.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Veri Güncelleme Işlemi Başarısız!'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(getServicesData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServicesData.fulfilled, (state, action) => {
        state.servicesPage = action.payload
        state.isLoading = false
      })
      .addCase(getServicesData.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(createService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.servicesPage = action.payload
        state.isLoading = false
        state.alertText = 'Hizmet Ekleme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(createService.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.servicesPage = action.payload
        state.isLoading = false
        state.alertText = 'Hizmet Silme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(deleteService.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.servicesPage = action.payload
        state.isLoading = false
        state.alertText = 'Hizmet Güncelleme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(updateService.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.alertText = 'Veri Getirme Işlemi Başarısız!'),
          (state.alertType = 'danger'),
          (state.showAlert = true)
      })
      .addCase(postServiceImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postServiceImage.fulfilled, (state, action) => {
        state.servicesPage = action.payload
        state.isLoading = false
        state.alertText =
          'Hizmet  Fotoğrafı Güncelleme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(postServiceImage.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Hizmet  Fotoğrafı Güncelleme İşlemi Başarısız'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(postGalleryPageImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postGalleryPageImage.fulfilled, (state, action) => {
        state.galleryPage = action.payload
        state.isLoading = false
        state.alertText = 'Fotoğraf Ekleme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(postGalleryPageImage.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Fotoğraf Ekleme İşlemi Başarısız'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(getGalleryData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGalleryData.fulfilled, (state, action) => {
        state.galleryPage = action.payload
        state.isLoading = false
      })
      .addCase(getGalleryData.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Fotoğraf Görüntüleme  İşlemi Başarısız'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(updateGalleryPageImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGalleryPageImage.fulfilled, (state, action) => {
        state.galleryPage = action.payload
        state.isLoading = false
        state.alertText = 'Fotoğraf Silme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(updateGalleryPageImage.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Fotoğraf Silme  İşlemi Başarısız'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(getContactData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getContactData.fulfilled, (state, action) => {
        state.contactPage = action.payload
        state.isLoading = false
      })
      .addCase(getContactData.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Veri getirme İşlemi Başarısız'
        state.alertType = 'danger'
        state.showAlert = true
      })
      .addCase(updateContactData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateContactData.fulfilled, (state, action) => {
        state.contactPage = action.payload
        state.isLoading = false
        state.alertText = 'Veri Güncelleme İşlemi Başarılıyla Gerçekleşti!'
        state.alertType = 'success'
        state.showAlert = true
      })
      .addCase(updateContactData.rejected, (state, action) => {
        state.isLoading = false
        state.alertText = 'Veri Güncelleme İşlemi Başarısız'
        state.alertType = 'danger'
        state.showAlert = true
      })
  },
})

//export const { getNavbarItem, getSocialLink } = headerSlice.actions
export const { displayAlert, clearAlert, setEditData, setModal } =
  adminSlice.actions
export default adminSlice.reducer
