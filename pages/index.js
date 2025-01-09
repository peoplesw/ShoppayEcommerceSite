import React from "react"
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from "../components/header"
import Footer from "../components/footer"
import Main from "../components/home/main"
import FlashDeals from "../components/home/flashDeals"
import Category from "../components/home/category"
import { women_dresses, women_shoes, women_accessories } from "../data/home"
import useMediaQuery from "react-responsive"
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios"

export default function Home({ country }) {
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
          </div>
        </div>
      <Footer country={country}/>
    </>
  )
}

export async function getServerSideProps() {
  let data = await axios.get("https://api.ipregistry.co/?key=ira_2G8om46NeCLzFsq4xPfggKQyQnoZiM2KWaNW")
              .then((res) => {
                return res.data.location.country
              }).catch((error) => {
                console.log(error)
              })
  return {
    props: {
      // country: {name: data.name, flag: data.flag.emojitwo}
      country: {name: "United States", flag: "../../images/USFlag.jpg"}
    }
  }
}