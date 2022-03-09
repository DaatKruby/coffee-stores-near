import { useRouter } from "next/router"
import Head from "next/head";

export default function namePage() {

    const router = useRouter();
    console.log(router);

    const id = router.query.name;

    return (
        <>
            <Head>
                <title>
                    {id}
                </title>
            </Head>
        </>
    )
}
