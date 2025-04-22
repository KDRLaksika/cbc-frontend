import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'

function App() {
  
  return (
    <>
      <Header />
      <ProductCard name="Apple Laptop" price="$1000" image="https://picsum.photos/id/8/200/300" description="This is the best apple laptop of all times." />
      <ProductCard name="Gaming Laptop" price="$2500" image="https://picsum.photos/id/2/200/300" description="This is the best gaming laptop of all times" />
    </>
  )
}

export default App
