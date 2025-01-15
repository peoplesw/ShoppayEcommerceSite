import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper';
import styles from "./styles.module.scss"

export default function ProductsSwiper({ header, products, bg }) {
  return (
    <div className={styles.wrapper}>
        {header && <div className={styles.header} style={{ backgroundColor: bg }}>{header}</div>}
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
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
        className="products__swiper"
      >
      {
        products.map((product, i) => (
            <SwiperSlide>
                <div className={styles.product} key={i}>
                    <div className={styles.product__image}>
                        <img src={product.image} alt="" />
                    </div>
                    <div className={styles.product__info}>
                        <h1>{product.name.length > 30 ? `${product.name.slice(0, 30)}...` : product.name}</h1>
                        {
                            product.price && (<span>USD ${product.price}</span>)
                        }
                    </div>
                </div>
            </SwiperSlide>
        ))
      }
      </Swiper>
    </div>
  )
}
