import React from 'react'
import { imageslider } from '../Constant'

const Imagesection = () => {
  return (
    <div>
      {imageslider.map((item, index) => (
        <div key={index} className='cursor-pointer'>
          <img
            className="w-[500px] h-[100px] mt-3 rounded-2xl border-2 border-black shadow-2xl shadow-gray-300 cursor-pointer"
            src={item.image}
            alt={item.title}
          />
        </div>
      ))}
    </div>
  )
}

export default Imagesection
