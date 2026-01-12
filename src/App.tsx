import { Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/DashboardPage'
import ProtectedRoute from './routes/ProtectedRoute'
import ServiceDetailPage from './pages/ServiceDetailPage'
import TopUp from './pages/TopUpPage'
import HistoryTransaction from './pages/HistoryTransactionPage'
import AccountPage from './pages/AccountProfilePage'

function App() {

  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/top-up' element={<TopUp />} />
          <Route path='/service/:service_code' element={<ServiceDetailPage/>}/>
          <Route path='/transaction' element={<HistoryTransaction/>}/>
          <Route path='/account' element={<AccountPage/>}/>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

      </Routes>
    </>
  )
}

export default App
