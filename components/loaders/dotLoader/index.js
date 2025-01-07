import FadeLoader from "react-spinners/FadeLoader"
import styles from "./styles.module.scss"

export default function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
        <FadeLoader color="#2f82ff" Loading={loading}/>

    </div>
  )
}
