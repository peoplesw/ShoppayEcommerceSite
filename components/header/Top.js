import { useState } from "react"
import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri"
import { useSession } from "next-auth/react"
import Link from "next/link"
import UserMenu from "./UserMenu"
import styles from "./styles.module.scss"

export default function Top({ country }) {
    const {data: session} = useSession()
    const [visible, setVisible] = useState(false)

  return (
    <div className={styles.top}>
        <div className={styles.top__container}>
            <div></div>
            <ul className={styles.top__list}>
                <li className={styles.li}>
                    <img 
                        src={country?.flag}
                        alt="" 
                    />
                    <span> {country?.name}  / usd</span>
                </li>
                <li className={styles.li}>
                    <MdOutlineSecurity />
                    <span>Buyer Protection</span>
                </li>
                <li className={styles.li}>
                    <span>Customer Service</span>
                </li>
                <li className={styles.li}>
                    <span>Help</span>
                </li>
                <li className={styles.li}>
                    <BsSuitHeart />
                    <Link href="/profile/wishlist">
                        <span>Wishlist</span>
                    </ Link>
                </li>
            <li className={styles.li}>
            {
                session ?        
                (<li>
                    <div onClick={() => setVisible(!visible)} className={styles.flex}>
                        <img src={session.user.image} alt="" />
                        <span>{session.user.name}</span>
                        <RiArrowDropDownFill />
                    </div>
                </li>)
                : 
                 (<li className={styles.li}>
                    <div className={styles.flex} onClick={() => setVisible(!visible)}>
                        <RiAccountPinCircleLine />
                        <span>Account</span>
                        <RiArrowDropDownFill />
                    </div>
                </li>)
            }
            { visible && <UserMenu session={session}/> }
            </li>
            </ul>
        </div>
    </div>
  )
}
