import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cls from 'classnames'

import styles from '../styles/Card.module.css';

export default function Card(props) {
    const { imgUrl, name, rating } = props;

    return (
        <Link href={props.href}>
            <a className={styles.cardLink}>
                <div className={cls("glass", styles.container)}>
                    <div className={styles.cardHeaderWrapper}>
                        <h2 className={styles.cardHeader}>
                            {name}
                        </h2>
                    </div>
                    <div className={styles.cardImageWrapper}>
                        <Image
                            src={imgUrl}
                            className={styles.cardImage}
                            width={260}
                            height={160} />
                    </div>
                </div>
            </a>
        </Link>
    )
}
