import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ImageSlider from '../../components/imageSlider';
import Loading from '../../components/loading';
import { addToCart, getCart } from '../../utils/cart';

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
        <div className="w-full h-full flex flex-col md:flex-row md:p-40">
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center md:mb-30">
            <div className="w-full max-w-[500px] px-4 py-6 flex flex-col items-center">
              <h1 className="w-full text-center text-2xl md:text-4xl text-secondary font-semibold">
                {product.name}
                {Array.isArray(product.altName) && product.altName.map((altName, index) => (
                  <span key={index} className="text-2xl md:text-4xl text-gray-600">{" | " + altName}</span>
                ))}
              </h1>

              <h1 className="w-full text-center my-2 text-sm md:text-md text-gray-600 font-semibold">{product.productId}</h1>
              <h1 className="w-full text-center my-2 text-lg md:text-2xl text-gray-800 font-semibold">{product.description}</h1>

              {product.labelledPrice > product.price ? (
                <div className="flex flex-wrap justify-center items-center mt-2">
                  <span className='text-2xl md:text-4xl mx-2 text-gray-500 line-through'>${product.labelledPrice.toFixed(2)}</span>
                  <span className='text-2xl md:text-4xl mx-2 text-accent font-bold'>${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center items-center mt-2">
                  <span className='text-2xl md:text-4xl mx-2 text-accent font-bold'>${product.price.toFixed(2)}</span>
                </div>
              )}

              <div className="w-full flex flex-col md:flex-row justify-center items-center mt-6 gap-4">
                <button
                  className="w-full md:w-[200px] h-[50px] bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300"
                  onClick={() => {
                    console.log("Old Cart", getCart());
                    addToCart(product, 1);
                    console.log("New Cart", getCart());
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="w-full md:w-[200px] h-[50px] bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300"
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        cart: [{
                          productId: product.productId,
                          name: product.name,
                          price: product.price,
                          labelledPrice: product.labelledPrice,
                          image: product.images[0],
                          qty: 1,
                        }]
                      }
                    })
                  }
                >
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
