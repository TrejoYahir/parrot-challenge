import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAccessToken } from "./authSlice"

const RequireAuth = () => {
  const accessToken = useSelector(selectAccessToken)
  const location = useLocation()

  return (
    accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth