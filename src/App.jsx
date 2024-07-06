import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

// header and footer for layout
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

// imports of different page components
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductPage from './components/ProductPage';
import Signin from "./pages/Signin";
import Registration from "./pages/Registration";
import CategoryProducts from "./pages/CategoryProducts"
import AllProducts from "./pages/AllProducts";

// import to fetch the products and circulate to hole application at once
import { productsData } from "./api/api";

// react-toastify imports
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



// layout so that we dont again and again manage header and footer in every page 
const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />} loader={productsData}>
          <Route index element={<Home />} loader={productsData}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/products" element={<AllProducts />} loader={productsData} />
          <Route path="/products/category/:cats" element={<CategoryProducts />} loader={productsData} />
          <Route path="/product/:id" element={<ProductPage />} loader={productsData}/>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/register" element={<Registration />}></Route>
        </Route>
        

        {/* <Route path="/checkout" element={<Checkout />}></Route> */}

      </Route>
    )
  );
  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}>
      </RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;