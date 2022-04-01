import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import Banner from '../components/banner'
import Card from '../components/card'

import { useEffect, useState } from 'react/cjs/react.development'

import { fetchCoffeeStores } from '../lib/coffee-stores-fetch';
import { getPlacePhotos } from '../lib/photos-api';
import useTrackLocation from '../hooks/use-track-location'

export async function getStaticProps() {
  const coffeeStoresData = await fetchCoffeeStores("27.07028,-109.44372", process.env.NEXT_PUBLIC_API_KEY_MAPS);

  const data = coffeeStoresData;

  let url_thumbnail_photos = [];

  coffeeStoresData.map(store => {
    if (store.photos === undefined) {
      url_thumbnail_photos = [...url_thumbnail_photos, "https://via.placeholder.com/300.png/09f/fff"];
    } else {
      url_thumbnail_photos = [...url_thumbnail_photos, getPlacePhotos(store.photos[0].photo_reference, process.env.NEXT_PUBLIC_API_KEY_MAPS)];
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
  const { handleTrackLocation, latLong, locationErrorMessage, isFindingUser } = useTrackLocation();

  const [coffeeStores, setCoffeStores] = useState('');
  const [urlPhotos, setUrlPhotos] = useState([]);

  useEffect(async () => {
    if (latLong) {
      try {
      await fetch(`http://localhost:3000/api/coffeeStores?latLong=${latLong}`)
          .then(response => response.json())
          .then(data => {
            setCoffeStores(data);
          })
      } catch (error) {
        console.log({ error });
      }
    }
  }, [latLong]);



  let url_photos = [];
  if(coffeeStores){
    coffeeStores.map(store => {
      if (store.photos === undefined) {
        url_photos = [...url_photos, "https://via.placeholder.com/300.png/09f/fff"];
      } else {
        url_photos = [...url_photos, getPlacePhotos(store.photos[0].photo_reference, process.env.NEXT_PUBLIC_API_KEY_MAPS)];
      }
    });
  }
console.log({url_photos});

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
        <Banner buttonText={isFindingUser ? "Buscando..." : "Encuentra cafés cercanos a ti"} handleOnClick={handleOnBannerBtnClick} />
        {locationErrorMessage && <p>Algo salió mal... {locationErrorMessage}</p>}
        <div className={styles.hero_image} >
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Cafeterias cercanas a ti</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store, index) => {
                return (
                  <Card key={store.place_id} name={store.name} imgUrl={url_photos[index]} href={`/coffee-store/${store.place_id}`} rating={store.rating} className={styles.card} />
                )
              })}
            </div>
          </div>)}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Cafeterias en Navojoa</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store, index) => {
                return (
                  <Card key={store.place_id} name={store.name} imgUrl={props.thumbnail_photos[index]} href={`/coffee-store/${store.place_id}`} rating={store.rating} className={styles.card} />
                )
              })}
            </div>
          </div>)}
      </main>
    </div>
  )
}
