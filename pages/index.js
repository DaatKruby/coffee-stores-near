import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import Banner from '../components/banner'
import Card from '../components/card'

import { fetchCoffeeStores } from '../lib/coffee-stores-fetch';
import { getPlacePhotos } from '../lib/photos-api';
import useTrackLocation from '../hooks/use-track-location'

export async function getStaticProps() {
  const coffeeStoresData = await fetchCoffeeStores(27.07028, -109.44372, process.env.API_KEY_MAPS);

  const data = coffeeStoresData;

  let url_thumbnail_photos = [];

  coffeeStoresData.map(store => {
    if (store.photos === undefined) {
      url_thumbnail_photos = [...url_thumbnail_photos, "https://via.placeholder.com/300.png/09f/fff"];
    } else {
      url_thumbnail_photos = [...url_thumbnail_photos, getPlacePhotos(store.photos[0].photo_reference, process.env.API_KEY_MAPS)];
    }
  });

  return {
    props: {
      coffeeStores: data,
      thumbnail_photos: url_thumbnail_photos,
    },
  }
}

export default function Home(props) {

  const { handleTrackLocation, latLong, locationErrorMessage } = useTrackLocation;

  console.log({ latLong });

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Café Cercano</title>
        <meta name="description" content="Encuentra cafeterias cercanas a ti." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="Encuentra cafés cercanos a ti" handleOnClick={handleOnBannerBtnClick} />
        <div className={styles.hero_image} >
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Cafeterias en Navojoa</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store, index) => {
                return (
                  <Card key={store.place_id} name={store.name} imgUrl={props.thumbnail_photos[index]} href={`/coffee-store/${store.place_id}`} rating={store.rating} className={styles.card} />
                )
              })}
            </div>
          </>)}
      </main>
    </div>
  )
}
