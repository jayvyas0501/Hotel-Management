import React from 'react'

const image = (image,title) => {
  return (
    <div>
        {/* <img  className="w-[200px] h-[100px] mt-2 rounded-2xl border-2 border-black shadow-2xl shadow-gray-300" src="https://media.istockphoto.com/id/457982645/photo/modern-bedroom.jpg?s=2048x2048&w=is&k=20&c=QmX7emharBZKIbv2XARHhm-OJaLF65pB1SAvMkEKpN8=" alt="" />
        <img className="w-[200px] h-[100px] mt-5 rounded-2xl border-2 border-black shadow-2xl shadow-gray-300"  src="https://media.istockphoto.com/id/146765403/photo/a-luxurious-florida-beach-hotel-during-sunrise.jpg?s=1024x1024&w=is&k=20&c=MCD0tnOByKAVQj3JfYDo2yy6jBLkO0_sfy2rW5X7M1Y=" alt="" />
        <img  className="w-[200px] h-[100px] mt-5 rounded-2xl border-2 border-black shadow-2xl shadow-gray-300" src="https://media.istockphoto.com/id/1448506100/photo/male-hotel-receptionist-assisting-female-guest.jpg?s=2048x2048&w=is&k=20&c=_wv4i2JxCaC0lCzpXSV9jmWFNx7KaOE7fUPh9AoQNOo=" alt="" />
        <img className="w-[200px] h-[100px] mt-5 rounded-2xl border-2 border-black shadow-2xl shadow-gray-300"  src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=2048x2048&w=is&k=20&c=hKhLRUpl6c1p_6CdUHRLTAR-UEBdR6vml7M5AtCSCL4=" alt="" />
    */}
     <img className="w-[200px] h-[100px] mt-5 gap-5 rounded-2xl border-2 border-black shadow-2xl shadow-gray-300"  src={image} alt={title} />
    </div>
  )
}

export default image
