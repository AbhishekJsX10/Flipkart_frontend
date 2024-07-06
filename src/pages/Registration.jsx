
// Registeration form Page

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authImage from "../components/images/auth.png";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

// react-toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase functionality function
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";


const Registration = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");


    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error("Password does not match!");
            return;
        }
        try {
            // creating new user
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          console.log(user);
          if (user) {
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              firstName: fname,
              lastName: lname,
              photo:""
            });
          }
          console.log("User Registered Successfully!!");
          toast.success("User Registered Successfully!!", {
            position: "top-center",
          });
          navigate("/signin")
        } catch (error) {
          console.log(error.message);
          toast.error(error.message, {
            position: "bottom-center",
          });
        }
        
    };

    return (
        <>
        <div className="flex justify-center  items-center ">
          <div className="container  bg-primaryBg mt-5 sm:mt-0 md:mt-0 lg:mt-0 py-[2px] lg:py-0">
                    <div className="flex items-center justify-center flex-col sm:flex-col md:flow-row lg:flex-row my-10  mx-auto 
                    w-full sm:w-[70vw] md:w-[80vw] lg:w-[70vw] min-h-[500px] md:py-10 lg:py-0 lg:h-[100%] lg:px-8
                     bg-white shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] ">
                        {/* left view  */}
                        <div className=" w-full md:w-[100%] lg:w-[80%] lg:mt-0 h-[full] pb-10 bg-primaryBlue bg-[#1767DD]">
                            <div className="flex gap-6 flex-col h-full mt-10 px-6 ">
                                <div className="text-white leading-8 text-[22px] font-[600]">
                                    <h2>Looks like you&apos;re new here!</h2>
                                </div>
                                <div className="text-slate-300 text-[15px] leading-7 font-[400]">
                                    <p>
                                        Sign up with the required details to get
                                        started
                                    </p>
                                </div>
                                <div className="mt-14 mx-auto">
                                    <img src={authImage} alt="auth image" />
                                </div>
                            </div>
                        </div>

                        {/* sign up form */}
                        <div className="py-8  px-1 md:p-10 w-full  sm:w-[80%] md:w-[60%] lg:w-[60%] ">
                            <div className="flex items-center flex-col h-full w-full">
                                <form
                                    className="w-[90%] mx-auto transition-all"
                                    onSubmit={handleFormSubmit}
                                >
                                    <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 pt-3 ">
                                        <div className="relative ">
                                            <input
                                                autoComplete="on"
                                                id="fname"
                                                name="fname"
                                                type="text"
                                                value={fname}
                                                onChange={(e) =>
                                                    setFname(e.target.value)
                                                }
                                                className="peer placeholder-transparent h-6 w-full border-b-2 focus:border-blue-400 text-gray-900 focus:outline-none text-sm"
                                                placeholder="First Name"
                                                required
                                            />
                                            <label
                                                htmlFor="fname"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-1 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                First Name
                                            </label>
                                        </div>
                                        <div className="relative ">
                                            <input
                                                autoComplete="on"
                                                id="lname"
                                                name="lname"
                                                type="text"
                                                value={lname}
                                                onChange={(e) =>
                                                    setLname(e.target.value)
                                                }
                                                className="peer placeholder-transparent h-6 w-full border-b-2 focus:border-blue-400 text-gray-900 focus:outline-none text-sm"
                                                placeholder="Last Name"
                                                required
                                            />
                                            <label
                                                htmlFor="lname"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-1 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                Last Name
                                            </label>
                                        </div>
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
                                                autoComplete="on"
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                                className="peer placeholder-transparent h-8 w-full border-b-2 text-gray-900 text-sm focus:outline-none focus:border-blue-400"
                                                placeholder="Mobile Number"
                                                required
                                                inputMode="numeric" // Set input mode to numeric
                                                pattern="[0-9]*" // Allow only numeric values
                                                minLength="10"
                                                maxLength="10"
                                            />
                                            <label
                                                htmlFor="phone"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                Mobile Number
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="password"
                                                name="password"
                                                type="password"
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
                                        </div>
                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="confirm_password"
                                                name="confirm_password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                className="peer placeholder-transparent h-8 w-full border-b-2 focus:border-blue-400 text-gray-900 focus:outline-none text-sm"
                                                placeholder="Confirm Password"
                                                required
                                            />
                                            <label
                                                htmlFor="confirm_password"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                Confirm Password
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
                                        <div className="relative">
                                            <input
                                                autoComplete="on"
                                                id="address"
                                                name="address"
                                                type="text"
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                                className="peer placeholder-transparent h-8 w-full border-b-2 text-gray-900 text-sm focus:outline-none focus:border-blue-400"
                                                placeholder="Address"
                                                required
                                            />
                                            <label
                                                htmlFor="address"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                Address
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input type="checkbox"
                                                size="small"
                                                inputProps={{
                                                    "aria-label": "un-controlled",
                                                }}
                                                disabled
                                            />
                                            <span className="text-[12px] text-gray-700 font-[500]">
                                                Register as Seller
                                            </span>
                                        </div>
                                        <div className="relative flex flex-col">
                                            <button className="bg-[#FB641B] uppercase text-white text-[14px] font-[500] rounded-sm px-2 py-1">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="relative mt-4 w-full">
                                    <Link to="/signin">
                                        <button className="bg-slate-100  text-primaryBlue w-[90%] font-[600] text-[12px] ml-[5%] px-4 py-2  shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] hover:shadow-[0px_0px_8px_2px_rgba(212,212,212,0.8)]  transition-all">
                                            Existing User? Log in
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
          </div>
          </div>
        </>
    );
};

export default Registration;
