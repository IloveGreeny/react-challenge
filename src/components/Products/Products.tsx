import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/types.ts";
import { fetchProducts, deleteProduct, toggleFavourite } from "../../features/products/productsSlice.ts";
import SearchBar from "../SearchBar/SearchBar.tsx";
import {Link} from "react-router-dom";

export default function Products() {
    const dispatch = useDispatch();
    const { products, favourites } = useSelector((state: RootState) => state.products);

    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (search) {
            setFilteredProducts(
                products.filter(product => product.name.toLowerCase().startsWith(search.toLowerCase()))
            );
        } else {
            setFilteredProducts(products);
        }
    }, [search, products]);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <SearchBar search={search} setSearch={setSearch} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                    >
                        <Link
                            to={`/products/${product.id}`}
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
                        </Link>

                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                className="p-2 rounded-full bg-white shadow-md text-red-600 hover:bg-gray-100 focus:outline-none"
                                onClick={() => dispatch(toggleFavourite(product.id))}
                                aria-label="Toggle Favourite"
                            >
                                {favourites.includes(product.id) ? "❤️" : "♡"}
                            </button>
                            <button
                                className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 focus:outline-none"
                                onClick={() => dispatch(deleteProduct(product.id))}
                                aria-label="Delete Product"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <Link to="/favourites" className="mt-8 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all mr-3">
                    View Favourites
                </Link>
                <Link to="/create-product" className="mt-8 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all">
                    Create Product
                </Link>
            </div>

        </div>
    );
}
