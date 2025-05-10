import { useState } from 'react';
import mediaUpload from '../utils/mediaUpload';

export default function TestPage2() {

    const [image, setImage] = useState(null);

    async function filesUpload() {
        try {
            const res = await mediaUpload(image);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChangeCapture={
                (e) => {
                    setImage(e.target.files[0]);
                }
            } />
            <button onClick={filesUpload} className="bg-green-500 text-white font-bold py-2 px-4 rounded">Upload</button>
            
        </div>
    )
}