import { UnAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser) => {
  if (requestUser.authority === 1) return

  throw new UnAuthenticatedError('Not authorized to access this route')
}

export default checkPermissions
