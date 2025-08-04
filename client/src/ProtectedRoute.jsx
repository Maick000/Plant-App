import { useAuth } from "./context/useAuthContext"
import { Navigate, Outlet } from "react-router"

function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth()

    if(loading) return <div className="loader">Loading...</div>

    if(!isAuthenticated) return <Navigate to='/login' replace />

  return <Outlet />
}

export default ProtectedRoute