import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { clearAlert } from '../../features/admin/adminSlice'
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}
const buttonContainer = {
  display: 'inline-flex',
  textAlign: 'right',
  width: 30,
  height: 30,
  backgroundColor: '#ff0e0ec0',
}

const thumb = {
  display: 'flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}
const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isFocused) {
    return '#2196f3'
  }
  return '#eeeeee'
}
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

function ImageUploaded(props) {
  const dispatch = useDispatch()
  //const { homePage, isLoading } = useSelector((store) => store.admin)
  // console.log(props.homePage)
  //  const [imageUrl, setImageUrl] = useState(homePage?.imageUrl)
  const [deleteFiles, setDeleteFiles] = useState([])
  const [files, setFiles] = useState([])

  useEffect(() => {
    setFiles(props.images)
  }, [props.images, props.page])

  /*useEffect(() => {
    setFiles(files)
  }, [props.homePage])*/
  const clear = () => {
    setDeleteFiles([])
  }
  const updateImage = (e) => {
    e.preventDefault()
    if (props.id) {
      dispatch(props.function({ imageUrl: deleteFiles, _id: props.id }))
    } else {
      dispatch(props.function({ imageUrl: deleteFiles }))
    }

    clear()
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
  const removeFile = (removeFile) => (e) => {
    //console.log(removeFile)
    e.preventDefault()
    setDeleteFiles([...deleteFiles, removeFile])
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(removeFile), 1)
    setFiles(newFiles)
    //deleteFiles.splice(newFiles)
  }

  const thumbs = files?.map((file) => (
    <div key={file}>
      <div style={thumb}>
        <div style={thumbInner}>
          <img
            src={`/src/assets/images/${file}`}
            style={img}
            // Revoke data uri after image is loaded
          />
        </div>
      </div>
      <button style={buttonContainer} onClick={removeFile(file)}>
        X
      </button>
    </div>
  ))

  return (
    <MDBRow className="d-flex justify-content-center align-items-center mb-3">
      <MDBCol md="9" className="justify-content-center align-items-center">
        <section className="container">
          <Container>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </Container>
        </section>
      </MDBCol>
      <MDBCol md="3" className="justify-content-center align-items-center">
        <MDBBtn
          type="submit"
          size="sm"
          disabled={deleteFiles.length > 0 ? false : true}
          onClick={updateImage}
          block
        >
          Güncelle
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  )
}

export default ImageUploaded
