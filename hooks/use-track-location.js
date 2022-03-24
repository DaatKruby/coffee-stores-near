import { useState } from "react/cjs/react.development"

const useTrackLocation = () => {

    const [locationErrorMessage, setLocationErrorMessage] = useState('');
    const [latLong, setLatLong] = useState(' ');

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMessage("")
    }

    const error = () => {
        setLocationErrorMessage("Error intentando encontrarte :(");
    }

    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            setLocationErrorMessage("Tu navegador parece no haberme dado permiso para saber tu posición, tite");
        } else {
            //status.textContent = "Buscandote..."
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }

    return {
        latLong,
        handleTrackLocation,
        locationErrorMessage
    }
}

export default useTrackLocation;