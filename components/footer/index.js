import NewsLetter from "./NewsLetter"
import Socials from "./Socials"
import Links from "./Links"
import Payment from "./Payment"
import Copyright from "./Copyright"
import styles from "./styles.module.scss"

export default function Footer({ country }) {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__container}>
            <Links />
            <Socials />
            <NewsLetter />
            <Payment />
            <Copyright country={country}/>
        </div>
    </footer>
  )
}