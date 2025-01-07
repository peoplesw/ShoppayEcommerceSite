import styles from "./styles.module.scss"
import MainSwiper from "./Swiper"
import Offers from "./Offers"
import Menu from "./Menu"
import User from "./User"
import Header from "./Header"

export default function Main() {
  return (
    <div className={styles.main}>
        <Header />
        <Menu />
        <MainSwiper />
        <Offers />
        <User />
    </div>
  )
}
