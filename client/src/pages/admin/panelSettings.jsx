import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit'
import {
  displayAlert,
  clearAlert,
  passwordChange,
  createUser,
} from '../../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Loading from '../../components/loading'
import Alert from '../../components/alert'

const panelSettings = () => {
  const { user, isLoading, showAlert } = useSelector((store) => store.admin)
  const dispatch = useDispatch()
  const [password, setPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [newPasswordConfirm, setNewPasswordConfirm] = useState()
  const [newUserName, setNewUserName] = useState()
  const [newUserPassword, setNewUserPassword] = useState()
  const [newUserEmail, setNewUserEmail] = useState()
  const changePass = (e) => {
    e.preventDefault()
    if (!password || !newPassword || !newPasswordConfirm) {
      dispatch(displayAlert())
      return
    }
    const data = {
      email: user.user.email,
      password: password,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
    }
    dispatch(passwordChange(data))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
  const userCreate = (e) => {
    e.preventDefault()
    if (!newUserName || !newUserEmail || !newUserPassword) {
      dispatch(displayAlert())
      return
    }
    const data = {
      user: user.user,
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
    }
    dispatch(createUser(data))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
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
      <MDBContainer className="p-5 mb-3">
        <h2 className="d-flex justify-content-center align-items-center m-4 p-4">
          Ayarlar
        </h2>
        {showAlert && <Alert />}
      </MDBContainer>
      <MDBRow className="d-flex justify-content-center align-items-center p-4">
        <MDBCol md="7">
          <MDBInput
            className="mb-4"
            id="password"
            type="password"
            label="Şuanki Şifreniz"
            onChange={(e) => setPassword(e.target.value)}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="d-flex justify-content-center align-items-center p-4">
        <MDBCol md="7">
          <MDBInput
            className="mb-4"
            id="newPassword"
            type="password"
            label="Yeni Şifreniz"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="d-flex justify-content-center align-items-center p-4">
        <MDBCol md="7">
          <MDBInput
            className="mb-4"
            id="newPasswordConfirm"
            type="password"
            label="Şuanki Şifreniz"
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="d-flex justify-content-center align-items-center p-4">
        <MDBCol md="3">
          <MDBBtn
            type="submit"
            size="sm"
            className="d-flex justify-content-center"
            block
            onClick={changePass}
          >
            Şifre Güncelle
          </MDBBtn>
        </MDBCol>
      </MDBRow>

      {user.user.authority == 1 && (
        <div>
          <h2 className="d-flex justify-content-center align-items-center m-4 p-4">
            Kullanıcı Ekle
          </h2>
          <MDBRow className="d-flex justify-content-center align-items-center p-4">
            <MDBCol md="7">
              <MDBInput
                className="mb-4"
                id="name"
                type="text"
                label="Adı"
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex justify-content-center align-items-center p-4">
            <MDBCol md="7">
              <MDBInput
                className="mb-4"
                id="email"
                type="email"
                label="email"
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex justify-content-center align-items-center p-4">
            <MDBCol md="7">
              <MDBInput
                className="mb-4"
                id="newUserPassword"
                type="password"
                label="Şifresi"
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex justify-content-center align-items-center p-4">
            <MDBCol md="3">
              <MDBBtn
                type="submit"
                size="sm"
                className="d-flex justify-content-center"
                block
                onClick={userCreate}
              >
                Kullanıcı Ekle
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
      )}
    </div>
  )
}
export default panelSettings
