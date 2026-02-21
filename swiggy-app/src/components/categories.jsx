// import React from "react";
// import { flushSync } from "react-dom";
// import { HiArrowSmRight } from "react-icons/hi";
// import { HiArrowSmLeft } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

export default function Categories() {
    const [slide, setslide] = useState(0);
    const [categories, setcategories] = React.useState([])
    const fetchcategories = async () => {
        const res = await fetch("/categories");
        const data = await res.json();
        setcategories(data);
    }
    useEffect(() => {
        fetchcategories();
    }, [])

    const nextslide = () => {
        console.log(categories.length - 8, slide);
        if (categories.length - 8 == slide) return false;
        setslide(slide + 3);

    }
    const prevslide = () => {
        console.log(categories.length - 8, slide);
        if (0 == slide) return false;
        setslide(slide - 3);
    }
    return (<>
        <div className="max-w-[1200px] mx-auto">
            <div className="flex my-3 item-centre justify-between">
                <div className="font-bold text-[25px]">What's on your mind?</div>
                <div className="flex">
                    <div className=" cursor-pointer flex justify-centre items-center w-[30px] h-[30px] bg-[#c3b3b324] rounded-full mx-2 text-[25px]" onClick={prevslide} ><HiArrowSmLeft /></div>
                    <div className="cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#c3b3b324] rounded-full mx-2 text-[25px]" onClick={nextslide}><HiArrowSmRight /></div>
                </div>
            </div>
            <div className="flex overflow-hidden">
                {
                    categories.map((cat, index) => {
                        return (
                            <div style={{
                                transform: `translateX(${slide * -100}%)`
                            }} key={index}
                                className="w-[150px] shrink-0 duration-300">
                                <img src={"/images/" + cat.image} alt="" />
                            </div>
                        )
                    })
                }
            </div>
            <hr className="my-6 border border-gray-300 border-[1px]" />
        </div>
    </>
    )
}