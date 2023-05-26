import React, { useState } from 'react'
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
import { Link, NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/admin/adminSlice'
export default function TheHeader() {
  const [showBasic, setShowBasic] = useState(false)
  const { adminNavbar } = useSelector((store) => store.header)
  const dispatch = useDispatch()

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
            <MDBNavbarBrand href="#">Lavinia Apart Hotel</MDBNavbarBrand>

            <MDBNavbarToggler
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowBasic(!showBasic)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 justify-content-center">
                {adminNavbar.map((link) => {
                  const { title, path, id } = link
                  return (
                    <NavLink
                      to={path}
                      key={id}
                      onClick={() => setShowBasic(!showBasic)}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                      end
                    >
                      {title}
                    </NavLink>
                  )
                })}
              </MDBNavbarNav>

              <Link to="settings">
                <MDBBtn rounded size="lg" tag="a" className="p-3 m-3">
                  <MDBIcon
                    fas
                    icon="user-circle"
                    size="lg"
                    className="d-flex justify-content-center align-items-center"
                  />
                </MDBBtn>
              </Link>
              <MDBBtn
                className="p-3 m-3"
                rounded
                size="xs"
                color="danger"
                onClick={() => dispatch(logoutUser())}
              >
                Cıkış Yap
              </MDBBtn>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </div>
    </>
  )
}
