import axios from "axios";

export const fetchCoffeeStores = async (latLong = "27.07028,-109.44372", apikey) => {
    let config = {
        method: 'get',
        url:
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=15000&type=cafe&keyword=cafe&key=${apikey}`,
        headers: {}
    };

    const response = await axios(config)
        .catch(function (error) {
            console.log({ error });
        });
    return response.data.results;
}