import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { getServicesData } from '../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '../components/loading'
const Services = () => {
  const { servicesPage, isLoading } = useSelector((store) => store.admin)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getServicesData())
  }, [])
  const [services, setServices] = useState(servicesPage)

  useEffect(() => {
    setServices(servicesPage)
  }, [servicesPage])

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
        <h2 className="d-flex justify-content-center align-items-center m-4 p-4 ">
          Our Services
        </h2>
        {services?.map((item) => (
          <MDBRow
            className="d-flex justify-content-start pb-5 pt-5 m-4 order-lg-2"
            key={item._id}
          >
            <MDBCol md="6" className="mb-5 ">
              <img
                src={`./images/${item.imageUrl}`}
                className="img-fluid shadow-4 me-4"
                alt="..."
              />
            </MDBCol>
            <MDBCol md="6" className="mb-5 order-lg-1">
              <article className="text-center ">
                <h3 className="d-flex justify-content-center align-items-center pt-4">
                  {item.title}
                </h3>
                <p className="p-2 mt-5">{item.desc}</p>
              </article>
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    </div>
  )
}
export default Services
