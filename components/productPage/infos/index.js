import { Rating } from "@mui/material"
import styles from "./styles.module.scss"

export default function Infos({ product }) {
  return (
    <div className={styles.infos}>
        <div className={styles.infos__container}>
            <h1 className={styles.infos__name}>{product.name}</h1>
            <h2 className={styles.infos__sku}>{product.sku}</h2>
            <div className={styles.infos__rating}>
                <Rating 
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                style={{color: "#FACF19"}}
                />
                {product.numReviews}
                {product.numReviews == 1 ? "review" : "reviews"}
            </div>
            <div className={styles.infos__price}></div>
        </div>
    </div>
  )
}
