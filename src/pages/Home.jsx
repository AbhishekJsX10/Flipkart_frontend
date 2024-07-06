import React from "react";
import Banner from "../components/home/Banner";
// import Products from "../components/home/Products";
import ProductSlider from "../components/ProductSlider"


import { electronicProducts } from "../utils/electronics";
import { accessories } from "../utils/accessories";
import { fashionProducts } from "../utils/fashion";
import { applianceProducts } from "../utils/appliances";
import { furnitureProducts } from "../utils/furniture";

import electronics from "../components/images/electronics-card.jpg";
import accessoryCard from "../components/images/accessory-card.jpg";
import fashionCard from "../components/images/fashion-card.jpg";
import applianceCard from "../components/images/appliance-card.jpg";
import furnitureCard from "../components/images/furniture-card.jpg";

import Suggestion from "../components/suggestions/Suggestions"
import Categories from "../components/Categories/Categories"


import { useEffect, useState } from 'react'
import { auth } from "../firebase.config";


const Home = () => {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  },[]);


  return (
    <div className="py-2">
      <Categories/>
      <Banner />
      {/* <div className="w-full bg-gray-100 -mt-16 lgl:-mt-24 xl:-mt-36 py-10"> */}
      {/* <div className="w-full bg-gray-100 py-10">
        <Products />
      </div> */}
      <div className="flex flex-col items-center gap-3 px-2 pb-5 sm:mt-2">
            <ProductSlider 
                    title={"Best of Electronics"}
                    products={electronicProducts}
                    logo={electronics}
                />
                <ProductSlider
                    title={"Beauty, Toys & More"}
                    products={accessories}
                    logo={accessoryCard}
                />
                <Suggestion
                    title={"Suggested for You"}
                    tagline={"Based on Your Activity"}
                />

                <ProductSlider
                    title={"Fashion Top Deals"}
                    products={fashionProducts}
                    logo={fashionCard}
                />
                <ProductSlider
                    title={"TVs & Appliances"}
                    products={applianceProducts}
                    logo={applianceCard}
                />
                <ProductSlider
                    title={"Furniture & More"}
                    products={furnitureProducts}
                    logo={furnitureCard}
                />
      </div>
    </div>
  );
};

export default Home;