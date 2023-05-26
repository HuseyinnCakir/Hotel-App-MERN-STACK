import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTextArea,
} from 'mdb-react-ui-kit'
import {
  getContactData,
  setEditData,
  displayAlert,
  clearAlert,
  updateContactData,
} from '../../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ImageUpload from '../../components/admin/dropZone'
import ModalComponent from '../../components/admin/modal'
import Loading from '../../components/loading'
import ImageUploaded from '../../components/admin/uploadedImage'
import Alert from '../../components/alert'

const panelInfo = () => {
  const { contactPage, isEditing, isLoading, modal, showAlert } = useSelector(
    (store) => store.admin
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getContactData())
  }, [])

  const [desc, setDesc] = useState(contactPage?.desc)
  const [phone, setPhone] = useState(contactPage?.phone)
  const [email, setEmail] = useState(contactPage?.email)

  const [address, setAddress] = useState(contactPage?.address)
  const [fbLink, setFbLink] = useState(contactPage?.fbLink)
  const [insLink, setInsLink] = useState(contactPage?.insLink)
  const [googleLink, setGoogleLink] = useState(contactPage?.googleLink)
  const [footerDesc, setFooterDesc] = useState(contactPage?.footerDesc)
  useEffect(() => {
    setDesc(contactPage?.desc)
    setPhone(contactPage?.phone)
    setEmail(contactPage?.email)
    setAddress(contactPage?.address)
    setFbLink(contactPage?.fbLink)
    setInsLink(contactPage?.insLink)
    setGoogleLink(contactPage?.googleLink)
    setFooterDesc(contactPage?.footerDesc)
  }, [contactPage])
  const updateData = (e) => {
    e.preventDefault()
    if (
      !desc ||
      !phone ||
      !email ||
      !address ||
      !fbLink ||
      !insLink ||
      !googleLink ||
      !footerDesc
    ) {
      dispatch(displayAlert())
      return
    }
    dispatch(setEditData())
    dispatch(
      updateContactData({
        desc,
        phone,
        email,
        address,
        fbLink,
        insLink,
        googleLink,
        footerDesc,
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
          İletişim Sayfası Ve Sosyal Medya Linkleri
        </h2>
        {showAlert && <Alert />}

        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="9">
            <MDBInput
              className="mb-4"
              value={desc || ''}
              label="İletişim sayfasının açıklaması"
              disabled={!isEditing}
              onChange={(e) => setDesc(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              value={phone || ''}
              label="Otel Telefon Numarası"
              disabled={!isEditing}
              onChange={(e) => setPhone(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              value={email || ''}
              label="Otel Emaili"
              disabled={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="9">
            <MDBTextArea
              className="mb-4"
              rows={4}
              value={address || ''}
              label="Otel Adresi"
              disabled={!isEditing}
              onChange={(e) => setAddress(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              value={fbLink || ''}
              label="Otel Facebook Linki"
              disabled={!isEditing}
              onChange={(e) => setFbLink(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              value={insLink || ''}
              label="Otel Instagram Linki"
              disabled={!isEditing}
              onChange={(e) => setInsLink(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              value={googleLink || ''}
              label="Otel Google Maps Linki"
              disabled={!isEditing}
              onChange={(e) => setGoogleLink(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center align-items-center p-4">
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              value={footerDesc || ''}
              label="Sitenin En Alt Sol Kısmnda Bulunan Açıklama"
              disabled={!isEditing}
              onChange={(e) => setFooterDesc(e.target.value)}
            />
          </MDBCol>
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
export default panelInfo
