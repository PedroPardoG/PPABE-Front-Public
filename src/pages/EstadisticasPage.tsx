import React, { useEffect, useRef } from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// --- IMPORT THE NEW BANNER IMAGE ---
// Changed from ppabe1.svg to banner2.png
// Make sure the path is correct relative to this component file
import bannerImage from '../assets/banner2.png'; // *** CHANGED HERE ***

// Declare the global variable from nl-mun.js
declare global {
    var statesData: any;
}

const EstadisticasPage = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<L.Map | null>(null); // Ref to store map instance

    // Leaflet Map Initialization Effect
    useEffect(() => {
        // --- Map initialization logic remains the same ---
        if (mapContainerRef.current && !mapInstanceRef.current && typeof window !== 'undefined' && typeof L !== 'undefined') {
            if (typeof statesData === 'undefined') {
                console.error("Leaflet map: 'statesData' is not defined. Check if nl-mun.js is loaded correctly before this component.");
                return;
            }

            const map = L.map(mapContainerRef.current).setView([25.7, -99.3], 8);
            mapInstanceRef.current = map;

            const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            const info = L.control() as L.Control & { update: (props?: any) => void; _div?: HTMLElement };

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };

            info.update = function (props) {
                // Using current date (March 28, 2025) as requested by context, though year is usually sufficient for map titles.
                // Let's stick to year for map data title unless specifically needed otherwise.
                const currentYear = new Date().getFullYear(); // 2025
                const contents = props ? `<b>${props.NOMBRE}</b><br />${props.POB1} beneficiarios` : 'Selecciona un Municipio';
                if (this._div) {
                    // Title inside map info box
                    this._div.innerHTML = `<h4>Nuevo León Beneficiarios ${currentYear}</h4>${contents}`;
                }
            };

            info.addTo(map);

            function getColor(d: number) {
                return d > 500000 ? '#800026' :
                       d > 200000 ? '#BD0026' :
                       d > 100000 ? '#E31A1C' :
                       d > 50000  ? '#FC4E2A' :
                       d > 30000  ? '#FD8D3C' :
                       d > 10000  ? '#FEB24C' :
                       d > 5000   ? '#FED976' :
                                    '#FFEDA0';
            }

            function style(feature: any) {
                return {
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7,
                    fillColor: getColor(feature.properties.POB1)
                };
            }

            let geojsonLayer: L.GeoJSON | null = null;

            function highlightFeature(e: L.LeafletMouseEvent) {
                const layer = e.target as L.Path;
                layer.setStyle({ weight: 5, color: '#666', dashArray: '', fillOpacity: 0.7 });
                layer.bringToFront();
                info.update(layer.feature.properties);
            }

            function resetHighlight(e: L.LeafletMouseEvent) {
                if (geojsonLayer) { geojsonLayer.resetStyle(e.target as L.Path); }
                info.update();
            }

            function zoomToFeature(e: L.LeafletMouseEvent) {
                if (mapInstanceRef.current) { mapInstanceRef.current.fitBounds(e.target.getBounds()); }
            }

            function onEachFeature(feature: any, layer: L.Layer) {
                layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: zoomToFeature });
            }

            geojsonLayer = L.geoJson(statesData, { style, onEachFeature }).addTo(map);

            map.attributionControl.addAttribution('Padrón de Beneficiarios &copy; <a href="http://nuevoleon.gob.mx/">Nuevo León</a>');

            const legend = L.control({position: 'bottomright'});

            legend.onAdd = function (map) {
                const div = L.DomUtil.create('div', 'info legend');
                const grades = [0, 5000, 10000, 30000, 50000, 100000, 200000, 500000];
                const labels = [];
                div.innerHTML += '<b>Beneficiarios</b><br>';
                for (let i = 0; i < grades.length; i++) {
                    let from = grades[i];
                    let to = grades[i + 1];
                    labels.push(`<i style="background:${getColor(from + (from === 0 ? 0 : 1))}"></i> ${from.toLocaleString()}${to ? `&ndash;${to.toLocaleString()}` : '+'}`);
                }
                div.innerHTML += labels.join('<br>');
                return div;
            };

            legend.addTo(map);

            setTimeout(() => {
                if (mapInstanceRef.current) { mapInstanceRef.current.invalidateSize(); }
            }, 100);
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <Box>
            {/* Title (H2) */}
            <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                <Typography variant="h2" component="h2">
                    Estadísticas de Beneficiarios por Municipio
                </Typography>
            </Box>

            {/* --- BANNER IMAGE --- */}
            <Box
                sx={{
                    textAlign: 'center', // Center the image horizontally
                    mb: 4,              // Add margin below the banner
                    px: 2,              // Add some horizontal padding if needed
                }}
            >
                <img
                    src={bannerImage} // Uses the imported bannerImage (now banner2.png)
                    alt="Banner Estadísticas Nuevo León" // *** UPDATED ALT TEXT ***
                    style={{
                        maxWidth: '100%',      // Make image responsive
                        width: '1200px',       // Try to be 1200px wide
                        height: 'auto',        // Maintain aspect ratio
                        maxHeight: '300px',    // Limit max height
                        display: 'block',      // Remove potential extra space below image
                        margin: '0 auto',      // Center image if narrower than container
                        objectFit: 'contain',  // Ensure whole image visible
                    }}
                />
                 {/* Alternative using MUI Box - kept for reference, commented out */}
                {/* <Box
                    component="img"
                    src={bannerImage}
                    alt="Banner Estadísticas Nuevo León" // *** UPDATED ALT TEXT ***
                    sx={{
                        maxWidth: '100%',
                        width: '1200px',
                        height: 'auto',
                        maxHeight: '300px',
                        display: 'block',
                        margin: '0 auto',
                        objectFit: 'contain',
                    }}
                /> */}
            </Box>
            {/* --- END BANNER IMAGE --- */}


            {/* Map Container */}
            <Box sx={{ height: '70vh', width: '95%', margin: 'auto', border: '1px solid #ccc' }}>
                <div
                  id="map"
                  ref={mapContainerRef}
                  style={{ height: '100%', width: '100%' }}
                  className="leaflet-container"
                ></div>
            </Box>
        </Box>
    );
};

export default EstadisticasPage;