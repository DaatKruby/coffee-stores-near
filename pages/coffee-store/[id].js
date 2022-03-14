import { useRouter } from "next/router"
import Link from "next/link";

import coffeStoresData from '../../data/coffee-stores.json';

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
    return {
        paths: [
            { params: { id: '0' } },
            { params: { id: '1' } },
        ],
        fallback: true,
    }
}

export default function CoffeeStore(props) {

    const router = useRouter();
    const id = router.query.id;

    if (router.isFallback) { return <div>Loading...</div> }

    return (
        <div>{id}
            <Link href="/">
                <a>
                    Back to home
                </a>
            </Link>
            <p>
                {props.coffeeStore.address}
                {props.coffeeStore.name}
            </p>
        </div>
    )
}
