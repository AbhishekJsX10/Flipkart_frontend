
// the header / navbar component for layout and every route used in it. 


import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenu, HiX } from "react-icons/hi"; 
import { auth, db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const cart = useSelector((state) => state.amazonReducer.products);
  const data = useLoaderData();
  const products = data.data;

  const ref = useRef();
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setFilteredProducts([]);
        setShowAll(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
      setShowAll(true);
    } else {
      setFilteredProducts([]);
      setShowAll(false);
    }
  };

  const handleProductClick = () => {
    setFilteredProducts([]);
    setSearchQuery("");
  };

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

  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await auth.signOut();
      setUserDetails(null);
      toast.success("User Logged Out!!", {
        position: "top-center",
      });
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="sticky top-0 z-50">

      <div className="w-full bg-white text-black sm:px-4 py-3 flex md:justify-between items-center gap-2 md:gap-4 lg:gap-2 xl:gap-4">
        {/* logo */}
        <Link to="/">
          <div className="headerHover">
            <img className="logo-image w-[60px] h-[20px] sm:h-full sm:w-[8rem]" src={"https://flickart-aashish.vercel.app/assets/logo-658ef1b6.png"} alt="logoImage" />
          </div>
        </Link>

        {/* search box */}
        <div className="lg:inline-flex flex h-10 rounded-md flex-grow relative" ref={ref}>
          <span className="w-12 h-full flex items-center justify-center bg-[#F0F5FF] text-[#6f6e6e] hover:bg-[#d2d7e0] duration-300 cursor-pointer rounded-tl-md rounded-bl-md">
            <SearchIcon />
          </span>
          <input
            className="h-full w-[7rem] text-base bg-[#F0F5FF] text-[#6f6e6e] flex-grow outline-none border-none px-2 rounded-r-md"
            type="text"
            placeholder="Search for Products, Brands and More"
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* searched query box */}
          {showAll && filteredProducts.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border border-amazon_blue text-black z-50">
              <ul>
                {filteredProducts.map((product) => (
                  <li key={product.id} className="p-2 hover:bg-gray-200">
                    <Link to={`/product/${product.id}`} onClick={handleProductClick}>
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* user options */}
        {userDetails ? (
          <div className="hidden md:flex gap-1 items-start headerHover">
            <p className="text-xs text-black font-light">
              <AiOutlineUser className="text-[22px] group-hover:text-white" />
            </p>
            <p className="hidden md:inline-flex text-sm font-semibold mt-1 text-black">
              {userDetails.firstName}
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </p>
          </div>
        ) : (
          <Link to="/signin">
            <div className="hidden md:flex gap-1 items-start headerHover">
              <p className="text-xs text-black font-light">
                <AiOutlineUser className="text-[22px] group-hover:text-white" />
              </p>
              <p className="hidden md:inline-flex text-sm font-semibold mt-1 text-black">
                Login
                <span>
                  <ArrowDropDownOutlinedIcon />
                </span>
              </p>
            </div>
          </Link>
        )}

        {/* cart */}
        <Link to="/cart">
          <div className="hidden md:flex items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="hidden mdl:inline-flex text-xs font-semibold mt-3 text-black">
              Cart
            </p>
            <span className="absolute text-xs top-0 left-6 w-4 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              {cart.length > 0 ? cart.length : 0}
            </span>
          </div>
        </Link>

        {/* become a seller */}
        <div className="hidden md:flex text-center flex-col items-start justify-center headerHover">
          <p className="text-sm font-semibold mt-1 text-black">Become a Seller</p>
        </div>

        {/* logout button */}
        {userDetails && (
          <div
            className="flex flex-col justify-center items-center headerHover relative"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <p className="hidden mdl:inline-flex text-xs font-semibold text-black">
              Log out
            </p>
          </div>
        )}

        {/* ham menu */}
        <div className="md:hidden pr-4 flex items-center">
          <button className="transition-all ease-in-out duration-2000" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX className="text-3xl" /> : <HiOutlineMenu className="text-3xl" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-[#dcdcdc] mx-2 rounded-md text-black p-4 space-y-2">
          {userDetails ? (
            <div className="flex gap-1 items-start headerHover">
              <p className="text-xs text-black font-light">
                <AiOutlineUser className="text-[22px] group-hover:text-white" />
              </p>
              <p className="inline-flex text-sm font-semibold mt-1 text-black">
                {userDetails.firstName}
              </p>
            </div>
          ) : (
            <Link to="/signin">
              <div className="flex gap-1 items-start headerHover">
                <p className="text-xs text-black font-light">
                  <AiOutlineUser className="text-[22px] group-hover:text-white" />
                </p>
                <p className="inline-flex text-sm font-semibold mt-1 text-black">
                  Login
                </p>
              </div>
            </Link>
          )}
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
          <div className="flex headerHover relative">
            <ShoppingCartIcon />
            <p className="flex ml-3 items-center font-medium  text-black">
              Cart
            </p>
            <span className="absolute text-xs top-0 left-6 w-4 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              {cart.length > 0 ? cart.length : 0}
            </span>
          </div>
          </Link>
          <Link to="/" onClick={() => setMenuOpen(false)} className="pl-2">Become a Seller</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
