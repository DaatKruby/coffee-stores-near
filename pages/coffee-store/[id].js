import { useRouter } from "next/router"
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from 'classNames';

import coffeStoresData from '../../data/coffee-stores.json';

import styles from '../../styles/coffeStore.module.css';

export function getStaticProps(staticProps) {
    const params = staticProps.params;

    return {
        props: {
            coffeeStore: coffeStoresData.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id;
            })
        }
    }
}

export function getStaticPaths() {
    const paths = coffeStoresData.map(coffeStore => {
        return {
            params: {
                id: coffeStore.id.toString(),
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

    const { name, address, neighbourhood, imgUrl, width, height } = props.coffeeStore;

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
                    <Image src={imgUrl} width={width} height={height} className={styles.storeImg} alt={name}></Image>
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/location.svg" width="24" height="24" />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/marker.svg" width="24" height="24" />
                        <p className={styles.text}>{neighbourhood}</p>
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
