import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'

export default function App() {
  return (
    <MDBSpinner
      role="status"
      className="d-flex justify-content-center align-items-center m-5"
    >
      <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  )
}
