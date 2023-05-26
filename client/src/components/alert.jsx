import { useSelector } from 'react-redux'

const alert = () => {
  const { alertType, alertText } = useSelector((store) => store.admin)

  return <div className={`alert alert-${alertType}`}>{alertText}</div>
}
export default alert
