import React, { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';

// initial Point map
const puntoInicial = {
    lng: -64.416437341,
    lat: 10.278947227,
    zoom: 15.10
}

export const MapasPages = () => {
    const { setRef, cords, nuevoMarcador$, movimientoMarcador$ } = useMapbox(puntoInicial);

    // Nuevo marcador-
    useEffect(() => {
        nuevoMarcador$.subscribe(marcador => {
            //TODO nuevo marcador emitir-
            console.log(marcador);
        });
    }, [nuevoMarcador$]);

    // movimiento marcador-
    useEffect(() => {
        movimientoMarcador$.subscribe(marcador => {
            //TODO movimiento marcador emitir-
            console.log(marcador);
        });
    }, [movimientoMarcador$]);

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