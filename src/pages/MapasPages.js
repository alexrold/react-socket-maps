import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

//*  const
// Api Key
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHJvbGQiLCJhIjoiY2t1NWdnOTNqMDZhdjJ4cGFpMW01MGc2dSJ9.kvknkfDhd8P2AHilb27jgg';
// initial Point map
const puntoInicial = {
    lng: -64.416437341,
    lat: 10.278947227,
    zoom: 15.10
}

export const MapasPages = () => {

    const mapDiv = useRef();
    //const [mapa, setMapa] = useState()
    const mapa = useRef();
    const [cords, setCords] = useState(puntoInicial);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });
        mapa.current = map;
    }, []);

    // Cuando se mueve el mapa
    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter();
            setCords({
                lng: lng.toFixed(9),
                lat: lat.toFixed(9),
                zoom: mapa.current.getZoom().toFixed(2)
            });
        });
    }, []);

    return (
        <>
            <div className="infoWindowsCords" >
                lng: {cords.lng} | lat: {cords.lat} | zoom: {cords.zoom}
            </div>
            <div
                ref={mapDiv}
                className="mapCntainer"
            />


        </>
    )
}




