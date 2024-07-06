
// the banner for home page


// slider for banner
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


// images for banner
import oppo from "../images/Banners/oppo-reno7.webp";
import samsung from "../images/Banners/samsung.jpeg";
import infinix from "../images/Banners/infinix.jpeg";
import flight from "../images/Banners/flight.jpeg";
import flight2 from "../images/Banners/flight2.jpeg";
import laptop from "../images/Banners/laptop.png";
import mattress from "../images/Banners/mattress.jpg";
import iphone from "../images/Banners/iphone.jpg";

// previous button for all slider for whole app
export const PreviousBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosIcon />
        </div>
    );
};

// next button for all slider for whole app
export const NextBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
};

const Banner = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const banners = [
        iphone,
        laptop,
        flight,
        samsung,
        infinix,
        mattress,
        oppo,
        flight2,
    ];

    return (
        <>
            <section className="w-[99%] rounded-sm shadow px-1 py-1 overflow-hidden mt-3 sm:m-2">
                {/* slider using react-slick */}
                <Slider {...settings}>
                    {banners.map((el, i) => (
                        <img
                            draggable="false"
                            className="h-[150px] sm:h-[280px] w-full object-cover "
                            src={el}
                            alt="banner"
                            key={i}
                        />
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default Banner;