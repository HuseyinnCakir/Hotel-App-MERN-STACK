import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit'
import { NavLink } from 'react-router-dom'
import { getContactData } from '../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
export default function TheHeader() {
  const [showBasic, setShowBasic] = useState(false)
  const { navbarItems } = useSelector((store) => store.header)
  const { contactPage } = useSelector((store) => store.admin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getContactData())
  }, [])
  const [fbLink, setFbLink] = useState(contactPage?.fbLink)
  const [insLink, setInsLink] = useState(contactPage?.insLink)
  const [googleLink, setGoogleLink] = useState(contactPage?.googleLink)
  useEffect(() => {
    setFbLink(contactPage?.fbLink)
    setInsLink(contactPage?.insLink)
    setGoogleLink(contactPage?.googleLink)
  }, [contactPage])
  return (
    <>
      <div>
        <MDBNavbar
          className="p-2"
          fixed="top"
          expand="md"
          style={{ backgroundColor: '#e3f2fd' }}
        >
          <MDBContainer>
            <MDBNavbarBrand href="/">
              <img
                src={`/src/assets/logo.png`}
                className='h-30 w-30'
                height={50}
                alt=''
                loading='lazy'
              /></MDBNavbarBrand>

            <MDBNavbarToggler
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowBasic(!showBasic)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 d-flex justify-content-center">
                {navbarItems?.map((link) => (
                  <div key={link.id}>
                    <NavLink
                      to={link.path}
                      key={link.id}
                      onClick={() => setShowBasic(!showBasic)}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                      end
                    >
                      {link.title}
                    </NavLink>
                  </div>
                ))}
              </MDBNavbarNav>
            </MDBCollapse>

            <MDBBtn
              href={fbLink}
              target="_blank"
              rel="noopener noreferrer"
              tag="a"
              key={1}
              color="none"
              className="me-4 d-none d-lg-block"
              style={{ color: '#3b5998' }}
            >
              <MDBIcon fab key={1} icon="facebook" size="lg" />
            </MDBBtn>
            <MDBBtn
              href={insLink}
              target="_blank"
              rel="noopener noreferrer"
              tag="a"
              key={2}
              color="none"
              className="me-4 d-none d-lg-block"
              style={{ color: '#ac2bac' }}
            >
              <MDBIcon fab key={2} icon="instagram" size="lg" />
            </MDBBtn>
            <MDBBtn
              href={googleLink}
              target="_blank"
              rel="noopener noreferrer"
              tag="a"
              key={3}
              color="none"
              className="me-4 d-none d-lg-block"
              style={{ color: '#dd4b39' }}
            >
              <MDBIcon fab key={3} icon="google" size="lg" />
            </MDBBtn>
          </MDBContainer>
        </MDBNavbar>
      </div>
    </>
  )
}
