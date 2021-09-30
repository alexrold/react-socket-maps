import { useEffect, useRef, useState, useCallback } from 'react';

import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

// Api Key
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHJvbGQiLCJhIjoiY2t1NWdnOTNqMDZhdjJ4cGFpMW01MGc2dSJ9.kvknkfDhd8P2AHilb27jgg';

export const useMapbox = (puntoInicial) => {

    //referencia al div del mapa-
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

    //referencia  a los marcadores-
    const marcadores = useRef({});

    // Observar marcadores de Rxjs-
    const movimientoMarcador = useRef(new Subject());
    const nuevoMarcador = useRef(new Subject());

    // Mapa y cords-
    const mapa = useRef();
    const [cords, setCords] = useState(puntoInicial);

    //agregar marcadores-
    const agregarMarcador = useCallback((e, id) => {

        const { lng, lat } = e.lngLat || e;
        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4(); // si no viene el id lo genera-

        marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true);

        //asignar el obj a marcadores-
        marcadores.current[marker.id] = marker;

        // -Si marcador tiene un ID no emitir-
        if (!id) {
            nuevoMarcador.current.next({
                id: marker.id,
                lng,
                lat
            });
        }

        //escuchar movimientos del marcador-
        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();

            //Emitir los cambios del marcador- 
            movimientoMarcador.current.next({ id, lng, lat });
        });
    }, []);

    // actualizar posicion del marcador en el mapa
    const actualizarPosicion = useCallback(({ id, lng, lat }) => {
        marcadores.current[id].setLngLat([lng, lat]);
    }, []);


    // init map in initial cords-
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });
        mapa.current = map;
    }, [puntoInicial]);

    // Cuando se mueve el mapa-
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

    // llama a la funcion agregarMarcadores pasando el evento click => (e)-
    useEffect(() => {
        mapa.current?.on('click', agregarMarcador);
    }, [agregarMarcador]);

    return {
        actualizarPosicion,
        agregarMarcador,
        cords,
        marcadores,
        nuevoMarcador$: nuevoMarcador.current,
        movimientoMarcador$: movimientoMarcador.current,
        setRef
    }
}
