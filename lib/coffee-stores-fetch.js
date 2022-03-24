import axios from "axios";

//must replace lat,long dynamically, also API key for your google cloud project. 
export const fetchCoffeeStores = async (lat, long, apikey) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=15000&type=cafe&keyword=cafe&key=${apikey}`,
        headers: {}
    };

    const response = await axios(config)
        .catch(function (error) {
            console.log(error);
        });
    return response.data.results;
}