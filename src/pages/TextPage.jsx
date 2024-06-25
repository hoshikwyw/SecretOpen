import React, { useState } from 'react'
import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FcLike } from "react-icons/fc";

import 'swiper/css';
import 'swiper/css/effect-cards';
import '../styles/TextPage.css'
import { NavLink } from 'react-router-dom';

const TextPage = () => {
    const [clicked, setClicked] = useState(false)

    return (
        <div className=' flex min-w-screen min-h-screen justify-center items-center relative'>
            {!clicked && (
                <div className=' relative' >
                    <div >
                        <button className='cursorChange cursor-pointer' onClick={() => setClicked(true)}>
                            <img src="/email.png" alt="" className=' w-64 h-60 emailImg' />
                        </button>

                    </div>
                    <img src="/arrow.gif" alt="" className=' absolute left-[120%] top-[20%]' />
                    <p className=' fixed bottom-0 left-0 p-5 font-semibold tracking-wider text-lg'>Click the Envelope to see what I wanna talk to you ...</p>
                </div>
            )}
            {clicked && (
                <div className="">
                    <Swiper effect={'cards'} grabCursor={true} className="mySwiper" modules={[EffectCards]}>
                        <SwiperSlide><img src="/postCards/openLetter.png" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/1.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/2.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/3.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/4.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/5.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/6.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/7.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/8.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/9.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/10.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/11.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/12.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/postCards/13.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><NavLink to={'/drag'}>Click and Go To Next Slide</NavLink></SwiperSlide>
                    </Swiper>
                </div>
            )}
        </div>
    )
}

export default TextPage
