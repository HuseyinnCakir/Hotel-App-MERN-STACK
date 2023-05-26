import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.admin)
  // console.log(user)

  if (!user) {
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
