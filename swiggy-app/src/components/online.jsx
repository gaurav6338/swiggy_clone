import React, { useEffect, useRef, useState } from "react";
import Card from "./card.jsx";

export default function Online() {
        const [data,setdata] = useState([]);

        const ref = useRef(null);
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      setIsTop(ref.current.getBoundingClientRect().top <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    
        const fetchTopRestaurants = async () => {
            const res = await fetch("http://localhost:5000/top-restaurant-chains");
            const apiData = await res.json();
            setdata(apiData);
        }
    
        useEffect(()=>{
            fetchTopRestaurants();
        }, [])
  return (
    <div className="max-w-[1200px] mx-auto px-4"  ref={ref}>
          <div className="flex my-3 items-center justify-between">
              <div className="font-bold text-[23px] md:text-[25px] tracking-tighter ">Restaurants with online delivery in your city</div>
            </div >
            <div className={isTop ? "fixed top-0 bg-white z-[999999] shadow-xl w-full left-0 h-[73px]" : ""}>
            <div className="max-w-[1200px] mx-auto flex my-4 gap-3">
                <div className="p-2 rounded-md shadow-xl">Filter</div>
                <div className="p-2 rounded-md shadow-xl">Sort By</div>
            </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {
                    data.map((d,i) => {
                        return(
                            <Card {...d} key={i}/>
                        )
                    })
                }
            </div>
    </div>
  )
}
