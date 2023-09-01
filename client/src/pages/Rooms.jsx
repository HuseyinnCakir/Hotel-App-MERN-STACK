import {
  MDBContainer,
  MDBCarousel,
  MDBCarouselItem,
  MDBIcon,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit'

import { getRoomData } from '../features/admin/adminSlice'

import Wrapper from '../assets/Wrappers/rooms'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '../components/loading'
const Rooms = () => {
  const { roomPage, isLoading } = useSelector((store) => store.admin)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRoomData())
  }, [])

  const [title, setTitle] = useState(roomPage?.pageTitle)
  const [rooms, setRooms] = useState(roomPage?.roomsItem)

  useEffect(() => {
    setTitle(roomPage?.pageTitle)
    setRooms(roomPage?.roomsItem)
  }, [roomPage])

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
    <Wrapper>
      <div>
        <MDBContainer className="p-5 mb-5">
          <h2 className="d-flex justify-content-center align-items-center m-4 p-4">
            {title}
          </h2>
          {rooms?.map((item) => (
            <div key={item._id}>
              <h3 className="d-flex justify-content-center align-items-start p-2">
                {item.title}
              </h3>
              {item?.image && (
                <MDBCarousel showControls showIndicators>
                  {item.image.map((image, index) => (
                    <MDBCarouselItem
                      key={image}
                      className="w-100 d-block"
                      itemId={index + 1}
                      src={`./images/${image}`}
                      alt="Lavinia Room Page"
                    />
                  ))}
                </MDBCarousel>
              )}
              <MDBRow className="d-flex justify-content-start pt-5">
                {item?.features.map((features) => (
                  <MDBCol md="4" className="mb-5" key={features._id}>
                    <div className="d-flex justify-content-start align-items-center">
                      <MDBIcon
                        fas
                        icon={features.icon}
                        className="d-flex justify-content-start  align-items-start pe-1"
                        size="lg"
                      />
                      <h4 className="d-flex justify-content-start align-items-end ps-1">
                        {features.desc}
                      </h4>
                    </div>
                  </MDBCol>
                ))}
              </MDBRow>
              <MDBRow className="d-flex justify-content-start pt-5">
                {item?.featuresV2.map((featuresV2) => (
                  <MDBCol md="4" className="mb-5" key={featuresV2._id}>
                    <div className="d-flex justify-content-start align-items-center">
                      <MDBIcon
                        fas
                        icon={featuresV2.icon}
                        className="d-flex justify-content-start  align-items-start pe-1"
                        size="lg"
                      />
                      <h4 className="d-flex justify-content-start align-items-end ps-1">
                        {featuresV2.desc}
                      </h4>
                    </div>
                    {featuresV2?.ulFeatures.map((subItem, index) => (
                      <MDBCol md="12" className="mt-2" key={index}>
                        <div className="d-flex justify-content-start align-items-center">
                          <MDBIcon
                            fas
                            icon="check"
                            size="xs"
                            className="d-flex justify-content-start  align-items-start ms-3"
                          />
                          <h4 className="d-flex justify-content-start align-items-end ps-1">
                            {subItem}
                          </h4>
                        </div>
                      </MDBCol>
                    ))}
                  </MDBCol>
                ))}
              </MDBRow>
            </div>
          ))}
        </MDBContainer>
      </div>
    </Wrapper>
  )
}
export default Rooms
