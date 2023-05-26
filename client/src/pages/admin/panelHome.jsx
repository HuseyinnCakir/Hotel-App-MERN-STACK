import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTextArea,
} from 'mdb-react-ui-kit'
import {
  getHomeData,
  setEditData,
  updateHomeData,
  postHomePageImage,
  deleteHomeInfo,
  setModal,
  displayAlert,
  clearAlert,
  createHomeInfo,
  postAboutUsImage,
  updateHomePageRoomImage,
  updateHomePageImage,
} from '../../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ImageUpload from '../../components/admin/dropZone'
import ModalComponent from '../../components/admin/modal'
import Loading from '../../components/loading'
import ImageUploaded from '../../components/admin/uploadedImage'
import Alert from '../../components/alert'

const thumb = {
  display: 'flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}
const panelHome = () => {
  const { homePage, user, isEditing, isLoading, modal, showAlert } =
    useSelector((store) => store.admin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHomeData())
  }, [])

  const [id, setId] = useState(homePage?._id)
  const [title, setTitle] = useState(homePage?.pageTitle)
  const [titleDesc, setTitleDesc] = useState(homePage?.titleDesc)
  const [aboutUs, setAboutUs] = useState(homePage?.aboutUsItem)
  //const [aboutUsDesc, setAboutUsDesc] = useState(homePage?.aboutUsItem[0].desc)
  const [services, setServices] = useState(homePage?.servicesItem)
  const [rooms, setRooms] = useState(homePage?.roomsItem)
  const [hotelInfo, setHotelInfo] = useState(homePage?.hotelInfo)
  const [aboutUsImageUrl, setAboutUsImageUrl] = useState(
    homePage?.aboutUsImageUrl
  )

  useEffect(() => {
    setId(homePage?._id)
    setTitle(homePage?.pageTitle)
    setTitleDesc(homePage?.titleDesc)
    setAboutUsImageUrl(homePage?.aboutUsImageUrl)
    //setAboutUsTitle(homePage?.aboutUsItem[0].title)
    //setAboutUsDesc(homePage?.aboutUsItem[0].desc)
    setAboutUs(homePage?.aboutUsItem)
    setServices(homePage?.servicesItem)
    setRooms(homePage?.roomsItem)
    setHotelInfo(homePage?.hotelInfo)
  }, [homePage])

  const handleChange = (index, state, setState) => (e) => {
    const newArray = state?.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value }
      } else {
        return item
      }
    })
    setState(newArray)
  }
  const deleteHotelInfo = (_id) => (e) => {
    e.preventDefault()
    const deleteElement = { id: _id }
    dispatch(deleteHomeInfo({ deleteElement }))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
  const updateData = (e) => {
    e.preventDefault()
    if (!title || !titleDesc || !aboutUs || !services || !rooms || !hotelInfo) {
      dispatch(displayAlert())
      return
    }
    dispatch(setEditData())
    dispatch(
      updateHomeData({
        id,
        title,
        titleDesc,
        aboutUs,
        services,
        rooms,
        hotelInfo,
      }),
      setTimeout(() => {
        dispatch(clearAlert())
      }, 3000)
    )
  }

  if (isLoading) {
    return (
      <MDBContainer className="p-5 mb-5">
        <MDBRow className="d-flex justify-content-center align-items-center m-5">
          <Loading />
        </MDBRow>
      </MDBContainer>
    )
  }
  return (
    <div>
      <MDBContainer className="p-5 mb-3">
        <h5 className="d-flex justify-content-end align-items-center m-4 p-4 ">
          Merhaba {user.user.name || ''}, Lavinia admin paneline hoşgeldin!
        </h5>
        <h2 className="d-flex justify-content-center align-items-center m-4 p-4">
          Ana Sayfa
        </h2>
        {showAlert && <Alert />}
        <a
          target="_blank"
          href="https://mdbootstrap.com/docs/react/content-styles/icons/"
          className="d-flex justify-content-center"
        >
          İcon isimlerine bu linkten ulaşabilirsiniz...
        </a>

        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="4">
            <MDBInput
              className="mb-4"
              id="form1Example2"
              value={title || ''}
              label="Site Başlığı"
              disabled={!isEditing}
              onChange={(e) => setTitle(e.target.value)}
            />
          </MDBCol>

          <MDBCol md="8">
            <MDBTextArea
              id="desc"
              rows={4}
              name="desc"
              value={titleDesc || ''}
              label="Site başlığı altındaki açıklama"
              disabled={!isEditing}
              onChange={(e) => setTitleDesc(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        {aboutUs?.map((item, index) => (
          <MDBRow
            key={item._id}
            className="d-flex justify-content-center align-items-center p-4"
          >
            <MDBCol md="4">
              <MDBInput
                className="mb-4"
                id="aboutUsTitle"
                rows={4}
                name="title"
                value={item.title || ''}
                label="Hakkımızda başlık"
                disabled={!isEditing}
                onChange={handleChange(index, aboutUs, setAboutUs)}
              />
            </MDBCol>

            <MDBCol md="8">
              <MDBTextArea
                id="textAreaExample"
                rows={4}
                name="desc"
                value={item.desc || ''}
                label="Hakkımızda açıklama"
                disabled={!isEditing}
                onChange={handleChange(index, aboutUs, setAboutUs)}
              />
            </MDBCol>
          </MDBRow>
        ))}

        <h3 className="d-flex justify-content-center align-items-center m-4 p-4">
          Hizmetler
        </h3>
        {services?.map((item, index) => (
          <MDBRow
            key={item._id}
            className="d-flex justify-content-center align-items-center "
          >
            <MDBCol md="4">
              <MDBInput
                className="mb-4"
                id="title"
                name="title"
                rows={4}
                value={item.title || ''}
                label="Hizmet Başlığı"
                disabled={!isEditing}
                onChange={handleChange(index, services, setServices)}
              />
            </MDBCol>
            <MDBCol md="2">
              <MDBInput
                className="mb-4"
                id="icon"
                name="icon"
                rows={4}
                value={item.icon || ''}
                label="Hizmet iconu"
                disabled={!isEditing}
                onChange={handleChange(index, services, setServices)}
              />
            </MDBCol>
            <MDBCol md="6" className="mb-5">
              <MDBTextArea
                id="desc"
                rows={4}
                name="desc"
                value={item.desc || ''}
                label="Hizmet açıklama"
                disabled={!isEditing}
                onChange={handleChange(index, services, setServices)}
              />
            </MDBCol>
          </MDBRow>
        ))}
        <h3 className="d-flex justify-content-center align-items-center m-4 p-4">
          Odalar
        </h3>

        {rooms?.map((item, index) => (
          <MDBRow
            key={item._id}
            className="d-flex justify-content-center align-items-center m-3 "
          >
            <MDBCol md="4">
              <MDBInput
                className="mb-4"
                id="title"
                name="title"
                rows={4}
                value={item.title || ''}
                label="Oda Tipi"
                disabled={!isEditing}
                onChange={handleChange(index, rooms, setRooms)}
              />
            </MDBCol>

            <MDBCol md="5">
              <MDBTextArea
                id="desc"
                rows={4}
                name="desc"
                value={item.desc || ''}
                label="Oda Açıklaması"
                disabled={!isEditing}
                onChange={handleChange(index, rooms, setRooms)}
              />
            </MDBCol>
            <MDBCol md="3">
              <div className="d-flex justify-content-center ">
                <div style={thumb}>
                  <div style={thumbInner}>
                    <img
                      src={`/src/assets/images/${item.image}`}
                      style={img}
                      // Revoke data uri after image is loaded
                    />
                  </div>
                </div>
              </div>
              <ImageUpload
                className="d-flex justify-content-center"
                postFunction={updateHomePageRoomImage}
                id={item._id}
                multiple={false}
              />
            </MDBCol>
          </MDBRow>
        ))}

        <h3 className="d-flex justify-content-center">Hotel Info</h3>

        <MDBBtn
          type="button"
          size="sm"
          className="d-flex justify-content-center"
          block
          onClick={() => dispatch(setModal())}
        >
          Hotel info Ekle
        </MDBBtn>
        {modal && (
          <ModalComponent
            sendFunction={createHomeInfo}
            displayAlert={displayAlert}
            desc="Hotel info ekleyebilirsiniz"
          ></ModalComponent>
        )}

        {hotelInfo?.map((item, index) => (
          <MDBRow
            key={item._id}
            className="d-flex justify-content-center align-items-center m-4"
          >
            <MDBCol md="8">
              <MDBInput
                className="mb-4"
                id="desc"
                name="desc"
                rows={8}
                value={item.desc || ''}
                label="Hotel info açıklaması"
                disabled={!isEditing}
                onChange={handleChange(index, hotelInfo, setHotelInfo)}
              />
            </MDBCol>

            <MDBCol md="3">
              <MDBInput
                className="mb-4"
                id="icon"
                name="icon"
                rows={3}
                value={item.icon || ''}
                label="hotel info iconu"
                disabled={!isEditing}
                onChange={handleChange(index, hotelInfo, setHotelInfo)}
              />
            </MDBCol>
            <MDBCol md="1">
              <MDBBtn
                type="button"
                size="sm"
                onClick={deleteHotelInfo(item._id)}
                block
              >
                Sil
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        ))}

        <MDBRow className="d-flex justify-content-center align-items-center m-3 p-3">
          <MDBCol md="3" className="justify-content-center align-items-center">
            <MDBBtn
              type="submit"
              size="lg"
              rounded
              disabled={isEditing}
              onClick={() => dispatch(setEditData())}
              block
            >
              Düzenle
            </MDBBtn>
          </MDBCol>
          <MDBCol md="3" className="justify-content-center align-items-center">
            <MDBBtn
              type="submit"
              size="lg"
              disabled={!isEditing}
              rounded
              onClick={updateData}
              block
            >
              Güncelle
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        <h3 className="d-flex justify-content-center align-items-center pt-4">
          Anasayfa Giriş Fotoğrafları
        </h3>

        <ImageUploaded
          page={homePage}
          images={homePage?.titleImageUrl}
          function={updateHomePageImage}
        />

        <h3 className="d-flex justify-content-center align-items-center pt-4">
          Anasayfa Giriş kısmı Fotoğraf Ekle
        </h3>

        <ImageUpload
          className="d-flex justify-content-center"
          postFunction={postHomePageImage}
          multiple={true}
        />

        <h3 className="d-flex justify-content-center align-items-center pt-4">
          Hakkımızda Fotoğraf
        </h3>
        <div className="d-flex justify-content-center ">
          <div style={thumb}>
            <div style={thumbInner}>
              <img
                src={`/src/assets/images/${aboutUsImageUrl}`}
                style={img}
                // Revoke data uri after image is loaded
              />
            </div>
          </div>
        </div>
        <ImageUpload
          className="d-flex justify-content-center"
          postFunction={postAboutUsImage}
          multiple={false}
        />
      </MDBContainer>
    </div>
  )
}
export default panelHome
