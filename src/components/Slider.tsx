"use client"
import { useEffect, useState } from "react";

const slider=[
    {
        text:"The best pizza to share with your family",
        image:"https://img.freepik.com/premium-photo/family-eating-pizza-together-kitchen-with-pizza-table_1293074-132685.jpg"
    },
    {
        text:"Always fresh & always Crispy & always hot",
        image:"https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-modern-traditional-food-sasami-pizza-3d-model-png-image_6651528.png"
    },
    {
        text:"We deliver your order whenever you are in my",
        image:"https://www.pngkey.com/png/full/104-1041213_order-online-pizza-delivery-man-png.png"
    }
]

export default function Slider(){
    const [currentslide, setcurrentslide] = useState(0);
    useEffect(()=>{
       const interval = setInterval(()=>{
        setcurrentslide(prev=>prev==2?0:prev+1)
       },3000)
    },[])

    return(
        <div className="">
       
          <div className="flex " >
            {/* Left Side - Text */}
            <div className="w-1/2  flex items-center justify-center  bg-pink-200 text-red-500 text-center uppercase">
              <div>
                <div className="text-7xl font-semibold ">{slider[currentslide]?.text}</div>
                <button className="px-4 py-2 text-white font-bold bg-red-500 mt-4 rounded">
                  Order
                </button>
              </div>
            </div>
      
            {/* Right Side - Image */}
            <div className="w-1/2 h-[550px] border-l  border-black bg-pink-200">
              <img src={slider[currentslide]?.image} alt="pizza" className="w-full h-full object-cover" />
            </div>
          </div>
       
      </div>
      
      
    )
}