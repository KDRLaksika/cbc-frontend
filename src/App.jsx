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
    <Header />
    <Routes path="/*">
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/testing" element={<TestPage />} />
      <Route path="/testing2" element={<TestPage2 />} />
      <Route path="/*" element={<h1>Page Not Found 404 Error</h1>} />
    </Routes>
   </div>
   </BrowserRouter>
  )
}

export default App


//https://nsqamuhdendvtakberya.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcWFtdWhkZW5kdnRha2JlcnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MzY0NzAsImV4cCI6MjA2MjQxMjQ3MH0.W0ondifODnrQDTAT4A8uLWBdGNKzOeN53jvLuS_va6M