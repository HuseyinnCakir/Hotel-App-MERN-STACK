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
import { clearAlert } from '../../features/admin/adminSlice'
import { setModal } from '../../features/admin/adminSlice'
export default function App(props) {
  const dispatch = useDispatch()
  const [basicModal, setBasicModal] = useState(true)
  const [desc, setDesc] = useState()
  const [icon, setIcon] = useState()
  const toggleShow = () => {
    setBasicModal(!basicModal)
    dispatch(setModal())
  }
  //console.log(props.subItemId)
  const createData = (e) => {
    e.preventDefault()
    if ((!icon || !desc) && !props.subItemId) {
      dispatch(props.displayAlert())
      return
    }

    if (props.itemId && props.subItemId) {
      dispatch(
        props.sendFunction({
          desc: desc,
          icon: icon,
          _id: props.itemId,
          subId: props.subItemId,
        })
      )
    } else if (props.itemId && !props.subItemId) {
      dispatch(
        props.sendFunction({
          desc: desc,
          icon: icon,
          _id: props.itemId,
        })
      )
    } else {
      dispatch(props.sendFunction({ desc: desc, icon: icon }))
    }

    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
    setBasicModal(!basicModal)
  }

  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
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
                      id="desc"
                      name="desc"
                      rows={4}
                      label="Açıklama"
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    {!props.subItemId && (
                      <MDBInput
                        className="mb-4"
                        id="icon"
                        name="icon"
                        rows={4}
                        label="Icon"
                        onChange={(e) => setIcon(e.target.value)}
                      />
                    )}
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
