import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavourite} from '../../features/products/productsSlice.ts';
import {RootState} from "../../types/types";

export default function Product() {
    const {id} = useParams();
    const { favourites } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();

    const productId = id ? parseInt(id) : null;

    const product = useSelector(state =>
        state.products.products.find(p => p.id === productId)
    );

    if (!productId) return <h1 className="text-center text-red-500">Invalid Product ID</h1>;
    if (!product) return <h1 className="text-center text-red-500">Product not found</h1>;

    return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-xs mx-auto my-8">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-2">{product.name}</h1>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
        <div className="flex justify-center">
            <button
                className="p-2 rounded-full bg-white shadow-md text-red-600 hover:bg-gray-100 focus:outline-none"
                onClick={() => dispatch(toggleFavourite(product.id))}
                aria-label="Toggle Favourite"
            >
                {favourites.includes(product.id) ? "❤️" : "♡"}
            </button>
            <button
                className="p-2 rounded-full bg-white shadow-md text-red-600 hover:bg-gray-100 focus:outline-none"
                onClick={() => (window.location.href = "/")}
            >
                    Back to Products
            </button>
        </div>
    </div>
    )
        ;
}


