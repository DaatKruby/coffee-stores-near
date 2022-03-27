// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  const { latLong } = req.query;
  console.log(latLong);
  //ISSUE: apikey must be hardcoded (?)
  const fetchCoffeeStores = async (latLong = "27.07028,-109.44372", apikey) => {
    let config = {
      method: 'get',
      url:
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?
        location=${latLong}&
        radius=15000&
        type=cafe&
        keyword=cafe&
        key=AIzaSyCjJGTpFj9YfUrRsX2mDlniMfCEf9oF_9E`,
      headers: {}
    };

    const response = await axios(config)
      .catch(function (error) {
        console.log({ error });
      });
    return response.data.results;
  }

  const results = await fetchCoffeeStores(latLong);
  res.status(200).json(results)
}



