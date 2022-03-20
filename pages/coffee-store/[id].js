import { useRouter } from "next/router"
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from 'classNames';

import { fetchCoffeeStores } from '../../lib/coffee-stores-fetch';

import styles from '../../styles/coffeStore.module.css';

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const coffeeStoresFetch = await fetchCoffeeStores(27.07028, -109.44372, process.env.API_KEY_MAPS);

    return {
        props: {
            coffeeStore: coffeeStoresFetch.find(coffeeStore => {
                return coffeeStore.place_id.toString() === params.id;
            })
        }
    }
}

export async function getStaticPaths() {
    const coffeeStoresFetch = await fetchCoffeeStores(27.07028, -109.44372, process.env.API_KEY_MAPS);
    const paths = coffeeStoresFetch.map(coffeStore => {
        return {
            params: {
                id: coffeStore.place_id.toString(),
            }
        }
    })
    return {
        paths,
        fallback: true,
    }
}

const handleUpVoteButton = () => {
    console.log("Working putito");
}

export default function CoffeeStore(props) {

    const router = useRouter();
    const id = router.query.id;


    if (router.isFallback) { return <div>Loading...</div> }

    const { name, vicinity, neighbourhood, imgUrl, width, height } = props.coffeeStore;

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>
                                Back to home
                            </a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>

                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/location.svg" width="24" height="24" />
                        <p className={styles.text}>{vicinity}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" />
                        <p className={styles.text}>1</p>
                    </div>

                    <button className={styles.upVoteButton} onClick={handleUpVoteButton}>Dar estrellita!</button>
                </div>
            </div>
        </div>
    )
}
