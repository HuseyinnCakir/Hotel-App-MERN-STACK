import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit'
import { getContactData } from '../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
export default function Footer() {
  const { contactPage } = useSelector((store) => store.admin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getContactData())
  }, [])

  const [phone, setPhone] = useState(contactPage?.phone)
  const [email, setEmail] = useState(contactPage?.email)

  const [address, setAddress] = useState(contactPage?.address)
  const [fbLink, setFbLink] = useState(contactPage?.fbLink)
  const [insLink, setInsLink] = useState(contactPage?.insLink)
  const [googleLink, setGoogleLink] = useState(contactPage?.googleLink)
  const [footerDesc, setFooterDesc] = useState(contactPage?.footerDesc)
  useEffect(() => {
    setPhone(contactPage?.phone)
    setEmail(contactPage?.email)
    setAddress(contactPage?.address)
    setFbLink(contactPage?.fbLink)
    setInsLink(contactPage?.insLink)
    setGoogleLink(contactPage?.googleLink)
    setFooterDesc(contactPage?.footerDesc)
  }, [contactPage])
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span></span>
        </div>

        <div className="me-3">
          <MDBBtn
            floating
            size="lg"
            className="m-1"
            style={{ backgroundColor: '#3b5998' }}
            href={fbLink}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>
          <MDBBtn
            floating
            size="lg"
            className="m-1"
            style={{ backgroundColor: '#ac2bac' }}
            href={insLink}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            floating
            size="lg"
            className="m-1"
            style={{ backgroundColor: '#dd4b39' }}
            href={googleLink}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="4" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Lavinia Apart Hotel
              </h6>
              <p>{footerDesc}</p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="/" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="services" className="text-reset">
                  Services
                </a>
              </p>
              <p>
                <a href="gallery" className="text-reset">
                  Gallery
                </a>
              </p>
              <p>
                <a href="contact" className="text-reset">
                  Contact
                </a>
              </p>
            </MDBCol>

            <MDBCol md="5" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                {address}
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                {email}
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> {phone}
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div style={{ fontSize: 12 }} className="d-flex justify-content-end">
        Dev:
        <a
          href="https:www.linkedin.com/in/huseyincakir07"
          target="_blank"
          rel="noopener noreferrer"
        >
          Huseyin Cakir
        </a>
      </div>
      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        Copyright &copy; <span id="date"> {new Date().getFullYear()} </span>
        Lavinia Apart Hotel | All Rights Reserved
      </div>
    </MDBFooter>
  )
}
