import { useEffect, useState } from 'react'
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBContainer,
} from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAlert,
  displayAlert,
  loginUser,
} from '../features/admin/adminSlice'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/alert'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()

  const { showAlert, user } = useSelector((store) => store.admin)

  const dispatch = useDispatch()
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    //console.log(e.target.name)
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values
    if (!email || !password) {
      dispatch(displayAlert())
      setTimeout(() => {
        dispatch(clearAlert())
      }, 3000)
      return
    }

    dispatch(
      loginUser({
        email,
        password,
      })
    )
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/admin')
      }, 3000)
      setTimeout(() => {
        dispatch(clearAlert())
      }, 3000)
    }
  }, [user, navigate])
  return (
    <MDBContainer className="my-5 gradient-form">
      <form
        className="d-flex justify-content-center align-items-center"
        onSubmit={onSubmit}
      >
        <MDBRow>
          <MDBCol col="12" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{ width: '185px' }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1 ">Lavinia Apart Hotel</h4>
              </div>
              {showAlert && <Alert />}
              <p className="d-flex justify-content-center">
                Lütfen Giriş Yapınız!
              </p>

              <MDBInput
                wrapperClass="mb-4"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                label="email"
                size="lg"
              />

              <MDBInput
                wrapperClass="mb-4"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
                label="password"
              />

              <MDBBtn type="submit" size="lg" block>
                Giriş Yap
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  )
}
export default Login
