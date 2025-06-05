import { useState, useEffect } from "react";
import Imagesection from "../Routes/Imagesection";


const images = [
  "https://media.istockphoto.com/id/1448506100/photo/male-hotel-receptionist-assisting-female-guest.jpg?s=2048x2048&w=is&k=20&c=_wv4i2JxCaC0lCzpXSV9jmWFNx7KaOE7fUPh9AoQNOo=",
  "https://media.istockphoto.com/id/457982645/photo/modern-bedroom.jpg?s=2048x2048&w=is&k=20&c=QmX7emharBZKIbv2XARHhm-OJaLF65pB1SAvMkEKpN8=",
  "https://media.istockphoto.com/id/146765403/photo/a-luxurious-florida-beach-hotel-during-sunrise.jpg?s=1024x1024&w=is&k=20&c=MCD0tnOByKAVQj3JfYDo2yy6jBLkO0_sfy2rW5X7M1Y=",
  "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=2048x2048&w=is&k=20&c=hKhLRUpl6c1p_6CdUHRLTAR-UEBdR6vml7M5AtCSCL4=",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-row gap-x-5 p-5 w-full">

    
    <div className="slider-container border-2 border-black h-[478px] rounded-2xl shadow-gray-400 shadow-2xl">
      <img src={images[currentIndex]} alt="Slider" className="slider-image  w-[2000px] h-[475px] rounded-xl shadow-gray-300 shadow-2xl" />
    </div>
<div className="mt-2">
  <Imagesection/>
</div>
    </div>
  );
};

export default Slider;
