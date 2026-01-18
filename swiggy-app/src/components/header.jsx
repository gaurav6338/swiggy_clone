// import React from "react";
// import { RxCaretDown } from "react-icons/rx";
// import { useState } from "react";
// import { IoSearch } from "react-icons/io5";
// import { RiDiscountPercentLine } from "react-icons/ri";
// import { IoHelpBuoyOutline } from "react-icons/io5";
// import { IoPersonOutline } from "react-icons/io5";

// export default function Header() {
//   const [toggle,setToggle]=useState(false);
//   const showsidemenu=()=>{
//     console.log("hii");
//     setToggle(true);
//   }
//   const hidesidemenu=()=>{
//     setToggle(false);
//   }
//   const links=[
//     {name:"search",icon:<IoSearch/>},
//     {name:"offers",icon:<RiDiscountPercentLine/>,super:"new"},
//     {name:"help",icon:<IoHelpBuoyOutline/>},
//     {name:"sign in",icon:<IoPersonOutline/>},
//     {name:"cart"},
//   ]
  

//     return (
//       <>
//       <div className="overley w-full h-full fixed doration-500" onClick={hidesidemenu} style={{
//         opacity:toggle? '1':'0',
//         visibility:toggle? 'visible':'hidden'
//       }}>
//         <div onClick={(e)=>{
//           e.stopPropagation();
//         }}
//          className=" w-[400px] bg-white h-full absolute duration-[600ms]"
//         style={{
//           left: toggle ? '0%':'-100%'
//         }}
//         ></div>
//       </div>
//       <header className="p-[10px] shadow-xl">
//           <div className="max-w-[1200px] mx-auto flex items-center">
//             <div className=" w-[100px] ">
//                 <img src="logo.png" className="w-full" alt="" />
//             </div>
//             <div className="">
//                <span className="font-bold border-b-[3px] border-[black]">ghaziabad</span>,UP india<RxCaretDown fontSize={25} className="inline text-[.9rem] text-[#ff5200] cursor-pointer" onClick={showsidemenu}/>
//             </div>
//             <nav className='flex list-none gap-6 ml-auto mr-4 font-semibold px-auto'> 
//               {links.map((link,index)=>{
//                 return(
//                   <li key={index} className="flex items-center gap-1 cursor-pointer hover:text-[#ff5200] duration-300 p-2">
//                     {link.icon}
//                     {link.name}
//                     <sup>{link.super}</sup>

//                   </li>
//                 )
//               })}
//             </nav>
//           </div>
//        </header>
//       </>
//     )
// }

// *****************************************
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCaretDown } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoHelpBuoyOutline, IoPersonOutline } from "react-icons/io5";
import { HiOutlineRectangleStack } from "react-icons/hi2";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [location, setLocation] = useState("Detecting...");

  const showsidemenu = () => setToggle(true);
  const hidesidemenu = () => setToggle(false);

  const links = [
    { name: "search", icon: <IoSearch /> },
    { name: "offers", icon: <RiDiscountPercentLine />, super: "new" },
    { name: "help", icon: <IoHelpBuoyOutline /> },
    { name: "sign in", icon: <IoPersonOutline /> },
    { name: "cart", icon: <HiOutlineRectangleStack /> ,super: "2"},
  ];

  // ✅ Fetch user GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      setLocation("Location not supported");
    }
  }, []);

  // ✅ call Geoapify API with lat + lon
  const success = async (position) => {
    const { latitude, longitude } = position.coords;
    console.log("User location: ", latitude, longitude);

    const apiKey = "f4fd7b43698c4144b2108218ae57b99e";

    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
      );

      const data = res.data.features[0].properties;
      setLocation(`${data.city}, ${data.state}`);
    } catch (error) {
      console.log("API Error:", error);
      setLocation("Location error");
    }
  };

  return (
    <>
      <div
        className="overley w-full h-full fixed duration-500"
        onClick={hidesidemenu}
        style={{
          opacity: toggle ? "1" : "0",
          visibility: toggle ? "visible" : "hidden",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[400px] bg-white h-full absolute duration-[600ms]"
          style={{
            left: toggle ? "0%" : "-100%",
          }}
        ></div>
      </div>

      <header className="p-[10px] shadow-xl  sticky top-0 bg-white z-[999999]">
        <div className="max-w-[1200px] mx-auto flex items-center">
          <div className="w-[100px]">
            <img src="logo.png" className="w-full" alt="" />
          </div>

          {/* ✅ Display fetched location */}
          <div>
            <span className="font-semibold border-b-[px] md:font-bold border-b-[3px] border-[black]">
              {location}
            </span>
            <RxCaretDown
              fontSize={25}
              className="inline text-[.9rem] text-[#ff5200] cursor-pointer"
              onClick={showsidemenu}
            />
          </div>

          <nav className="hidden md:flex list-none gap-1 md:gap-6 ml-auto mr-4 font-semibold">
            {links.map((link, index) => {
              return (
                <ul
                  key={index}
                  className="flex items-center gap-1 cursor-pointer hover:text-[#ff5200] duration-300 p-2"
                >
                  {link.icon}
                  <sup>{link.super}</sup>
                  {link.name}
                  
                </ul>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
