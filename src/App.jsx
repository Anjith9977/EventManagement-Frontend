import { Route, Routes } from 'react-router'
import './App.css'
import Home from './user/pages/Home'
import Auth from './pages/Auth'
import Profile from './user/pages/Profile'
import View from './user/pages/View'
import EventForm from './organisers/pages/EventForm'
import OrgDashBoard from './organisers/pages/OrgDashBoard'
import AdminDashboard from './admin/pages/AdminDashboard'
import AllEvents from './user/pages/AllEvents'
import Mybooking from './user/pages/Mybooking'
import Adminevents from './admin/pages/Adminevents'
import Adminorganizer from './admin/pages/Adminorganizer'
import AdminViewEvent from './admin/pages/AdminViewEvent'
import CreateEvent from './organisers/pages/CreateEvent'
import OrgProfile from './organisers/pages/OrgProfile'
import Orgview from './organisers/pages/Orgview'
import {ToastContainer} from 'react-toastify'
import PaymentSuccess from './user/pages/PaymentSuccess'
import PaymentError from './user/pages/PaymentError'
import Adminprofile from './admin/pages/Adminprofile'


function App() {


  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/all-events' element={<AllEvents />} />
        <Route path='/eventForm' element={<EventForm />} />
        <Route path='/orgDashboard' element={<OrgDashBoard />} />
        <Route path='/createEvent' element={<CreateEvent />} />
        <Route path='/orgview/:id' element={<Orgview />} />
        <Route path='/OrgProfile' element={<OrgProfile />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/adminEvents' element={<Adminevents />} />
        <Route path='/mybooking' element={<Mybooking />} />
        <Route path='/adminOrganizer' element={<Adminorganizer />} />
        <Route path='/AdminViewEvent/:id' element={<AdminViewEvent />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/paymenterror' element={<PaymentError />} />
        <Route path='/Adminprofile' element={<Adminprofile />} />

      </Routes>
    </>
  )
}

export default App
