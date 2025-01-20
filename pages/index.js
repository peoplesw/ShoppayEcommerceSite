import React from "react"
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from "../components/header"
import Footer from "../components/footer"
import Main from "../components/home/main"
import FlashDeals from "../components/home/flashDeals"
import Category from "../components/home/category"
import ProductsSwiper from "../components/productsSwiper"
import { women_dresses, women_shoes, women_accessories, women_swiper, gamingSwiper, homeImprovSwiper } from "../data/home"
import useMediaQuery from "react-responsive"
import { useSession, signIn, signOut } from "next-auth/react"
import db from "../utils/db"
import Product from "../models/Product"
import axios from "axios"
import ProductCard from "../components/productCard"

export default function Home({ country, products }) {
  console.log("products", products)
  const {data: session} = useSession()
  const isMedium = useMediaQuery({ query: "(max-width:850px)" })
  console.log("isMedium", isMedium)
  return (
    <>
      <Header country={country}/>
        <div className={styles.home}>
          <div className={styles.container}>
            <Main />
            <FlashDeals />
            <div className={styles.home__category}>
              <Category header="Dresses" products={women_dresses} background="#5a31f4"/>
              <Category header="Shoes / High Heels" products={women_shoes} background="#3c811f"/>
              <Category header="Accessories" products={women_accessories} background="#000"/>
            </div>
            <ProductsSwiper header="Women's appearal" products={women_swiper} bg="#2f82ff"/>
            <ProductsSwiper header="For Gamers" products={gamingSwiper} bg="#f15f6f"/>
            <ProductsSwiper header="House Improvements" products={homeImprovSwiper} bg="#3c811f"/>
            <div className={styles.products}>
              {
                products.map((product) => (
                  <ProductCard product={product} key={product._id}/>
                ))
              }
            </div>
          </div>
        </div>
      <Footer country={country}/>
    </>
  )
}

export async function getServerSideProps() {
  db.connectDb()
  // -1 means show the most recent posts first
  let products = await Product.find().sort({ createdAt: -1 }).lean()
  console.log(products)
  let data = await axios.get("https://api.ipregistry.co/?key=ira_2G8om46NeCLzFsq4xPfggKQyQnoZiM2KWaNW")
              .then((res) => {
                return res.data.location.country
              }).catch((error) => {
                console.log(error)
              })
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: {name: data.name, flag: data.flag.emojitwo}
      country: {name: "United States", flag: "../../images/USFlag.jpg"}
    }
  }
}