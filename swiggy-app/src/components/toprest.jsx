import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import Card from "./card.jsx";

export default function TopRest() {
    const [data, setdata] = useState([]);
    const [slide, setslide] = useState(0);


    const fetchTopRestaurants = async () => {
        const res = await fetch("/top-restaurant-chains");
        const apiData = await res.json();
        setdata(apiData);
    }

    useEffect(() => {
        fetchTopRestaurants();
    }, [])

    const nextslide = () => {
        console.log(data.length - 5, slide);
        if (data.length - 5 <= slide) return false;
        setslide(slide + 2);

    }
    const prevslide = () => {
        console.log(data.length - 5, slide);
        if (0 == slide) return false;
        setslide(slide - 2);

    }

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="flex my-3 items-center justify-between">
                <div className="font-bold text-[23px] md:text-[25px]">Top restaurant in your city</div>
                <div className="flex">
                    <div className=" cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#c3b3b324] rounded-full mx-2 text-[25px]" onClick={prevslide}><HiArrowSmLeft /></div>
                    <div className="cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#c3b3b324] rounded-full mx-2 text-[25px]" onClick={nextslide}><HiArrowSmRight /></div>
                </div>
            </div>
            <div className="flex gap-5 overflow-hidden pb-4">
                {data.map((d, i) => {
                    return (
                        <div style={{
                            transform: `translateX(${slide * -100}%)`
                        }} key={i} className="shrink-0 duration-300">
                            <Card width="w-full md:w-[273px]" {...d} key={i} />
                        </div>
                    )
                })
                }

            </div>
            <hr className="my-6 border border-gray-300 border-[1px]" />
        </div>
    )
}
