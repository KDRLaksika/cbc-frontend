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

function App() {
  
  return (
   <BrowserRouter>
   <div>
   <Toaster position='top-right' />
    {/* <Header /> */}
    <Routes path="/*">
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/testing" element={<TestPage />} />
      <Route path="/testing2" element={<TestPage2 />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
   </div>
   </BrowserRouter>
  )
}

export default App

