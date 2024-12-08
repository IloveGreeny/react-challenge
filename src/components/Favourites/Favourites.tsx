import { useSelector,useDispatch } from 'react-redux';
import { toggleFavourite } from '../../features/products/productsSlice.ts';

export default function Favourites() {
    const dispatch = useDispatch();
    const { products, favourites } = useSelector(state => state.products);

    const favouriteProducts = products.filter(product => favourites.includes(product.id));

    if (favouriteProducts.length === 0) return <h1 className="text-center text-gray-600">No favourites yet</h1>;

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favouriteProducts.map(product => (
                    <div
                        key={product.id}
                        className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                    >
                        <a
                            href={`/products/${product.id}`}
                            className="block p-4 cursor-pointer"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="mt-4 text-xl font-bold text-gray-800 group-hover:text-indigo-600">
                                {product.name}
                            </h3>
                        </a>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                className="p-2 rounded-full bg-white shadow-md text-red-600 hover:bg-gray-100 focus:outline-none"
                                onClick={() => dispatch(toggleFavourite(product.id))}
                                aria-label="Toggle Favourite"
                            >
                                {favourites.includes(product.id) ? "❤️" : "♡"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
