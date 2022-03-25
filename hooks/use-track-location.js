import { useState } from "react/cjs/react.development"

const useTrackLocation = () => {

    const [locationErrorMessage, setLocationErrorMessage] = useState('');
    const [latLong, setLatLong] = useState(' ');
    const [isFindingUser, setIsFindingUser] = useState(false);

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMessage("")
        setIsFindingUser(false);
    }

    const error = () => {
        setLocationErrorMessage("Error intentando encontrarte :(");
        setIsFindingUser(false);
    }

    const handleTrackLocation = () => {
        setIsFindingUser(true);
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
        locationErrorMessage,
        isFindingUser
    }
}

export default useTrackLocation;