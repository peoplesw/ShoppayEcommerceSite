import { MdFlashOn } from "react-icons/md"
import Countdown from "../../countdown"
import { flashDealsArray } from "../../../data/home"
import FlashCard from "./Card"
import styles from "./styles.module.scss"

import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper';

export default function FlashDeals() {

    return (
    <div className={styles.flashDeals}>
        <div className={styles.flashDeals__header}>
            <h1>
                FLASH SALE
                <MdFlashOn />
            </h1>
            <Countdown />
        </div>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
        breakpoints={{
            450: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            920: {
                slidesPerView: 4,
            },
            1189: {
                slidesPerView: 5,
            },
            1350: {
                slidesPerView: 6,
            },
        }}
      >
        <div className={styles.flashDeals__list}>
            {
                flashDealsArray.map((product, i) => (
                    <SwiperSlide>
                        <FlashCard product={product} key={i}/>
                    </SwiperSlide>
                ))
            }
        </div>
      </Swiper>
    </div>
  )
}
