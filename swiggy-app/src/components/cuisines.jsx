import {useState} from 'react'
const cuisines =[
    "Chinese Restaurant Near Me",
    "South Indian Restaurant Near Me",
    "Indian Restaurant Near Me",
    "Kerala Restaurant Near Me",
    "Korean Restaurant Near Me",
    "North Indian Restaurant Near Me",
    "Seafood Restaurant Near Me",
    "Bengali Restaurant Near Me",
    "Punjabi Restaurant Near Me",
    "Italian Restaurant Near Me",
    "Andhra Restaurant Near Me",
    "Rajasthani Restaurant Near Me",
    "Gujarati Restaurant Near Me",
    "Street spicy Food Near Me",
];

export default function Cuisines() {
    const [showmore,setShowmore]=useState(false);
    const visible =showmore ? cuisines : cuisines.slice(0,10);

  return (
    <div className='max-w-[1200px] mx-auto'>
      <h2 className='text-2xl font-bold mb-4 ml-[8px]'>Best cuisines Near me</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 p-2 rounded-md shadow-xl">
        {
            visible.map((item,index)=>(
                <div
                    key={index}><p className='border border-gray-400 rounded-[10px]  px-[40px] py-[20px] font-[700] tracking-tighter text-center text-gray-700 text-[18px]'>{item}</p>
                </div>
            )
            )
        }
        {!showmore && (
        <button onClick={()=>setShowmore(true)}
        className='border rounded-[10px] border-gray-400 font-[800] text-[rgb(255,82,0)] text-[18px]'>
            Show More ▼
          </button>
        )}
      </div>
    </div>
  )
}
