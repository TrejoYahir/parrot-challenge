import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import RequireAuth from './features/auth/RequireAuth'
import NotFound from './shared/NotFound'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from './features/auth/authSlice'

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route element={<RequireAuth />} >
          <Route path='' element={<Home />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App
