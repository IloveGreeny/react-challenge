import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../features/products/productsSlice.ts';
import { useNavigate } from 'react-router-dom';

export default function ProductForm() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && image) {
            dispatch(createProduct({ name, image, isUserCreated: true }));
            navigate('/');
        } else {
            alert('Please provide valid product name and image URL');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
}


