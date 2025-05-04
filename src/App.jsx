import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
   <BrowserRouter>
   <div>
   <Toaster position='top-right' />
    <Header />
    <Routes path="/*">
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/testing" element={<TestPage />} />
      <Route path="/*" element={<h1>Page Not Found 404 Error</h1>} />
    </Routes>
   </div>
   </BrowserRouter>
  )
}

export default App
