import React, { useEffect, useState } from 'react'
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBTextArea,
} from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { getContactData } from '../features/admin/adminSlice'
import Loading from '../components/loading'
export default function App() {
  const { contactPage, isLoading } = useSelector((store) => store.admin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getContactData())
  }, [])

  const [desc, setDesc] = useState(contactPage?.desc || null)
  const [phone, setPhone] = useState(contactPage?.phone || null)
  const [email, setEmail] = useState(contactPage?.email || null)

  const [address, setAddress] = useState(contactPage?.address || null)
  useEffect(() => {
    setDesc(contactPage?.desc)
    setPhone(contactPage?.phone)
    setEmail(contactPage?.email)
    setAddress(contactPage?.address)
  }, [contactPage])
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
    <>
      <h2 className="d-flex justify-content-center mt-5 pt-5">Contact Us</h2>
      <MDBContainer className="pb-5">
        <MDBRow className="d-flex justify-content-center align-items-center m-5">
          <MDBCol md="12" className="mb-5 d-flex justify-content-center">
            <p>{desc}</p>
          </MDBCol>
          <MDBCol md="6" className="mb-5">
            <div className="m-4 d-flex justify-content-start">
              <MDBIcon
                fas
                icon="phone fa-2x"
                className="d-flex justify-content-start"
              />
              <p className="d-flex align-items-center m-2">{phone}</p>
            </div>
            <div className="m-4 d-flex justify-content-start">
              <MDBIcon
                fas
                icon="envelope fa-2x"
                className="d-flex justify-content-start"
              />
              <p className="d-flex align-items-center m-2">{email}</p>
            </div>
            <div className="m-4  d-flex justify-content-start">
              <MDBIcon
                fas
                icon="map-marker-alt fa-2x"
                className="d-flex justify-content-start"
              />
              <p className="d-flex align-items-center m-2">{address}</p>
            </div>
          </MDBCol>
          <MDBCol md="6" className="mb-5">
            <form>
              <MDBInput id="form4Example1" wrapperClass="mb-4" label="Name" />
              <MDBInput
                type="email"
                id="form4Example2"
                wrapperClass="mb-4"
                label="Email address"
              />
              <MDBTextArea
                wrapperClass="mb-4"
                id="form4Example3"
                rows={5}
                label="Message"
              />

              <MDBBtn type="submit" className="mb-4" block>
                Send
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}
