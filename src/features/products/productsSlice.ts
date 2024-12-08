import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from '../../types/types.ts';

const initialState: ProductsState = {
    products: [],
    favourites: [],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.map((product: any) => ({
        id: product.id,
        name: product.title,
        image: product.image,
    }));
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData: { name: string, image: string }) => {
    return productData;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleFavourite: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const isFavourite = state.favourites.includes(id);

            if (isFavourite) {
                state.favourites = state.favourites.filter(favId => favId !== id);
            } else {
                state.favourites.push(id);
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.products = state.products.filter(product => product.id !== id);
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        });
        builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<{ name: string, image: string }>) => {
            const newProduct = {
                id: Date.now(),
                ...action.payload,
            };
            state.products.push(newProduct);
        });
    },
});

export const { toggleFavourite, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;