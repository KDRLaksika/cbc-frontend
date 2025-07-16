import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'
import TestPage2 from './pages/testPage2'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPassword'

function App() {
  
  return (
   <GoogleOAuthProvider clientId="495784702637-jdeonr3vta6m5ma97hl3mefbm1fjcdku.apps.googleusercontent.com">
   <BrowserRouter>
   <div>
   <Toaster position='top-right' />
    {/* <Header /> */}
    <Routes path="/*">
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget" element={<ForgetPasswordPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/testing" element={<TestPage />} />
      <Route path="/testing2" element={<TestPage2 />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
   </div>
   </BrowserRouter>
  </GoogleOAuthProvider>
  )
}

export default App

