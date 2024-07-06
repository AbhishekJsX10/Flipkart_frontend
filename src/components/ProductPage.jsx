// single product page component



import { useEffect, useState } from "react";

// toast import
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// // icons and slider import
import ProductSlider from "./ProductSlider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

// // static data for Recommendation section
import { fashionProducts } from "../utils/fashion";
import { electronicProducts } from "../utils/electronics";



import { Link, useNavigate } from "react-router-dom";

// // my imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { addToCart } from '../redux/amazoneSlice'; 

import { resetCart} from "../redux/amazoneSlice";

// firebase imports
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

// ////////////////////////// extra ///////////////////////


import { FaHeart, FaStar } from 'react-icons/fa';

const ProductPage = () => {
  const [isWishlist, setIsWishlist] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useLoaderData();
  const products = data.data;
  const product = products.find(product => product.id == id);

  // fetching user data to handel buy
  const [userDetails, setUserDetails] = useState(null);

const fetchUserData = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    } else {
      setUserDetails(null);
    }
  });
};

useEffect(() => {
  fetchUserData();
}, []);

const handelBuy = () =>{
if(userDetails){
  dispatch(resetCart())
  toast.success("Happy Shopping!!", {
    position: "top-center",
  });
  navigate("/")
}else{
  toast.error("Please Login First!!", {
    position: "top-center",
  });
  navigate("/signin")
}
}

const handelAddingItems = () =>{
    dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          quantity: 1,
        })
      )
      toast.success("Product added to cart!", {
        position: "top-center",
      });
}


  return (
    <div className="min-h-screen bg-white p-4">
      <div className="container relative mx-auto lg:flex lg:space-x-8">
        {/* Left Section */}
        <div className="lg:w-1/3 h-full sticky lg:top-20">
          <div className="p-4">
            <img
              src={product.image} 
              alt="Product"
              className="w-3/4 mx-auto lg:w-[18rem] lg:h-[25rem] rounded-md"
            />
            <button
              className={`absolute top-4 right-4 text-2xl ${isWishlist ? 'text-red-500' : 'text-[#ccc]'}`}
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <FaHeart />
            </button>
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={() => handelAddingItems()}
            className="bg-[#FF9F00] text-white w-1/2 py-2 px-1 sm:p-4 rounded flex items-center justify-center">
            <ShoppingCartIcon />
              Add to Cart
            </button>
            <button 
                onClick={handelBuy}
            className="bg-[#FB641B] text-white w-1/2 py-2 px-1 sm:p-4 rounded flex items-center justify-center">
                <FlashOnIcon />    
                 Buy Now
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-8 lg:mt-0 lg:w-2/3">
          <h1 className="text-2xl ">{product.title}</h1>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-green-600 p-1 py-0.5 rounded">
              <FaStar className="text-white text-[0.7rem]" />
              <span className="text-white text-[0.7rem]">{product.rating.rate}</span>
            </div>
            <div className='text-[#747280]'>{  Math.floor(Math.random() * 101) } Reviews</div>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Verified" className="w-[3.7rem] h-4 border" />
          </div>

          {/* pricing section */}
          <div className="mt-4">
            <div className="text-lg text-green-600 font-semibold ">Special Price</div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
              <span className="line-through text-gray-400">₹{product.price+5}</span>
              <span className="text-green-600">55% off</span>
            </div>
          </div>

          {/* alert section */}
          <span className="text-red-500 text-sm font-medium">
                                                 Hurry, Only {product.rating.count}{" "}
                                                 left!
          </span>

           {/* offer section */}
          <div className="mt-4">
            <h2 className="text-lg font-[600] mt-4">Available offers</h2>
            {[
                "Flat ₹200 off on HDFC Bank Credit/Debit Card on 3 months EMI Txns, Min Txn Value ₹10,000",
                "10% Instant Discount on ICICI Bank Credit Card Txns, up to ₹1250, on orders of ₹5000 and above",
                "Flat ₹500 off on HDFC Bank Credit/Debit Card on 6 months EMI Txns, Min Txn Value ₹10,000",
                                    ].map((el, i) => (
                                        <p
                                            className="flex gap-2 text-[14px] leading-2 mt-2"
                                            key={i}
                                        >
                                            <LocalOfferIcon
                                                sx={{
                                                    fontSize: "16px",
                                                }}
                                                style={{
                                                    color: "#16bd49",
                                                    marginTop: "2px",
                                                }}
                                            />
                                            <span className="font-[500] text-[14px] flex items-baseline gap-4">
                                                <span className="min-w-fit">
                                                    Bank Offer
                                                </span>
                                                <span className=" font-[400] ">
                                                    {el}
                                                    <Link
                                                        className="text-blue-600 text-[12px] font-medium ml-1"
                                                        to="/"
                                                    >
                                                        T&C
                                                    </Link>
                                                </span>
                                            </span>
                                        </p>
                                    ))}
          </div>

{/* warrenty section */}
          <div className="flex gap-8 mt-5 items-center text-sm">
                                        <img
                                            draggable="false"
                                            className="w-20 h-8 p-0.5 border object-contain"
                                            // src={product.brand?.logo.url}
                                            src={"https://res.cloudinary.com/dppaer7fz/image/upload/v1694024844/brands/yr67somyzerusjrf93kk.jpg"}
                                            // alt={product?.brand?.name}
                                        />
                                        <span>
                                            {/* {product?.warranty === 0 */}
                                            {0 === 0
                                                ? "No Warranty"
                                                : `${product?.warranty} Year Brand Warranty`}
                                        </span>
                                        <Link
                                            className="font-medium text-blue-600 -ml-5"
                                            to="/"
                                        >
                                            Know More
                                        </Link>
                                    </div>
    {/* highlights and services container */}
        <div className="flex flex-col md:flex-row justify-between">                            
{/* highlights */}
        <div className="flex gap-16 mt-4 items-stretch text-sm">
                                             <p className="text-gray-500 font-medium">
                                                 Highlights
                                             </p>

                                             <ul className="list-disc flex flex-col gap-2 w-64">
                                                 {[ "With Mic:Yes","Bluetooth version: 5.2","Battery life: 28 hrs | Charging time: 1.5 hrs","10mm Dynamic Bass Boost Driver - Powerful & Rhythmic Bass","Enco Live Stereo Sound Effects","AI Deep Noise Cancellation", "IPX4 Water Resistant" ].map(
                                                     (highlight, i) => (
                                                         <li key={i}>
                                                             <p>{highlight}</p>
                                                         </li>
                                                     )
                                                 )}
                                             </ul>
                                         </div>
          
{/* services */}
                                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                                            <p className="text-gray-500 font-medium">
                                                Services
                                            </p>
                                            <ul className="flex flex-col gap-2">
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-primaryBlue">
                                                            <VerifiedUserIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "18px",
                                                                }}
                                                            />
                                                        </span>{" "}
                                                        2 Year
                                                        Brand Warranty
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-primaryBlue">
                                                            <CachedIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "18px",
                                                                }}
                                                            />
                                                        </span>{" "}
                                                        7 Days Replacement
                                                        Policy
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-primaryBlue">
                                                            <CurrencyRupeeIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "18px",
                                                                }}
                                                            />
                                                        </span>{" "}
                                                        Cash on Delivery
                                                        available
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
        </div> 
         
