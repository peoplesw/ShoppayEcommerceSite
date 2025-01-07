import Link from "next/link"
import { RiSearch2Line } from "react-icons/ri"
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

export default function Main() {
  const { cart } = useSelector((state) => ({...state}))

  return (
    <div className={styles.main}>
        <div className={styles.main__container}>
            <Link href="/">
                <span className={styles.logo}>
                    <img src="../../logo.png" alt="" />
                </span>
            </Link>
            <div className={styles.search}>
                <input type="text" placeholder="Search..."/>
                <div className={styles.search__icon}>
                    <RiSearch2Line />
                </div>
            </div>
            <Link href="/cart">
            <span className={styles.cart}>
                <BsCart4 />
                <span>{cart.length}</span>
            </span>
            </Link>
        </div>
    </div>
  )
}
