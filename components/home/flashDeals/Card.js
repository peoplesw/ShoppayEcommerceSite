import React from "react"
import Link from "next/link"
import { MdFlashOn } from "react-icons/md"
import styles from "./styles.module.scss"

export default function FlashCard({ product }) {
  return (
    <div className={styles.card}>
        <div className={styles.card__img}>
            <Link href={product.link}>
                <img src={product.image} alt="" />
            </Link>
            <div className={styles.flash}>
                <MdFlashOn />
                <span>-{product.discount}%</span>
            </div>
        </div>
        <div className={styles.card__price}>
            <span>USD ${(product.price - product.price / product.discount).toFixed(2)}</span>
            <span>-USD ${(product.price - (product.price - product.price / product.discount)).toFixed(2)}</span>
        </div>
        <div className={styles.card__bar}>
            <div className={styles.card__bar__inner} style={{width: "75%"}}></div>
        </div>
        <div className={styles.card__percentage}>{product.sold}%</div>
    </div>
  )
}
