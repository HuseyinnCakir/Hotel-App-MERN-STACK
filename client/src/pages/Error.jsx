import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="justify-content-center align-items-center">
      <h3 className="d-flex justify-content-center align-items-center">
        Ohh! page not found
      </h3>

      <p className="d-flex justify-content-center align-items-center">
        <Link to="/">
          We can't seem to find the page you're looking for back home. Click Me.
        </Link>
      </p>
    </div>
  )
}

export default Error