{/* seller details */}
        <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                         <p className="text-gray-500">Seller</p>
                                         <Link
                                             className="font-medium text-primaryBlue ml-3"
                                             to="/"
                                         >
                                            JIO lifestyles
                                         </Link>
                                     </div>
{/* flipkart plus banner */}
<div className="sm:w-1/2 mt-4 border">
    <img
        draggable="false"
        className="w-full h-full object-contain"
        src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png"
        alt="flipkart plus"
        />
</div>

{/* description section */}
<div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">
                                            Description
                                        </p>
                                        <span>{product.description}</span>
</div>

{/* specifications */}
                                        {/* <!-- specifications border box --> */}
                                        <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col ">
                                        <h1 className="px-6 py-4 border-b text-2xl font-[600]">
                                            Specifications
                                        </h1>
                                        <h1 className="px-6 py-3 text-lg">
                                            General
                                        </h1>

                                        {/* <!-- specs list --> */}
                                        {[{
        "Model Name": "Enco Buds 2",
        "Color": "Midnight",
        "Headphone Type": "True Wireless",
        "Inline Remote": "Yes",
        "Designed For": "Smartphones, Laptops, Smart TVs, Tablets"
    }].map((spec, i) => (
        Object.entries(spec).map(([key, value]) => (
            <div
                className="px-6 py-2 gap-5 flex sm:items-center text-sm flex-col items-start sm:flex-row"
                key={`${i}-${key}`}
            >
                <p className="text-gray-500 w-3/12">
                    {key}
                </p>
                <p className="flex-1">
                    {value}
                </p>
            </div>
        ))
    ))}
                                        {/* <!-- specs list --> */}
                                    </div>

{/* Rating and Reviews */}
<div className="w-full mt-4 rounded-sm border flex flex-col">
                                        <div className="flex justify-between items-center border-b px-6 py-4">
                                            <h1 className="text-2xl font-medium">
                                                Ratings & Reviews
                                            </h1>
                                            <button
                                                className="shadow bg-white font-[500] px-4 py-2 rounded-sm hover:shadow-md border"
                                            >
                                                Rate Product
                                            </button>
                                        </div>
                                        <div className="flex items-center border-b">
                                            <h1 className="px-6 py-3 text-3xl font-semibold">
                                                {/* {product.ratings?product.ratings:"0"} */}
                                                {Math.floor(Math.random() * 6)}
                                                {" "}
                                                <StarIcon />
                                            </h1>
                                            <p className="text-lg text-gray-500">
                                                 {Math.floor(Math.random() * 101)} Reviews
                                            </p>
                                        </div>
                                    </div>
                                    {/* <!-- reviews border box --> */}
        </div>


      </div>
      {/* Sliders */}
      <div className="flex flex-col gap-3 my-6 px-4 ">
                            <ProductSlider className="border-2"
                                title={"Recommendation"}
                                products={[
                                    ...fashionProducts,
                                    ...electronicProducts,
                                ]}
                            />
                        </div>
    </div>
  );
};

export default ProductPage;

