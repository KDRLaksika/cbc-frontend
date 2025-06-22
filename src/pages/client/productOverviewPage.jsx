import axios from 'axios';
import { use, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductOverviewPage() {

  const params = useParams();
  const productId = params.Id;
  const [status, setStatus] = useState("loading"); //loading, error, success
  const [product, setProduct] = useState(null);

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
    
    <div className='bg-accent font-fancy'>
      <p>This is the product overview page for product ID: {JSON.stringify(product)}</p>
    </div>
  );
}

//FBFBFB
//393E46
//C5BAFF