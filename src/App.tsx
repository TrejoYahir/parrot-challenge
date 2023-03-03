import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import RequireAuth from './features/auth/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index path='login' element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path='home' element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
