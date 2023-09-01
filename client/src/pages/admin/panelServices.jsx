import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTextArea,
} from 'mdb-react-ui-kit'
import {
  setEditData,
  setModal,
  displayAlert,
  clearAlert,
  getServicesData,
  createService,
  deleteService,
  updateService,
  postServiceImage,
} from '../../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ImageUpload from '../../components/admin/dropZone'
import ModalComponent from '../../components/admin/modalV2'
import Loading from '../../components/loading'

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
const panelServices = () => {
  const { servicesPage, isEditing, isLoading, modal, showAlert } = useSelector(
    (store) => store.admin
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getServicesData())
  }, [])
  const [services, setServices] = useState(servicesPage)
  const [editId, setEditId] = useState(servicesPage)

  useEffect(() => {
    setServices(servicesPage)
  }, [servicesPage])
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
  const deleteServices = (_id) => (e) => {
    e.preventDefault()
    const deleteElement = { _id: _id }
    dispatch(deleteService({ deleteElement }))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
  const updateData = (index) => (e) => {
    e.preventDefault()
    console.log(services)
    if (!services[index].title || !services[index].desc) {
      dispatch(displayAlert())
      return
    }
    dispatch(setEditData())
    dispatch(
      updateService({
        _id: services[index]._id,
        title: services[index].title,
        desc: services[index].desc,
      }),
      setTimeout(() => {
        dispatch(clearAlert())
      }, 3000)
    )
  }
  const edit = (_id) => (e) => {
    setEditId(_id)
    dispatch(setEditData())

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
          Hizmetler
        </h2>
        {showAlert && <Alert />}
        <MDBBtn
          type="button"
          size="sm"
          className="d-flex justify-content-center"
          block
          onClick={() => dispatch(setModal())}
        >
          Hizmet Ekle
        </MDBBtn>
        {modal && (
          <ModalComponent
            sendFunction={createService}
            displayAlert={displayAlert}
            desc="Yeni hizmet Ekleyebilirsiniz"
          ></ModalComponent>
        )}
        {services?.map((item, index) => (

          <MDBRow
            key={item._id}
            className="d-flex justify-content-center align-items-center p-4"
          >
            <h3 className="d-flex justify-content-center align-items-center mb-3">
              Hizmet {index + 1}
            </h3>
            <MDBCol md="9">
              <MDBInput
                className="mb-4"
                id="aboutUsTitle"
                rows={4}
                name="title"
                value={item.title || ''}
                label="Hakkımızda başlık"
                onChange={handleChange(index, services, setServices)}
                disabled={!(item._id == editId) || !isEditing}
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBBtn
                className="mb-4"
                type="button"
                size="sm"
                onClick={deleteServices(item._id)}
                block
              >
                Sil
              </MDBBtn>
            </MDBCol>
            <MDBCol md="12">
              <MDBTextArea
                id="textAreaExample"
                rows={4}
                name="desc"
                value={item.desc || ''}
                label="Hakkımızda açıklama"
                onChange={handleChange(index, services, setServices)}
                disabled={!(item._id == editId) || !isEditing}
              />
            </MDBCol>

            <div className="d-flex justify-content-center ">
              <div style={thumb}>
                <div style={thumbInner}>
                  <img
                    src={`/images/${item.imageUrl}`}
                    style={img}
                  // Revoke data uri after image is loaded
                  />
                </div>
              </div>
            </div>
            <ImageUpload
              className="d-flex justify-content-center mb-4"
              postFunction={postServiceImage}
              multiple={false}
              id={item._id}
            />
            <MDBCol
              md="3"
              className="justify-content-center align-items-center m-5"
            >
              <MDBBtn
                type="submit"
                size="lg"
                rounded
                disabled={isEditing}
                onClick={edit(item._id)}
                block
              >
                Düzenle
              </MDBBtn>
            </MDBCol>
            <MDBCol
              md="3"
              className="justify-content-center align-items-center"
            >
              <MDBBtn
                type="submit"
                size="lg"
                disabled={!isEditing}
                rounded
                onClick={updateData(index)}
                block
              >
                Güncelle
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    </div>
  )
}
export default panelServices
