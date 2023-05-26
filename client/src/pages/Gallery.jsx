import React from 'react'
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit'
import { getGalleryData } from '../features/admin/adminSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '../components/loading'
export default function App() {
  const { galleryPage, isLoading } = useSelector((store) => store.admin)
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
    <div className="m-5">
      <MDBContainer className="d-flex justify-content-center pt-4">
        <MDBCol md="7" className="d-flex justify-content-center mb-5">
          {images?.map && (
            <MDBCarousel showControls showIndicators>
              {images.map((image, value = 0) => (
                <MDBCarouselItem
                  key={image}
                  className="w-100 d-block active"
                  itemId={++value}
                  src={`/src/assets/images/${image}`}
                  alt="Lavinia Apart Images"
                />
              ))}
            </MDBCarousel>
          )}
        </MDBCol>
      </MDBContainer>
    </div>
  )
}
