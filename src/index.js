import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import Products from "./components/Products/Products.tsx";
import ProductForm from "./components/ProductForm/ProductForm.tsx";
import Product from "./components/Product/Product.tsx";
import App from "./App.js";
import NoPage from "./components/NoPage/NoPage.tsx";
import Favourites from "./components/Favourites/Favourites.tsx";
import  {store,persistor} from "./redux/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename="/react-challenge/">
                <Routes>
                    <Route index element={<Products/>}/>
                    <Route path="/create-product" element={<ProductForm/>}/>
                    <Route path="/products/:id" element={<Product/>}/>
                    <Route path="/favourites" element={<Favourites />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

reportWebVitals();
