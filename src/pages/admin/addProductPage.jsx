import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import mediaUpload from '../../utils/mediaUpload';
import axios from 'axios';

export default function AddProductPage() {

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altName, setAltName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [labelledPrice, setLabelledPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();

    async function AddProduct(e){

        const token = localStorage.getItem("token");
        if(token === null){
            toast.error("Please login to add a product");
            return;
        }

        if(images.length === 0){
            toast.error("Please select at least one image");
            return;
        }

        const promiseArray = [];

        for(let i=0; i < images.length; i++){
            promiseArray[i] = mediaUpload(images[i]);
        }

        try{
            const uploadedImages = await Promise.all(promiseArray);
            console.log(uploadedImages);

            const altNamesArray = altName.split(",");

            const product = {
                productId: productId,
                name: name,
                altName: altNamesArray,
                description: description,
                images: uploadedImages,
                labelledPrice: labelledPrice,
                price: price,
                stock: stock
            }

            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
                headers: {
                    "Authorization": 'Bearer ' + token
                }
            }).then((res) => {
                toast.success("Product added successfully");
                navigate("/admin/products")
            })
            .catch((error) => {
                toast.error("Error adding product");
            });

        }catch(error){
            console.log(error);
        }
        

    }

    return (
        <div className="w-full h-full flex justify-center items-center flex-col">

            <input type="text" placeholder="Product ID" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" value={productId} onChange={(e) => setProductId(e.target.value)} />
            <input type="text" placeholder="Product Name" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Product Alt Name" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" value={altName} onChange={(e) => setAltName(e.target.value)} />
            <input type="text" placeholder="Product Description" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" multiple placeholder="Product Images" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" onChange={(e) => setImages(e.target.files)} />
            <input type="number" placeholder="Product Labelled Price" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} />
            <input type="number" placeholder="Product Price" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="number" placeholder="Product Stock" className="border-2 border-gray-300 rounded-md p-2 m-2 w-[300px]" value={stock} onChange={(e) => setStock(e.target.value)} />
            <div className="w-full flex justify-center items-center flex-row mt-4">
                <Link to="/admin/products" className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 mr-4">Cancel</Link>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600" onClick={AddProduct}>Add Product</button>
            </div>
            
        </div>
    )
}