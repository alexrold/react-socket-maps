import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState, useCallback } from 'react';



// Api Key
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHJvbGQiLCJhIjoiY2t1NWdnOTNqMDZhdjJ4cGFpMW01MGc2dSJ9.kvknkfDhd8P2AHilb27jgg';


export const useMapbox = (puntoInicial) => {

    //referencia al div del mapa-
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);



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
    }, [puntoInicial]);

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

    return {
        cords,
        setRef
    }
}
