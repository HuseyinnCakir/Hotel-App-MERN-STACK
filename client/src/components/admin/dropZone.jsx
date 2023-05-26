import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { clearAlert } from '../../features/admin/adminSlice'

const buttonContainer = {
  display: 'inline-flex',
  textAlign: 'right',
  width: 30,
  height: 30,
  backgroundColor: '#ff0e0ec0',
}
function ImageUpload(props) {
  //  const [imageUrl, setImageUrl] = useState(homePage?.imageUrl)
  const [images, setImages] = useState([])
  const [files, setFiles] = useState(images ? [...images] : [])
  const dispatch = useDispatch()

  const [isSelected, setIsSelected] = useState(false)

  const removeFile = (file) => (e) => {
    e.preventDefault()
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }
  const changeHandler = (event) => {
    setImages(event.target.files)
    setIsSelected(true)
  }
  useEffect(() => {
    setFiles([...images])
  }, [images])
  //const files = images ? [...images] : []
  const uploadImage = (e) => {
    e.preventDefault()
    if (props.id) {
      dispatch(props.postFunction({ files, _id: props.id }))
    } else {
      dispatch(props.postFunction({ files }))
    }
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }

  return (
    <div>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol md="9">
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            multiple={props.multiple ? props.multiple : false}
          />
          {isSelected ? (
            <ul>
              {files.map((image, i) => (
                <li key={i}>
                  {image.name}
                  <button style={buttonContainer} onClick={removeFile(image)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Fotoğraf Seçtiğinizde ayrıntıları burdan görebiliceksiniz.</p>
          )}
        </MDBCol>
        <MDBCol md="3">
          <MDBBtn
            type="submit"
            size="sm"
            onClick={uploadImage}
            block
            disabled={isSelected ? false : true}
          >
            Ekle
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </div>
  )
}
export default ImageUpload
