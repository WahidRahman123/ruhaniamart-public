import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';


function Hero() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/banner`);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);



  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
  };

  return (
    <>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((banner, index) => (
            <div key={index}>
              <div className='mx-2 px-4 sm:px-0 flex justify-center items-center '>
                <img src={banner.image.url} alt={banner.image.altText}  className='sm:w-[980px] sm:h-[443px] mx-auto sm:mt-[24px] mt-[10px] border-1 border-borderColor rounded-[25px] w-[448px] h-[240px] ' />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        // <p className='text-center text-[#404040] text-2xl rounded mt-2 drop-shadow-sm font-bold'></p>
        <p></p>
      )}



    </>

  )
}

export default Hero
