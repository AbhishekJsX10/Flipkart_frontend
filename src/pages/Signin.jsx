// sign-in page


import { useState } from "react";
// left side image
import authImg from "../components/images/auth.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

// react-toastify import
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase functionality functions
import { auth } from "../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";


const Signin = () => {
    //hooks->
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();
    

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            navigate("/");
            toast.success("User logged in Successfully", {
              position: "top-center",
            });
          } catch (error) {
            console.log(error.message);
      
            toast.error(error.message, {
              position: "bottom-center",
            });
          }
        };
      


    return (
        <>
        <div className="flex justify-center items-center">
                <div className="container bg-primaryBg mt-5 sm:mt-0 md:mt-0 lg:mt-0 py-[2px]">
                    <div className="flex items-center flex-col sm:flex-col md:flow-row lg:flex-row my-10 mx-auto w-full sm:w-[70vw] md:w-[70vw] lg:w-[70vw] min-h-[400px]  lg:h-[80vh] bg-white shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] ">
                        {/* left view  */}
                        <div className=" w-full md:w-[100%] lg:w-[40%] h-full bg-primaryBlue pb-5 bg-[#1767DD]">
                            <div className="flex gap-2 md:gap-6 flex-col h-full mt-5 md:mt-10 px-6 ">
                                <div className="text-white leading-8 text-[22px] font-[600]">
                                    <h2>Log in</h2>
                                </div>
                                <div className="text-slate-300 text-base leading-7 font-[400]">
                                    <p>
                                        Get access to your Orders, Wishlist and
                                        Recommendations
                                    </p>
                                </div>
                                <div className="mx-auto">
                                    <img src={authImg} alt="auth image" />
                                </div>
                            </div>
                        </div>

                        {/* sign up form */}
                        <div className="py-10 px-6 w-full h-full sm:w-[85%] md:w-[60%] lg:w-[60%] flex flex-col gap-y-10 ">
                            <div className=" h-full w-full">
                                <form
                                    className="w-[90%] mx-auto transition-all"
                                    onSubmit={handleFormSubmit}
                                >
                                    <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 pt-3 ">
                                        <div className="relative">
                                            <input
                                                autoComplete="on"
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="peer placeholder-transparent h-8 w-full border-b-2 text-gray-900 text-sm focus:outline-none focus:border-blue-400"
                                                placeholder="Email address"
                                                required
                                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // Email pattern
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                Email Address
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="password"
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="peer placeholder-transparent h-8 w-full border-b-2 focus:border-blue-400 text-gray-900 focus:outline-none text-sm"
                                                placeholder="Password"
                                                required
                                                minLength="5"
                                            />
                                            <label
                                                htmlFor="password"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                Password
                                            </label>
                                            <span
                                                className="absolute right-3 bottom-2 hover:text-black cursor-pointer"
                                                onClick={handlePasswordToggle}
                                            >
                                                {!showPassword && <AiFillEye />}
                                                {showPassword && (
                                                    <AiFillEyeInvisible />
                                                )}
                                            </span>
                                        </div>
                                        <div className="text-[9px] text-slate-500 ">
                                            <p>
                                                By continuing, you agree to
                                                Flipkart&apos;s Terms of Use and
                                                Privacy Policy.
                                            </p>
                                        </div>

                                        <div className="relative flex flex-col">
                                            <button className="bg-[#FB641B] uppercase text-white text-[14px] font-[500] rounded-sm px-2 py-1">
                                                Log in
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="relative -mt-7 w-full text-center">
                                <Link
                                    to="/register"
                                    className=" text-[#1767DD] font-[500] text-[12px] "
                                >
                                    Forgot Password ?
                                </Link>
                            </div>
                            <div className="relative mt-4 w-full text-center">
                                <Link
                                    to="/register"
                                    className=" text-[#1767DD] font-[500] text-[12px] "
                                >
                                    New to Flipkart? Create an account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    );
};

export default Signin;