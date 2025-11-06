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
import Carousel from 'react-material-ui-carousel';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import bannerImage1 from '../assets/banner1.png';
import bannerImage2 from '../assets/banner2.png';
import bannerImage3 from '../assets/banner3.jpg';
import bannerImage4 from '../assets/banner4.jpg';
import bannerImage5 from '../assets/banner5.png';

// Usamos assets locales procesados por el bundler
const bannerImages = [bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5];

// --- Declaraciones globales/Tipos ---
declare global {
  // statesData debe estar disponible (inyectado por tu script)
  // eslint-disable-next-line no-var
  var statesData: any;
}
interface FeatureProperties {
  NOMBRE: string;
  [key: string]: any;
}
interface GeoJsonFeature {
  type: 'Feature';
  properties: FeatureProperties;
  geometry: any;
}

type ActiveViewType = 'total' | 'gender';

const EstadisticasPage: React.FC = () => {
  // --- Refs ---
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const infoControlRef = useRef<
    (L.Control & { update: (props?: FeatureProperties, year?: string, view?: ActiveViewType) => void; _div?: HTMLElement }) | null
  >(null);
  const legendControlRef = useRef<L.Control | null>(null);

  // --- Estado ---
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [activeView, setActiveView] = useState<ActiveViewType>('total');
  const years = ['2024', '2023', '2022', '2021'];

  // --- Coloreo por cuantiles ---
  const getColor = useCallback((value: number | undefined | null) => {
    const numValue = typeof value === 'number' ? value : 0;
    return numValue > 50000 ? '#800026' :
           numValue > 20000 ? '#BD0026' :
           numValue > 10000 ? '#E31A1C' :
           numValue > 5000  ? '#FC4E2A' :
           numValue > 3000  ? '#FD8D3C' :
           numValue > 1000  ? '#FEB24C' :
           numValue > 500   ? '#FED976' :
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
      fillColor: getColor(totalValue),
    } as L.PathOptions;
  }, [getColor]);

  // --- Actualización de estilos/leyenda ---
  const updateMapData = useCallback((year: string, view: ActiveViewType) => {
    if (!geojsonLayerRef.current || !mapInstanceRef.current || !infoControlRef.current) return;
    const currentMap = mapInstanceRef.current;

    geojsonLayerRef.current.eachLayer((layer) => {
      if (layer instanceof L.Path && (layer as any).feature) {
        const feature = (layer as any).feature as GeoJsonFeature;
        layer.setStyle(styleFeature(feature, year));
      }
    });

    infoControlRef.current.update = function (props?: FeatureProperties) {
      const currentYear = year;
      const currentView = view;

      if (this._div) {
        this._div.innerHTML = '';

        const h4 = document.createElement('h4');
        h4.textContent = 'Nuevo León Beneficiarios';
        this._div.appendChild(h4);

        const dynamicContentContainer = document.createElement('div');

        if (!props) {
          dynamicContentContainer.appendChild(document.createTextNode('Selecciona un Municipio'));
        } else {
          const municipioDiv = document.createElement('div');
          municipioDiv.style.textAlign = 'center';
          const bMunicipio = document.createElement('b');
          bMunicipio.textContent = props.NOMBRE;
          municipioDiv.appendChild(bMunicipio);
          dynamicContentContainer.appendChild(municipioDiv);

          dynamicContentContainer.appendChild(document.createElement('br'));

          if (currentView === 'total') {
            const total = props[currentYear];
            const displayTotal = typeof total === 'number' ? total.toLocaleString() : 'N/D';
            dynamicContentContainer.appendChild(document.createTextNode(`${displayTotal} beneficiarios`));
          } else {
            const hombres = props[currentYear + 'H'];
            const mujeres = props[currentYear + 'M'];
            const displayHombres = typeof hombres === 'number' ? hombres.toLocaleString() : 'N/D';
            const displayMujeres = typeof mujeres === 'number' ? mujeres.toLocaleString() : 'N/D';

            dynamicContentContainer.appendChild(document.createTextNode(`${displayHombres} beneficiarios Hombres`));
            dynamicContentContainer.appendChild(document.createElement('br'));
            dynamicContentContainer.appendChild(document.createTextNode(`${displayMujeres} beneficiarios Mujeres`));
          }

          dynamicContentContainer.appendChild(document.createElement('br'));
          dynamicContentContainer.appendChild(document.createTextNode(`(${currentYear})`));
        }

        this._div.appendChild(dynamicContentContainer);
      }
    };
    infoControlRef.current.update();

    if (legendControlRef.current) {
      currentMap.removeControl(legendControlRef.current);
      legendControlRef.current = null;
    }

    const legend = new L.Control({ position: 'bottomright' }) as L.Control & { _div?: HTMLElement };
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [0, 500, 1000, 3000, 5000, 10000, 20000, 50000];

      const bLegendTitle = document.createElement('b');
      bLegendTitle.textContent = `Beneficiarios (${year})`;
      div.appendChild(bLegendTitle);
      div.appendChild(document.createElement('br'));

      for (let i = 0; i < grades.length; i++) {
        const from = grades[i];
        const to = grades[i + 1];
        const colorValue = from + (from === 0 ? 0 : 1);

        const iElement = document.createElement('i');
        iElement.style.background = getColor(colorValue);
        div.appendChild(iElement);

        const textContent = `${from.toLocaleString()}${to ? `–${to.toLocaleString()}` : '+'}`;
        div.appendChild(document.createTextNode(` ${textContent}`));

        if (i < grades.length - 1) {
          div.appendChild(document.createElement('br'));
        }
      }

      this._div = div;
      return div;
    };
    legend.addTo(currentMap);
    legendControlRef.current = legend;
  }, [getColor, styleFeature]);

  // --- Montaje del mapa (una vez) ---
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && typeof window !== 'undefined' && typeof L !== 'undefined') {
      if (typeof statesData === 'undefined') {
        console.error("Leaflet map: 'statesData' is not defined.");
        return;
      }
      const map = L.map(mapContainerRef.current).setView([25.7, -99.3], 8);
      mapInstanceRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
      }).addTo(map);

      const info = new L.Control({ position: 'topright' }) as L.Control & { _div?: HTMLElement; update: (props?: FeatureProperties) => void };
      info.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info');
        return this._div;
      };
      info.addTo(map);
      infoControlRef.current = info;

      function highlightFeature(e: L.LeafletMouseEvent) {
        const layer = e.target as L.Path;
        layer.setStyle({ weight: 5, color: '#666', dashArray: '', fillOpacity: 0.7 });
        layer.bringToFront();
        if (infoControlRef.current && (layer as any).feature) {
          infoControlRef.current.update((layer as any).feature.properties as FeatureProperties, selectedYear, activeView);
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
      function zoomToFeature(e: L.LeafletMouseEvent) {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.fitBounds((e.target as any).getBounds());
        }
      }
      function onEachFeature(feature: GeoJsonFeature, layer: L.Layer) {
        layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: zoomToFeature });
      }

      geojsonLayerRef.current = L.geoJson(statesData, {
        style: (feature) => styleFeature(feature as GeoJsonFeature, selectedYear),
        onEachFeature,
      }).addTo(map);

      map.attributionControl.addAttribution('Padrón de Beneficiarios &copy; <a href="http://nuevoleon.gob.mx/">Nuevo León</a>');

      setTimeout(() => {
        if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
      }, 100);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al montar

  // --- Re-render de mapa ante cambios de año/vista ---
  useEffect(() => {
    if (mapInstanceRef.current && geojsonLayerRef.current && infoControlRef.current) {
      updateMapData(selectedYear, activeView);
    }
  }, [selectedYear, activeView, updateMapData]);

  // --- Handlers ---
  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value);
  };
  const handleViewChange = (event: SelectChangeEvent<ActiveViewType>) => {
    setActiveView(event.target.value as ActiveViewType);
  };

  // --- Estilo de texto para selects/menu items (puedes moverlo al theme después) ---
  const selectTextStyle = { fontSize: '1.15rem' };

  // --- Render ---
  return (
    <Box>
      {/* Banner */}
      <Box sx={{ width: '70%', mx: 'auto' }}>
        <Carousel
          navButtonsAlwaysVisible={false}
          autoPlay
          indicators
          indicatorIconButtonProps={{ style: { color: 'rgba(0,0,0,0.5)', marginTop: '5px', marginBottom: '20px' } }}
          activeIndicatorIconButtonProps={{ style: { color: '#000000' } }}
        >
          {bannerImages.map((src, idx) => (
            <img key={idx} src={src} alt={`Banner ${idx + 1}`} style={{ width: '100%' }} />
          ))}
        </Carousel>
      </Box>

      {/* Título */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        {/* H2 gobernado por theme (sin sx.fontSize) */}
        <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
          Estadísticas de Beneficiarios por Municipio
        </Typography>
      </Box>

      {/* Controles + Mapa */}
      <Grid container spacing={2} sx={{ px: 2, justifyContent: 'center' }}>
        {/* Selectores */}
        <Grid item xs={12} md={10} lg={8} sx={{ mb: 3 }}>
          <Stack direction="row" spacing={3} justifyContent="center">
            <FormControl sx={{ width: 350 }}>
              <InputLabel id="year-select-label">Año</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                onChange={handleYearChange}
                input={<OutlinedInput label="Año" />}
                sx={selectTextStyle}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year} sx={selectTextStyle}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: 350 }}>
              <InputLabel id="view-select-label">Tipo de Vista</InputLabel>
              <Select
                labelId="view-select-label"
                id="view-select"
                value={activeView}
                onChange={handleViewChange}
                input={<OutlinedInput label="Tipo de Vista" />}
                sx={selectTextStyle}
              >
                <MenuItem value="total" sx={selectTextStyle}>
                  Total de Beneficiarios
                </MenuItem>
                <MenuItem value="gender" sx={selectTextStyle}>
                  Beneficiarios Hombres y Mujeres
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Mapa */}
        <Grid item xs={12} md={10} lg={8}>
          <Box sx={{ height: { xs: '500px', sm: '900px' }, width: '100%', border: '1px solid #ccc' }}>
            <div id="map" ref={mapContainerRef} style={{ height: '100%', width: '100%' }} className="leaflet-container" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EstadisticasPage;
