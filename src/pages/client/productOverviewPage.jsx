import axios from 'axios';
import { use, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ImageSlider from '../../components/imageSlider';
import Loading from '../../components/loading';
import { addToCart, getCart } from '../../utils/cart';
import { useNavigate } from 'react-router-dom';

export default function ProductOverviewPage() {

  const params = useParams();
  const productId = params.Id;
  const [status, setStatus] = useState("loading"); //loading, error, success
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then(response => {
        console.log(response.data);
        setProduct(response.data);
        setStatus("success");
      })
      .catch(error => {
        console.error(error);
        setStatus("error");
        toast.error("Failed to fetch product details.");
      });
    
  }, []);

  return (
    <>
      {status == "success" && (
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-[50%] flex justify-center items-center h-full">
            <div className="w-[500px] h-[600px] flex flex-col items-center">
              <h1 className="w-full text-center text-4xl text-secondary font-semibold">{product.name}
                  {
                      Array.isArray(product.altName) && product.altName.map((altName, index) => (
                        <span key={index} className="text-4xl text-gray-600">{" | " + altName}</span>
                      ))
                  }
              </h1>
              <h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.productId}</h1>
              <h1 className="w-full text-center my-2 text-2xl text-gray-800 font-semibold">{product.description}</h1>
              {
                product.labelledPrice > product.price ?
                <div>
                  <span className='text-4xl mx-4 text-gray-500 line-through'>{product.labelledPrice.toFixed(2)} </span>
                  <span className='text-4xl mx-4 text-accent font-bold'>${product.price.toFixed(2)}</span>
                </div>
                :
                <div>
                  <span className='text-4xl mx-4 text-accent font-bold'>${product.price.toFixed(2)}</span>
                </div>
              }

              <div className="w-full flex justify-center items-center mt-4">
                <button className="w-[200px] h-[50px] bg-accent mx-4 cursor-pointer text-white rounded-2xl hover:bg-accent/80 transition-all duration-300" onClick={() => {
                  console.log("Old Cart")
                  console.log(getCart())
                  addToCart(product, 1)
                  console.log("New Cart")
                  console.log(getCart())
                  }}>
                  Add to Cart
                </button>
                <button className="w-[200px] h-[50px] bg-accent mx-4 cursor-pointer text-white rounded-2xl hover:bg-accent/80 transition-all duration-300" onClick={() => 
                  navigate("/checkout", {
                    state: {
                      cart: [
                        {productId: product.productId,
                          name: product.name,
                          price: product.price,
                          labelledPrice: product.labelledPrice,
                          image: product.images[0],
                          qty: 1
                        }
                      ]
                     }})}>
                  Buy Now
                </button>
            </div>
          
            </div>
          </div>
        </div>
      )}

      {status == "loading" && <Loading />}
    </>
  );
}

//FBFBFB
//393E46
//C5BAFF