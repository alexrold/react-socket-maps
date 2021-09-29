import React from 'react';

import { useMapbox } from '../hooks/useMapbox';



// initial Point map
const puntoInicial = {
    lng: -64.416437341,
    lat: 10.278947227,
    zoom: 15.10
}

export const MapasPages = () => {
    const { setRef, cords } = useMapbox(puntoInicial);

    return (
        <>
            <div className="infoWindowsCords" >
                lng: {cords.lng} | lat: {cords.lat} | zoom: {cords.zoom}
            </div>
            <div
                ref={setRef}
                className="mapCntainer"
            />


        </>
    )
}




