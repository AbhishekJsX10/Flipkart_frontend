// It maps the different categories and includes a slider fordifferent categories on x-axis

import React from 'react';
import { Link } from 'react-router-dom';
import './categories.css';

// images for icons 
import mobiles from '../images/Categories/phone.png';
import fashion from '../images/Categories/fashion.png';
import electronics from '../images/Categories/electronics.png';
import home from '../images/Categories/home.png';
import travel from '../images/Categories/travel.png';
import appliances from '../images/Categories/appliances.png';
import furniture from '../images/Categories/furniture.png';
import beauty from '../images/Categories/beauty.png';
import grocery from '../images/Categories/grocery.png';

const catNav = [
    { name: "Electronics", icon: mobiles },
    { name: "Jewelery", icon: fashion },
    { name: 'Electronics', icon: electronics },
    { name: 'Home', icon: home },
    { name: "Men's clothing", icon: travel },
    { name: "Electronics", icon: appliances },
    { name: "Women's clothing", icon: furniture },
    { name: "Men's clothing", icon: beauty },
    { name: "Jewelery", icon: grocery },
];

const Categories = () => {
    return (
        <section className=" sm:block bg-white p-0 min-w-full md:px-4 lg:px-12 shadow overflow-hidden">
            <div className="category-wrapper">
            {/* {console.log(catNav)} */}
            {/* making of category icon slider  */}
                {catNav.map((item, i) => (
                    <Link
                        to={`/products/category/${item.name.toLocaleLowerCase()}`}
                        className="flex flex-col gap-1 items-center p-2 category-container"
                        key={i}
                    >
                        <div className="md:h-10 md:w-10 lg:h-16 lg:w-16 category-image">
                            <img
                                draggable="false"
                                className="h-full w-full object-contain"
                                src={item.icon}
                                alt={item.name}
                            />
                        </div>
                        <span className="text-sm text-gray-800 text-center font-medium group-hover:text-primary-blue category-text">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
