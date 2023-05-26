import { useDispatch, useSelector } from 'react-redux'
import {
  setModal,
  postGalleryPageImage,
  displayAlert,
  clearAlert,
  setEditData,
  getGalleryData,
  updateGalleryPageImage,
} from '../../features/admin/adminSlice'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit'
import { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import Alert from '../../components/alert'

import ImageUploaded from '../../components/admin/uploadedImage'
import ImageUpload from '../../components/admin/dropZone'

const panelGallery = () => {
  const { galleryPage, isLoading, showAlert } = useSelector(
    (store) => store.admin
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGalleryData())
  }, [])

  const [images, setImages] = useState(galleryPage?.imageUrl)
  useEffect(() => {
    setImages(galleryPage?.imageUrl)
  }, [galleryPage])

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
          Galeri Sayfası
        </h2>
        {showAlert && <Alert />}

        <ImageUploaded
          page={galleryPage}
          images={images}
          function={updateGalleryPageImage}
        />

        <h3 className="d-flex justify-content-center align-items-center pt-4">
          Galeri Sayfasına Fotoğraf Ekle (Max 10 fotoğraf şeklinde ekleyiniz)
        </h3>

        <ImageUpload
          className="d-flex justify-content-center"
          postFunction={postGalleryPageImage}
          multiple={true}
        />
      </MDBContainer>
    </div>
  )
}
export default panelGallery
