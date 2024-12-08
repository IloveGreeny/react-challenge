export interface Product {
    id: number;
    name: string;
    image: string;
}

export interface ProductsState {
    products: Product[];
    favourites: number[];
}

export interface RootState {
    products: ProductsState;
}
