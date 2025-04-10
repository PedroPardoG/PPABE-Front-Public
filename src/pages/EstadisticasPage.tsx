import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    OutlinedInput,
    Stack,
} from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import bannerImage from '../assets/banner2.png';

// ... (declaraciones globales, interfaces - sin cambios) ...
declare global {
    var statesData: any;
}
interface FeatureProperties {
    NOMBRE: string;
    [key: string]: any;
}
interface GeoJsonFeature {
    type: "Feature";
    properties: FeatureProperties;
    geometry: any;
}
// ... (Fin de declaraciones sin cambios) ...

type ActiveViewType = 'total' | 'gender';

const EstadisticasPage = () => {
    // --- Refs (sin cambios) ---
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
    const infoControlRef = useRef<L.Control & { update: (props?: FeatureProperties, year?: string, view?: ActiveViewType) => void; _div?: HTMLElement } | null>(null);
    const legendControlRef = useRef<L.Control | null>(null);

    // --- Estados (sin cambios) ---
    const [selectedYear, setSelectedYear] = useState<string>('2024');
    const [activeView, setActiveView] = useState<ActiveViewType>('total');
    const years = ['2024', '2023', '2022', '2021'];

    // --- Funciones de Estilo y Color (sin cambios) ---
    const getColor = useCallback((value: number | undefined | null) => {
        const numValue = typeof value === 'number' ? value : 0;
        return numValue > 50000  ? '#800026' :
               numValue > 20000  ? '#BD0026' :
               numValue > 10000  ? '#E31A1C' :
               numValue > 5000   ? '#FC4E2A' :
               numValue > 3000   ? '#FD8D3C' :
               numValue > 1000   ? '#FEB24C' :
               numValue > 500    ? '#FED976' :
                                   '#FFEDA0';
    }, []);

    const styleFeature = useCallback((feature: GeoJsonFeature | undefined, year: string) => {
        const totalValue = feature?.properties?.[year];
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(totalValue)
        };
    }, [getColor]);

    // --- Función para actualizar mapa y leyenda (sin cambios) ---
    const updateMapData = useCallback((year: string, view: ActiveViewType) => {
       // ... (igual que antes) ...
        if (!geojsonLayerRef.current || !mapInstanceRef.current || !infoControlRef.current) return;
        const currentMap = mapInstanceRef.current;

        geojsonLayerRef.current.eachLayer((layer) => {
            if (layer instanceof L.Path && layer.feature) {
                 const feature = layer.feature as GeoJsonFeature;
                 layer.setStyle(styleFeature(feature, year));
            }
        });

        infoControlRef.current.update = function (props?: FeatureProperties) {
            const currentYear = year;
            const currentView = view;
            let contents = 'Selecciona un Municipio';

            const yearLine = `<br />(${currentYear})</div>`;

            if (props) {
                const municipio = `<b><div style="text-align: center;">${props.NOMBRE}</b><br />`;
                if (currentView === 'total') {
                    const total = props[currentYear];
                    const displayTotal = typeof total === 'number' ? total.toLocaleString() : 'N/D';
                    contents = `${municipio}${displayTotal} beneficiarios`;
                } else {
                    const hombres = props[currentYear + 'H'];
                    const mujeres = props[currentYear + 'M'];
                    const displayHombres = typeof hombres === 'number' ? hombres.toLocaleString() : 'N/D';
                    const displayMujeres = typeof mujeres === 'number' ? mujeres.toLocaleString() : 'N/D';
                    contents = `${municipio}${displayHombres} beneficiarios Hombres<br />${displayMujeres} beneficiarios Mujeres`;
                }
                contents += yearLine;
            }

            if (this._div) {
                this._div.innerHTML = `<h4>Nuevo León Beneficiarios</h4>${contents}`;
            }
        };
        infoControlRef.current.update();

        if (legendControlRef.current) {
            currentMap.removeControl(legendControlRef.current);
            legendControlRef.current = null;
        }
        const legend = L.control({ position: 'bottomright' }) as L.Control & {_div?: HTMLElement};
        legend.onAdd = function (map) {
             const div = L.DomUtil.create('div', 'info legend');
             const grades = [0, 500, 1000, 3000, 5000, 10000, 20000, 50000];
             const labels = [];
             const currentGetColor = getColor;
             div.innerHTML += `<b>Beneficiarios (${year})</b><br>`;
             for (let i = 0; i < grades.length; i++) {
                 let from = grades[i];
                 let to = grades[i + 1];
                 const colorValue = from + (from === 0 ? 0 : 1);
                 labels.push(`<i style="background:${currentGetColor(colorValue)}"></i> ${from.toLocaleString()}${to ? `&ndash;${to.toLocaleString()}` : '+'}`);
             }
             div.innerHTML += labels.join('<br>');
             this._div = div;
             return div;
        };
        legend.addTo(currentMap);
        legendControlRef.current = legend;

    }, [getColor, styleFeature]);

    // --- Efecto de Inicialización (sin cambios lógicos) ---
     useEffect(() => {
        // ... (igual que antes) ...
         if (mapContainerRef.current && !mapInstanceRef.current && typeof window !== 'undefined' && typeof L !== 'undefined') {
            if (typeof statesData === 'undefined') {
                console.error("Leaflet map: 'statesData' is not defined.");
                return;
            }
            const map = L.map(mapContainerRef.current).setView([25.7, -99.3], 8);
            mapInstanceRef.current = map;
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(map);

            const info = L.control({ position: 'topright' }) as L.Control & { /* ... tipo ... */ };
            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                // NO se llama a this.update() aquí
                return this._div;
            };
            info.addTo(map);
            infoControlRef.current = info;
            
             function highlightFeature(e: L.LeafletMouseEvent) {
                const layer = e.target as L.Path;
                layer.setStyle({ weight: 5, color: '#666', dashArray: '', fillOpacity: 0.7 });
                layer.bringToFront();
                if (infoControlRef.current && layer.feature) {
                     infoControlRef.current.update(layer.feature.properties as FeatureProperties, selectedYear, activeView);
                }
            }
            function resetHighlight(e: L.LeafletMouseEvent) {
                if (geojsonLayerRef.current) {
                     (geojsonLayerRef.current as L.GeoJSON).resetStyle(e.target as L.Path);
                 }
                if (infoControlRef.current) {
                     infoControlRef.current.update(undefined, selectedYear, activeView);
                }
            }
            function zoomToFeature(e: L.LeafletMouseEvent) { if (mapInstanceRef.current) { mapInstanceRef.current.fitBounds(e.target.getBounds()); } }
            function onEachFeature(feature: GeoJsonFeature, layer: L.Layer) { layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: zoomToFeature }); }

            geojsonLayerRef.current = L.geoJson(statesData, {
                style: (feature) => styleFeature(feature as GeoJsonFeature, selectedYear),
                onEachFeature: onEachFeature
            }).addTo(map);

            map.attributionControl.addAttribution('Padrón de Beneficiarios &copy; <a href="http://nuevoleon.gob.mx/">Nuevo León</a>');

            setTimeout(() => { if (mapInstanceRef.current) { mapInstanceRef.current.invalidateSize(); } }, 100);
        }
        return () => {
             if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                geojsonLayerRef.current = null;
                infoControlRef.current = null;
                legendControlRef.current = null;
            }
        };
     }, []); // <-- Dependencias vacías intencionalmente para ejecutar solo al montar


    // --- Efecto para ACTUALIZAR el mapa cuando cambian año o vista (sin cambios) ---
    useEffect(() => {
        if (mapInstanceRef.current && geojsonLayerRef.current && infoControlRef.current) {
            updateMapData(selectedYear, activeView);
        }
        // OJO: No incluir styleFeature ni getColor aquí si no cambian después de montar
    }, [selectedYear, activeView, updateMapData]);

    // --- Handlers para los Selects separados (sin cambios) ---
    const handleYearChange = (event: SelectChangeEvent<string>) => {
        setSelectedYear(event.target.value);
    };

    const handleViewChange = (event: SelectChangeEvent<ActiveViewType>) => {
        setActiveView(event.target.value as ActiveViewType);
    };

    // --- Estilo común para el texto de los selects y menu items ---
    const selectTextStyle = { fontSize: '1.15rem' }; // Ajusta este valor si necesitas más/menos tamaño

    // --- Renderizado del Componente ---
    return (
        <Box>
            {/* Banner */}
            <Box sx={{ textAlign: 'center', mt: 2, mb: 2, px: 2, }}>
                 <img src={bannerImage} alt="Banner Estadísticas Nuevo León" style={{ maxWidth: '100%', width: '1200px', height: 'auto', maxHeight: '300px', display: 'block', margin: '0 auto', objectFit: 'contain', }} />
             </Box>

             {/* Título General */}
             <Box sx={{ textAlign: 'center', mb: 4 }}>
                 <Typography variant="h2" component="h2"> Estadísticas de Beneficiarios por Municipio </Typography>
             </Box>

            {/* Contenedor Principal */}
            <Grid container spacing={2} sx={{ px: 2, justifyContent: 'center' }}>

                 {/* Fila para los Selectores */}
                <Grid item xs={12} md={10} lg={8} sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        {/* Selector de Año */}
                        <FormControl sx={{ width: 350 }}>
                            <InputLabel id="year-select-label">Año</InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                value={selectedYear}
                                onChange={handleYearChange}
                                input={<OutlinedInput label="Año" />}
                                // Aplicar estilo al texto del select
                                sx={selectTextStyle}
                            >
                                {years.map((year) => (
                                    <MenuItem
                                        key={year}
                                        value={year}
                                        // Aplicar estilo al texto del menu item
                                        sx={selectTextStyle}
                                    >
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Selector de Tipo de Vista */}
                        <FormControl sx={{ width: 350 }}>
                            <InputLabel id="view-select-label">Tipo de Vista</InputLabel>
                            <Select
                                labelId="view-select-label"
                                id="view-select"
                                value={activeView}
                                onChange={handleViewChange}
                                input={<OutlinedInput label="Tipo de Vista" />}
                                // Aplicar estilo al texto del select
                                sx={selectTextStyle}
                            >
                                <MenuItem
                                    value="total"
                                    // Aplicar estilo al texto del menu item
                                    sx={selectTextStyle}
                                >
                                    Total de Beneficiarios
                                </MenuItem>
                                <MenuItem
                                    value="gender"
                                    // Aplicar estilo al texto del menu item
                                    sx={selectTextStyle}
                                >
                                    Beneficiarios Hombres y Mujeres
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid>

                {/* Fila para el Mapa */}
                <Grid item xs={12} md={10} lg={8} >
                    <Box sx={{ height: '70vh', width: '100%', border: '1px solid #ccc' }}>
                        <div id="map" ref={mapContainerRef} style={{ height: '100%', width: '100%' }} className="leaflet-container" ></div>
                    </Box>
                </Grid>

            </Grid> {/* Fin del Grid container */}
        </Box>
    );
};

export default EstadisticasPage;