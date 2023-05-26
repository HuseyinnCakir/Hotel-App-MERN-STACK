import { useDispatch, useSelector } from 'react-redux'
import {
  getRoomData,
  setModal,
  createRoomFeature,
  createRoomFeatureV2,
  createRoomFeatureUl,
  displayAlert,
  postRoomPageImage,
  deleteRoomFeature,
  deleteRoomFeatureUl,
  clearAlert,
  updateRoomPageImage,
  updateRoomData,
  setEditData,
} from '../../features/admin/adminSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit'
import { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import Alert from '../../components/alert'
import ModalComponent from '../../components/admin/modal'
import ImageUploaded from '../../components/admin/uploadedImage'
import ImageUpload from '../../components/admin/dropZone'

const panelRooms = () => {
  const { roomPage, isEditing, isLoading, modal, showAlert } = useSelector(
    (store) => store.admin
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRoomData())
  }, [])
  const [id, setId] = useState(roomPage?._id)
  const [title, setTitle] = useState(roomPage?.pageTitle)
  const [rooms, setRooms] = useState(roomPage?.roomsItem)

  const [activeModalId, setaActiveModalId] = useState()
  const [typeFeature, setTypeFeature] = useState()
  useEffect(() => {
    setId(roomPage?._id)
    setTitle(roomPage?.pageTitle)
    setRooms(roomPage?.roomsItem)
  }, [roomPage])
  const activeModal = (id, type) => (e) => {
    e.preventDefault()
    setaActiveModalId(id)
    setTypeFeature(type)
    dispatch(setModal())
  }
  const deleteFeature = (_id, featuresId) => (e) => {
    e.preventDefault()
    const deleteElement = { _id: _id, featuresId: featuresId }

    dispatch(deleteRoomFeature({ deleteElement }))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
  const deleteFeatureV2 = (_id, featuresId, desc) => (e) => {
    e.preventDefault()
    console.log(desc)
    const deleteElement = { _id: _id, featuresId: featuresId }
    if (desc) {
      deleteElement = {
        _id: _id,
        subId: featuresId,
        desc: desc,
      }
    }
    dispatch(deleteRoomFeatureUl({ deleteElement }))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
  const deleteFeatureUl = (_id, featuresId, desc) => (e) => {
    e.preventDefault()
    console.log(desc)
    const deleteElement = { _id: _id, subId: featuresId, desc: desc }

    dispatch(deleteRoomFeatureUl({ deleteElement }))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
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
  const subHandleChange = (index, subIndex, state, setState) => (e) => {
    const newArray = state?.map((item, i) => {
      if (index === i) {
        //console.log(item)
        const array = item.features?.map((item, i) => {
          if (subIndex === i) {
            // console.log(item)
            return { ...item, [e.target.name]: e.target.value }
          } else {
            return item
          }
        })
        console.log(item)
        console.log(item.features)
        return { ...item, ['features']: array }
      }
      return item
    })
    console.log(newArray)
    setState(newArray)
  }
  const subHandleChangeV2 = (index, subIndex, state, setState) => (e) => {
    const newArray = state?.map((item, i) => {
      if (index === i) {
        //console.log(item)
        const array = item.featuresV2?.map((item, i) => {
          if (subIndex === i) {
            // console.log(item)
            return { ...item, [e.target.name]: e.target.value }
          } else {
            return item
          }
        })
        console.log(item)
        console.log(item.features)
        return { ...item, ['featuresV2']: array }
      }
      return item
    })
    //console.log(newArray)
    setState(newArray)
  }

  const updateData = (e) => {
    e.preventDefault()
    if (!title || !rooms) {
      dispatch(displayAlert())
      return
    }
    dispatch(setEditData())
    dispatch(
      updateRoomData({
        title,

        rooms,
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
        <h2 className="d-flex justify-content-center align-items-center m-4 p-4">
          Odalar Sayfası
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
              id="title"
              value={title || ''}
              label="Sayfa Başlığı"
              disabled={!isEditing}
              onChange={(e) => setTitle(e.target.value)}
            />
          </MDBCol>
          <h3 className="d-flex justify-content-center align-items-center m-4 p-4">
            Oda Türleri
          </h3>
          {rooms?.map((item, index) => (
            <MDBRow
              key={item._id}
              className="d-flex justify-content-center align-items-center p-4 m-4"
            >
              <MDBCol md="8">
                <MDBInput
                  className="mb-4"
                  id="title"
                  name="title"
                  value={item.title || ''}
                  label="Oda Adı"
                  disabled={!isEditing}
                  onChange={handleChange(index, rooms, setRooms)}
                />
              </MDBCol>
              <MDBCol md="2">
                <MDBBtn
                  type="button"
                  size="sm"
                  className="d-flex justify-content-center mb-4"
                  block
                  onClick={activeModal(item._id, 'v1')}
                >
                  Oda Özelliği Ekle
                </MDBBtn>
                {modal && activeModalId == item._id && typeFeature == 'v1' && (
                  <ModalComponent
                    sendFunction={createRoomFeature}
                    displayAlert={displayAlert}
                    desc="Oda özelliği ekleyebilirsiniz"
                    itemId={item._id}
                  ></ModalComponent>
                )}
              </MDBCol>

              {item.features?.map((subItem, i) => (
                <MDBCol
                  md="6"
                  key={subItem._id}
                  className="d-flex justify-content-center align-items-center p-4"
                >
                  <MDBCol md="6">
                    <MDBInput
                      className="mb-4"
                      id="desc"
                      name="desc"
                      value={subItem.desc || ''}
                      label="Özellik Açıklaması"
                      disabled={!isEditing}
                      onChange={subHandleChange(index, i, rooms, setRooms)}
                    />
                  </MDBCol>
                  <MDBCol md="4">
                    <MDBInput
                      className="mb-4"
                      id="icon"
                      name="icon"
                      value={subItem.icon || ''}
                      label="Özellik İconu"
                      disabled={!isEditing}
                      onChange={subHandleChange(index, i, rooms, setRooms)}
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBBtn
                      type="button"
                      size="sm"
                      className="mb-4"
                      onClick={deleteFeature(item._id, subItem._id)}
                      block
                    >
                      Sil
                    </MDBBtn>
                  </MDBCol>
                </MDBCol>
              ))}
              <h3 className="d-flex justify-content-center align-items-center m-4 p-4">
                Maddeli Oda Özellikleri
              </h3>
              <MDBCol md="6">
                <MDBBtn
                  type="button"
                  size="sm"
                  className="d-flex justify-content-center mb-4"
                  block
                  onClick={activeModal(item._id, 'v2')}
                >
                  Maddeli Oda Özelliği Ekle
                </MDBBtn>
                {modal && activeModalId == item._id && typeFeature == 'v2' && (
                  <ModalComponent
                    sendFunction={createRoomFeatureV2}
                    displayAlert={displayAlert}
                    desc="Oda özelliği ekleyebilirsiniz"
                    itemId={item._id}
                  ></ModalComponent>
                )}
              </MDBCol>
              {item.featuresV2?.map((subItem, i) => (
                <MDBRow key={subItem._id}>
                  <MDBCol
                    md="12"
                    className="d-flex justify-content-center align-items-center p-4"
                  >
                    <MDBCol md="6">
                      <MDBInput
                        className="mb-4"
                        id="desc"
                        name="desc"
                        value={subItem.desc || ''}
                        label="Özellik Açıklaması"
                        disabled={!isEditing}
                        onChange={subHandleChangeV2(index, i, rooms, setRooms)}
                      />
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBInput
                        className="mb-4"
                        id="icon"
                        name="icon"
                        value={subItem.icon || ''}
                        label="Özellik İconu"
                        disabled={!isEditing}
                        onChange={subHandleChangeV2(index, i, rooms, setRooms)}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="m-2">
                      <MDBBtn
                        type="button"
                        size="sm"
                        className="mb-4 m-2"
                        onClick={deleteFeatureV2(item._id, subItem._id)}
                        block
                      >
                        Sil
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="2" className="m-2">
                      <MDBBtn
                        type="button"
                        size="sm"
                        className="mb-4 m-2"
                        onClick={activeModal(subItem._id, 'v3')}
                        block
                      >
                        Madde Ekle
                      </MDBBtn>
                      {modal &&
                        activeModalId == subItem._id &&
                        typeFeature == 'v3' && (
                          <ModalComponent
                            sendFunction={createRoomFeatureUl}
                            displayAlert={displayAlert}
                            desc="Oda özelliğine maddeler ekleyebilirsiniz"
                            itemId={item._id}
                            subItemId={subItem._id}
                          ></ModalComponent>
                        )}
                    </MDBCol>
                  </MDBCol>

                  {subItem?.ulFeatures.map((ulItem) => (
                    <MDBCol key={ulItem} md="3">
                      <MDBCol md="10">
                        <MDBInput
                          className="mb-4"
                          id="desc"
                          name="desc"
                          value={ulItem || ''}
                          label="Özellik Maddesi"
                          disabled
                        />
                      </MDBCol>
                      <MDBCol md="2">
                        <MDBBtn
                          type="button"
                          size="sm"
                          className=" mb-4 "
                          onClick={deleteFeatureUl(
                            item._id,
                            subItem._id,
                            ulItem
                          )}
                          block
                        >
                          Sil
                        </MDBBtn>
                      </MDBCol>
                    </MDBCol>
                  ))}
                </MDBRow>
              ))}
              <h3 className="d-flex justify-content-center align-items-center m-4 p-4">
                Oda fotoğrafları
              </h3>
              <ImageUploaded
                page={roomPage}
                images={item?.image}
                id={item._id}
                function={updateRoomPageImage}
              />

              <h3 className="d-flex justify-content-center align-items-center pt-4">
                Oda fotoğrafı ekle
              </h3>

              <ImageUpload
                id={item?._id}
                className="d-flex justify-content-center"
                postFunction={postRoomPageImage}
                multiple={true}
              />
            </MDBRow>
          ))}
        </MDBRow>

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
      </MDBContainer>
    </div>
  )
}
export default panelRooms
