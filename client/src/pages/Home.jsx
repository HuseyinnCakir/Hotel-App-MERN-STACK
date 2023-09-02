import { useState, useEffect } from 'react'
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit'

import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeData } from '../features/admin/adminSlice'
import Loading from '../components/loading'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getHomeData())
  }, [])
  const { homePage, isLoading } = useSelector((store) => store.admin)
  const [title, setTitle] = useState(homePage?.pageTitle)
  const [titleDesc, setTitleDesc] = useState(homePage?.titleDesc)
  const [imageUrl, setImageUrl] = useState(homePage?.imageUrl)
  const [aboutUs, setAboutUs] = useState(homePage?.aboutUsItem)
  const [aboutUsImageUrl, setAboutUsImageUrl] = useState(
    homePage?.aboutUsImageUrl
  )
  const [services, setServices] = useState(homePage?.servicesItem)
  const [rooms, setRooms] = useState(homePage?.roomsItem)
  const [hotelInfo, setHotelInfo] = useState(homePage?.hotelInfo)
  useEffect(() => {
    setTitle(homePage?.pageTitle)
    setTitleDesc(homePage?.titleDesc)
    setImageUrl(homePage?.imageUrl)
    setAboutUs(homePage?.aboutUsItem)
    setAboutUsImageUrl(homePage?.aboutUsImageUrl)
    setServices(homePage?.servicesItem)
    setRooms(homePage?.roomsItem)
    setHotelInfo(homePage?.hotelInfo)
  }, [homePage])

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate('/reservation')
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
      <MDBContainer className="p-5 mb-5">
        <MDBRow className="d-flex justify-content-center mt-3 p-3">
          <MDBCol md="12" className="m-5 ">
            {homePage?.titleImageUrl && (
              <MDBCarousel showControls showIndicators>
                {homePage.titleImageUrl.map((item, index) => (
                  <div key={item}>
                    <MDBCarouselItem
                      className="d-block active w-100"
                      itemId={++index}
                      src={`./images/${item}`}
                      alt="Lavinia Apart Image"
                    ></MDBCarouselItem>
                  </div>
                ))}
              </MDBCarousel>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center mb-3 pb-3">
          <MDBCol md="12">
            <div className="mt-1 text-center">
              <h1>{title}</h1>
              <p className="mt-2">{titleDesc}</p>
              <MDBBtn
                rounded
                size="lg"
                className="justify-content-center"
                onClick={navigateToContacts}
              >
                Reservation
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="about">
        <MDBContainer className="pb-5">
          {aboutUs?.map((item) => (
            <MDBRow className="m-5" key={item._id}>
              <MDBCol md="7">
                <div className="">
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
              </MDBCol>
              <MDBCol
                md="5"
                className="d-flex align-items-center justify-content-center"
              >
                <div className="about_img">
                  <figure>
                    <img
                      src={`./images/${aboutUsImageUrl}`}
                      alt="About Us"
                    />
                  </figure>
                </div>
              </MDBCol>
            </MDBRow>
          ))}
        </MDBContainer>
      </div>

      <div className="services p-4 mb-auto">
        <MDBContainer>
          <h2 className="d-flex justify-content-center m-4 pt-5">
            Our Services
          </h2>

          <MDBRow className="d-flex  justify-content-center pt-5 ">
            {services?.map((item) => (
              <MDBCol md="4" className="p-3" key={item._id}>
                <div className="d-flex justify-content-start">
                  <i
                    className={`fas fa-${item.icon} fa-3x d-flex justify-content-start pe-3`}
                  ></i>
                  <h3 className="d-flex align-items-center">{item.title}</h3>
                </div>
                <p className="d-flex justify-content-start">{item.desc}</p>
              </MDBCol>
            ))}

            <p className="d-flex justify-content-center">
              <NavLink to="services">
                Click here for detailed information about our services.
              </NavLink>
            </p>
          </MDBRow>
        </MDBContainer>
      </div>
      <div className="rooms pb-5 mb-auto">
        <h2 className="d-flex justify-content-center m-4 pt-5">Rooms</h2>

        <MDBContainer className="p-4">
          <MDBRow className="row-cols-1 row-cols-md-2 g-4 mb-5">
            {rooms?.map((item) => (
              <MDBCol key={item._id}>
                <MDBCard className="card bg-light h-100">
                  <MDBCardImage
                    src={`./images/${item.image}`}
                    alt="..."
                    position="top"
                    className='class="card-img-top"'
                  />
                  <MDBCardBody>
                    <h3 className="card-title">{item.title}</h3>

                    <MDBCardText>{item.desc}</MDBCardText>
                    <MDBBtn href="rooms">Details</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </div>

      <MDBContainer>
        <h3 className="d-flex justify-content-start m-2 pt-5">
          Hotel Information
        </h3>
        <MDBRow className="d-flex  justify-content-start pt-2 pb-5 ">
          {hotelInfo?.map((item) => (
            <MDBCol md="4" className="p-3" key={item._id}>
              <div className="d-flex justify-content-start">
                <MDBIcon
                  fas
                  size="2x"
                  icon={item.icon}
                  className="d-flex justify-content-start pe-1"
                />
                <p className="d-flex align-items-center pt-1">{item.desc}</p>
              </div>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  )
}
export default Home
