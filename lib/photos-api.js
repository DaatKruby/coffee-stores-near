export const getPlacePhotos = (photo_ref, api_key) => {
    const img_link = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_ref}&key=${api_key}`;
    return img_link;
}