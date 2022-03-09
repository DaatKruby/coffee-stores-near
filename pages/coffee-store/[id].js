import { useRouter } from "next/router"
import Link from "next/link";

export default function CoffeeStore() {

    const router = useRouter();
    const id = router.query.id;

    return (
        <div>{id}
            <Link href="/">
                <a>
                    Back to home
                </a>
            </Link>
        </div>
    )
}
