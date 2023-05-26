import React, { useState } from 'react'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit'
import { useDispatch } from 'react-redux'
import { clearAlert, setModal } from '../../features/admin/adminSlice'

export default function App(props) {
  const dispatch = useDispatch()
  const [basicModal, setBasicModal] = useState(true)
  const [desc, setDesc] = useState()
  const [title, setTitle] = useState()

  const [image, setImage] = useState([])
  const toggleShow = () => {
    setBasicModal(!basicModal)
  }

  const createData = (e) => {
    e.preventDefault()
    if (!title || !desc || !image) {
      dispatch(props.displayAlert())
      return
    }
    dispatch(
      props.sendFunction({
        desc: desc,
        title: title,
        files: image,
      })
    )
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
    setBasicModal(!basicModal)
  }
  const changeHandler = (event) => {
    setImage(event.target.files)
  }
  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle></MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md="12">
                  <p className="d-flex justify-content-center">{props.desc}</p>
                  <div>
                    <MDBInput
                      className="mb-4"
                      id="title"
                      name="title"
                      rows={4}
                      label="Başlık"
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <MDBInput
                      className="mb-4"
                      id="desc"
                      name="desc"
                      rows={4}
                      label="Açıklama"
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <input
                      type="file"
                      name="file"
                      onChange={changeHandler}
                      multiple={false}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn onClick={createData}>Ekle</MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={toggleShow}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
