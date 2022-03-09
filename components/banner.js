
import styles from '../styles/Banner.module.css';

export default function banner(props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Cafés</span>
                <span className={styles.title2}>Cercanos</span>
            </h1>
            <p className={styles.subtitle}>Descubre cafés cercanos a ti.</p>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={props.handleOnClick}>{props.buttonText}</button>
            </div>
        </div>
    )
}
