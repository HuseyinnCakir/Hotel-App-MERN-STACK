import './App.css'

import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import {
  Rooms,
  Services,
  Home,
  Gallery,
  Error,
  Contact,
  Login,
  ProtectedRoute,
} from './pages'

import TheHeader from './components/theHeader'
import Footer from './components/theFooter'

import AdminHeader from './components/admin/adminHeader'
import {
  PanelHome,
  PanelGallery,
  PanelInfo,
  PanelRooms,
  PanelServices,
  PanelSettings,
} from './pages/admin'

function BasicLayout() {
  return (
    <>
      <TheHeader />
      <Outlet />
      <Footer />
    </>
  )
}
function AdminLayout() {
  return (
    <>
      <ProtectedRoute>
        <AdminHeader />
        <Outlet />
      </ProtectedRoute>
    </>
  )
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="Services" element={<Services />} />
        <Route path="reservation" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="login" element={<Login />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<PanelHome />} />
        <Route path="gallery" element={<PanelGallery />} />
        <Route path="services" element={<PanelServices />} />
        <Route path="rooms" element={<PanelRooms />} />
        <Route path="info" element={<PanelInfo />} />
        <Route path="settings" element={<PanelSettings />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App
