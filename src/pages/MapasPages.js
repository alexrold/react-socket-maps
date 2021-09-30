import React, { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';

// initial Point map
const puntoInicial = {
    lng: -64.416437341,
    lat: 10.278947227,
    zoom: 15.10
}

export const MapasPages = () => {
    const { setRef, cords, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizarPosicion } = useMapbox(puntoInicial);
    const { socket } = useContext(SocketContext);

    //Escuchar marcadores existentes-
    useEffect(() => {
        socket.on('marcadores-activos', (marcadores) => {
            for (const key of Object.keys(marcadores)) {
                agregarMarcador(marcadores[key], key);
            };
        });
    }, [socket, agregarMarcador]);

    // Nuevo marcador emitir-
    useEffect(() => {
        nuevoMarcador$.subscribe(marcador => {
            //nuevo marcador emitir-
            socket.emit('marcador-nuevo', marcador);
        });
    }, [socket, nuevoMarcador$]);

    // Nuevo marcador escuchar-
    useEffect(() => {
        socket.on('marcador-nuevo', (marcador) => {
            agregarMarcador(marcador, marcador.id);
        });
    }, [socket, agregarMarcador]);

    // movimiento marcador-
    useEffect(() => {
        movimientoMarcador$.subscribe(marcador => {
            // movimiento marcador emitir-
            socket.emit('marcador-actualizado', marcador);
        });
    }, [socket, movimientoMarcador$]);

    useEffect(() => {
        socket.on('marcador-actializado', (marcador) => {
            actualizarPosicion(marcador);
        });
    }, [socket, actualizarPosicion]);

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