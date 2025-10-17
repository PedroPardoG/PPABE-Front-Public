import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Grid,
  Typography,
  IconButton,
  Toolbar,
  styled,
  CircularProgress,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import Carousel from 'react-material-ui-carousel';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import { Link } from 'react-router-dom';
import { menuItems } from '../components/Header';
import { 
  useAniosDisponibles, 
  useMesesPorAnio, 
  useDependenciasPorFiltros, 
  useProgramasPorFiltrosNuevo, 
  useComponentesPorFiltrosNuevo,
  useBeneficiariosPorFiltrosNuevo 
} from '../hooks/useApi';
import { apiClient } from '../services/api';
import MUIXDataGrid from '../layout/MUIXDataGrid';

// --- Banner Images (Demo Mode) ---
import bannerImage1 from '../assets/banner1.png';
import bannerImage2 from '../assets/banner2.png';
import bannerImage3 from '../assets/banner3.jpg';
import bannerImage4 from '../assets/banner4.jpg';
import bannerImage5 from '../assets/banner5.png';

const bannerImages = [bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5];
const BANNER_COUNT = bannerImages.length;
const BANNER_INTERVAL = 5000; // 5s

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',
  height: '300px',
  margin: '0 auto',
  overflow: 'hidden',
  borderRadius: '8px',
  marginBottom: theme.spacing(4),
  backgroundColor: '#eee',
}));

const CarouselImage = styled('img')<{ isActive: boolean; isExiting: boolean }>(({ isActive, isExiting }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block',
  opacity: isActive ? 1 : 0,
  transform: isExiting ? 'translateX(-100%)' : (isActive ? 'translateX(0)' : 'translateX(100%)'),
  transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
}));

// Definición de columnas para la DataGrid
const beneficiariosColumns: GridColDef[] = [
  {
    field: "beneficiario",
    headerName: "Beneficiario",
    flex: 2,
    minWidth: 200,
    renderCell: (params) => (
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500,
          color: '#333',
          fontSize: '0.95rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          py: 1
        }}
      >
        {params.value || 'N/A'}
      </Typography>
    )
  },
  {
    field: "programa",
    headerName: "Programa",
    flex: 1.8,
    minWidth: 180,
    renderCell: (params) => (
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500,
          color: '#333',
          fontSize: '0.95rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          py: 1
        }}
      >
        {params.value || 'N/A'}
      </Typography>
    )
  },
  {
    field: "subprograma",
    headerName: "Componente",
    flex: 1.8,
    minWidth: 180,
    renderCell: (params) => (
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500,
          color: '#333',
          fontSize: '0.95rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          py: 1
        }}
      >
        {params.value || 'N/A'}
      </Typography>
    )
  },
  {
    field: "dependencia",
    headerName: "Dependencia",
    flex: 2.5,
    minWidth: 250,
    renderCell: (params) => (
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500,
          color: '#333',
          fontSize: '0.95rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          py: 1
        }}
      >
        {params.value || 'N/A'}
      </Typography>
    )
  },
  {
    field: "apoyo",
    headerName: "Apoyo",
    flex: 1.2,
    minWidth: 120,
    renderCell: (params) => (
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500,
          color: '#333',
          fontSize: '0.95rem',
          py: 1
        }}
      >
        {typeof params.value === 'number' ? `$${params.value.toLocaleString()}` : params.value || 'N/A'}
      </Typography>
    )
  },
  {
    field: "fecha",
    headerName: "Fecha de registro",
    flex: 1.2,
    minWidth: 120,
    renderCell: (params) => (
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 500,
          color: '#333',
          fontSize: '0.95rem',
          py: 1
        }}
      >
        {params.value || 'N/A'}
      </Typography>
    )
  }
];

const HomePage: React.FC = () => {

  // Ref para la API del DataGrid
  const apiRef = useGridApiRef();

  // Ref para la sección de resultados (scroll automático)
  const resultsRef = useRef<HTMLDivElement>(null);

  // Estados para filtros seleccionados (SIMPLIFICADO: Sin Subprograma)
  const [selectedAnio, setSelectedAnio] = useState<string>('');
  const [selectedMes, setSelectedMes] = useState<string[]>([]); // Array para múltiples meses
  const [selectedDependencia, setSelectedDependencia] = useState<string>('');
  const [selectedPrograma, setSelectedPrograma] = useState<string>(''); 
  const [selectedComponente, setSelectedComponente] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Estado para controlar cuándo se debe buscar (búsqueda manual)
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);

  // Hooks para datos con filtros escalonados (SIMPLIFICADO)
  const { anios, loading: loadingAnios, error: errorAnios } = useAniosDisponibles();
  const { meses, loading: loadingMeses, error: errorMeses } = useMesesPorAnio(selectedAnio || null);
  const { dependencias, loading: loadingDependencias, error: errorDependencias } = useDependenciasPorFiltros({
    anio: selectedAnio || null,
    mes: selectedMes.length > 0 ? selectedMes.join(',') : null
  });
  const { programas, loading: loadingProgramas, error: errorProgramas } = useProgramasPorFiltrosNuevo({
    anio: selectedAnio || null,
    mes: selectedMes.length > 0 ? selectedMes.join(',') : null,
    idDependencia: selectedDependencia || null
  });
  const { componentes, loading: loadingComponentes, error: errorComponentes } = useComponentesPorFiltrosNuevo({
    anio: selectedAnio || null,
    mes: selectedMes.length > 0 ? selectedMes.join(',') : null,
    idDependencia: selectedDependencia || null,
    idPrograma: selectedPrograma || null
  });
  
  // Hook principal: Beneficiarios directos por filtros (SIMPLIFICADO - BÚSQUEDA MANUAL)
  const { 
    beneficiarios, 
    estadisticas,
    metadata,
    loading: loadingBeneficiarios, 
    error: errorBeneficiarios 
  } = useBeneficiariosPorFiltrosNuevo(
    shouldSearch ? {
      anio: selectedAnio || null,
      mes: selectedMes.length > 0 ? selectedMes.join(',') : null,
      idDependencia: selectedDependencia || null,
      idPrograma: selectedPrograma || undefined,
      idComponente: selectedComponente || undefined
    } : null
  );

  // Debug: Ver estructura de beneficiarios
  // --- Carousel (Demo Mode) ---
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const nextBanner = () => {
      setIsExiting(true);

      timeoutRef.current = setTimeout(() => {
        if (BANNER_COUNT > 0) {
          setCurrentBannerIndex((prev) => (prev + 1) % BANNER_COUNT);
        }
        setIsExiting(false);
      }, 700);
    };

    let intervalId: NodeJS.Timeout | null = null;
    if (BANNER_COUNT > 0) {
      intervalId = setInterval(nextBanner, BANNER_INTERVAL);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handlers
  const handleSearch = () => {
    // Validar que se cumplan los filtros mínimos
    if (selectedAnio && selectedMes.length > 0 && selectedDependencia) {
      setShouldSearch(true);
      
      // Scroll automático a la sección de resultados después de un pequeño delay
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100); // Delay reducido para respuesta más rápida
    }
  };

  const handleClearFilters = () => {
    setSelectedAnio('');
    setSelectedMes([]);
    setSelectedDependencia('');
    setSelectedPrograma('');
    setSelectedComponente('');
    setSearchTerm('');
    setShouldSearch(false);
  };

  const handleDownload = () => {
    if (apiRef.current && beneficiarios.length > 0) {
      // Usar la funcionalidad de exportación del DataGrid
      const mesesStr = selectedMes.join('-');
      apiRef.current.exportDataAsCsv({
        fileName: `beneficiarios_${selectedAnio}_${mesesStr}_${selectedDependencia}`,
        utf8WithBom: true, // Para caracteres especiales en español
      });
    }
  };

  // Filtrar beneficiarios por texto de búsqueda - DataGrid manejará la búsqueda interna
  const filteredBeneficiarios = beneficiarios.filter(row => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return [
      row.beneficiario,
      row.programa,
      row.subprograma,
      row.dependencia,
      row.apoyo?.toString(),
      row.fecha
    ].some(field => field?.toLowerCase().includes(searchLower));
  });

  // Preparar datos para DataGrid con IDs únicos
  const dataGridRows = filteredBeneficiarios.map((row, index) => ({
    id: `${row.beneficiario || 'unknown'}-${row.fecha || 'unknown'}-${index}`,
    beneficiario: row.beneficiario || 'N/A',
    programa: row.programa || 'N/A',
    subprograma: row.subprograma || 'N/A',
    dependencia: row.dependencia || 'N/A',
    apoyo: row.apoyo,
    fecha: row.fecha || 'N/A'
  }));

  // Calcular altura dinámica basada en el contenido
  const calculateTableHeight = () => {
    const headerHeight = 72; // Altura del header
    const rowHeight = 64; // Altura de cada fila
    const footerHeight = 52; // Altura del footer con paginación
    const toolbarHeight = 64; // Altura de la toolbar
    const padding = 16; // Padding adicional
    
    // Usar el número real de filas visibles en la página actual
    const visibleRows = Math.min(dataGridRows.length, 10); // Mostrar hasta 10 filas sin scroll
    const calculatedHeight = headerHeight + (visibleRows * rowHeight) + footerHeight + toolbarHeight + padding;
    
    // Altura máxima 70vh
    const maxHeight = window.innerHeight * 0.7; // 70vh
    
    return Math.min(calculatedHeight, maxHeight);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Título (theme.h2 manda el tamaño) */}
      <Typography variant="h2" component="h2" align="center" sx={{ mt: 3, mb: 3 }}>
        Consulta el Padrón
      </Typography>

      {/* Banner (Demo) */}
      <Box sx={{ 
        width: '70%', 
        mx: 'auto',
        minHeight: { xs: '200px', sm: '250px', md: '300px' }, // Altura mínima fija
        display: 'flex',
        alignItems: 'center'
      }}>
        <Carousel
          navButtonsAlwaysVisible={false}
          autoPlay
          indicators
          indicatorIconButtonProps={{ style: { color: 'rgba(0,0,0,0.5)', marginTop: '5px', marginBottom: '20px' } }}
          activeIndicatorIconButtonProps={{ style: { color: '#000000' } }}
          sx={{ width: '100%' }}
        >
          {bannerImages.map((src, idx) => (
            <img 
              key={idx} 
              src={src} 
              alt={`Banner ${idx + 1}`} 
              style={{ 
                width: '100%', 
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          ))}
        </Carousel>
      </Box>

      {/* Cards de Navegación - Entre carrusel y filtros */}
      <Box sx={{ width: '95%', mx: 'auto', mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {/* Links del menú con diseño limpio (fondo blanco, texto naranja) */}
          {menuItems.slice(1).map((item, index) => {
            // Degradado de naranjas para el texto: de oscuro a claro
            const colors = ['#FF6B35', '#FF8C42', '#FFA726', '#FFB74D', '#FF9800'];
            return (
              <Grid item xs={6} sm={4} md={2.4} key={item.path}>
                <Card 
                  sx={{ 
                    bgcolor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    height: '100%',
                    minHeight: '80px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardActionArea 
                    component={Link} 
                    to={item.path}
                    sx={{ height: '100%', p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        component="h3" 
                        fontWeight="bold" 
                        sx={{ 
                          fontSize: '0.85rem',
                          color: colors[index % colors.length],
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.text}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>


      {/* Mostrar errores */}
      {(errorAnios || errorMeses || errorDependencias || errorProgramas || errorComponentes || errorBeneficiarios) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorAnios || errorMeses || errorDependencias || errorProgramas || errorComponentes || errorBeneficiarios}
        </Alert>
      )}

      {/* Filtros */}
      <Paper elevation={1} sx={{ bgcolor: '#f7f7f7', py: 3, px: { xs: 1, sm: 2, md: 3 }, mb: 4, borderRadius: '8px' }}>
        <Typography variant="h3" component="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Filtros de Búsqueda
        </Typography>
        
        {/* Filtros - NUEVOS: Año y Mes primero (OBLIGATORIOS) */}
        {!errorAnios && (
          <>
            <Grid container spacing={2} alignItems="center">
            {/* 1️⃣ Año - Siempre disponible (OBLIGATORIO) */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined" size="small" required>
                <InputLabel id="ano-label">Año *</InputLabel>
                <Select
                  labelId="ano-label"
                  value={selectedAnio}
                  label="Año *"
                  onChange={(e) => {
                    const newAnio = e.target.value;
                    setSelectedAnio(newAnio);
                    // Limpiar todos los filtros dependientes
                    setSelectedMes([]);
                    setSelectedDependencia('');
                    setSelectedPrograma('');
                    setSelectedComponente('');
                  }}
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={loadingAnios || shouldSearch}
                >
                  {anios?.map((year) => (
                    <MenuItem key={year} value={year.toString()}>
                      {year}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>

            {/* 2️⃣ Mes - Solo disponible si hay año (OBLIGATORIO) - SELECCIÓN MÚLTIPLE */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined" size="small" required>
                <InputLabel id="mes-label">Mes(es) *</InputLabel>
                <Select
                  labelId="mes-label"
                  multiple
                  value={selectedMes}
                  label="Mes(es) *"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedMes(typeof value === 'string' ? value.split(',') : value as string[]);
                    // Limpiar filtros dependientes
                    setSelectedDependencia('');
                    setSelectedPrograma('');
                    setSelectedComponente('');
                  }}
                  renderValue={(selected) => 
                    (selected as string[])
                      .map(mes => {
                        const monthNum = parseInt(mes);
                        return new Date(2000, monthNum - 1).toLocaleString('es-MX', { month: 'short' })
                          .charAt(0).toUpperCase() + 
                          new Date(2000, monthNum - 1).toLocaleString('es-MX', { month: 'short' }).slice(1);
                      })
                      .join(', ')
                  }
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={!selectedAnio || loadingMeses || shouldSearch}
                >
                  {meses?.map((mes) => (
                    <MenuItem key={mes} value={mes.toString()}>
                      {new Date(2000, mes - 1).toLocaleString('es-MX', { month: 'long' }).charAt(0).toUpperCase() + 
                       new Date(2000, mes - 1).toLocaleString('es-MX', { month: 'long' }).slice(1)}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>

            {/* 3️⃣ Dependencia - Solo disponible si hay año y mes (OBLIGATORIO) */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined" size="small" required>
                <InputLabel id="dependencia-label">Dependencia *</InputLabel>
                <Select
                  labelId="dependencia-label"
                  value={selectedDependencia}
                  label="Dependencia *"
                  onChange={(e) => {
                    const newDep = e.target.value;
                    setSelectedDependencia(newDep);
                    // Limpiar filtros dependientes
                    setSelectedPrograma('');
                    setSelectedComponente('');
                  }}
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={!selectedAnio || !selectedMes || loadingDependencias || shouldSearch}
                >
                  {dependencias?.map((dep) => (
                    <MenuItem key={dep.id} value={dep.id}>
                      {dep.nombre}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>

            {/* 4️⃣ Programa - Solo disponible si hay filtros mínimos (OPCIONAL) */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="programa-label">Programa</InputLabel>
                <Select
                  labelId="programa-label"
                  value={selectedPrograma}
                  label="Programa"
                  onChange={(e) => {
                    const newProg = e.target.value;
                    setSelectedPrograma(newProg);
                    // Limpiar componente al cambiar programa
                    setSelectedComponente('');
                  }}
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={!selectedAnio || !selectedMes || !selectedDependencia || loadingProgramas}
                >
                  {programas?.map((prog) => (
                    <MenuItem key={prog.id} value={prog.id}>
                      {prog.nombre}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>

            {/* 5️⃣ Componente - Solo disponible si hay programa (OPCIONAL) */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="componente-label">Componente</InputLabel>
                <Select
                  labelId="componente-label"
                  value={selectedComponente}
                  label="Componente"
                  onChange={(e) => setSelectedComponente(e.target.value)}
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={!selectedPrograma || loadingComponentes}
                >
                  {componentes?.map((comp) => (
                    <MenuItem key={comp.id} value={comp.id}>
                      {comp.nombre}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3, pt: 1 }}>
              {/* Botón Buscar - Solo habilitado si hay filtros mínimos */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                disabled={!selectedAnio || selectedMes.length === 0 || !selectedDependencia || loadingBeneficiarios}
                sx={{ 
                  bgcolor: '#FF6B35',
                  color: 'white', 
                  borderRadius: '20px', 
                  px: 4, 
                  py: 1, 
                  textTransform: 'none', 
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#FF8C5A' },
                  '&.Mui-disabled': { bgcolor: '#ccc', color: '#666' }
                }}
              >
                Buscar
              </Button>
              
              {/* Botón Limpiar Filtros - Solo mostrar si hay algún filtro seleccionado */}
              {(selectedAnio || selectedMes || selectedDependencia || selectedPrograma || selectedComponente || searchTerm) && (
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  disabled={loadingBeneficiarios || loadingAnios}
                  sx={{ 
                    borderColor: '#FF6B35',
                    color: '#FF6B35',
                    borderRadius: '20px', 
                    px: 4, 
                    py: 1, 
                    textTransform: 'none', 
                    fontWeight: 'bold',
                    '&:hover': { borderColor: '#FF8C5A', bgcolor: 'rgba(255, 107, 53, 0.05)' }
                  }}
                >
                  Limpiar Filtros
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Mensajes informativos */}
      {(!selectedAnio || selectedMes.length === 0 || !selectedDependencia) && (
        <Paper elevation={1} sx={{ bgcolor: '#f7f7f7', py: 3, px: { xs: 1, sm: 2, md: 3 }, mb: 4, borderRadius: '8px' }}>
          <Typography variant="h3" component="h3" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Completa los filtros mínimos para comenzar
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Debes seleccionar <strong>Año, Mes(es) y Dependencia</strong> y hacer clic en <strong>Buscar</strong>.
          </Typography>
        </Paper>
      )}

      {selectedAnio && selectedMes.length > 0 && selectedDependencia && !shouldSearch && !loadingBeneficiarios && (
        <Paper elevation={1} sx={{ bgcolor: '#fff3e0', py: 3, px: { xs: 1, sm: 2, md: 3 }, mb: 4, borderRadius: '8px' }}>
          <Typography variant="h3" component="h3" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Haz clic en "Buscar" para ver los resultados
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Los filtros mínimos están completos. Presiona el botón <strong>Buscar</strong> para visualizar los beneficiarios.
          </Typography>
        </Paper>
      )}

      {beneficiarios.length === 0 && !loadingBeneficiarios && shouldSearch && (
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: '8px', textAlign: 'center', bgcolor: '#fff3e0' }}>
          <Typography variant="body1" color="text.secondary">
            No se encontraron beneficiarios con los filtros seleccionados.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Intenta modificar los filtros y buscar nuevamente.
          </Typography>
        </Paper>
      )}

      {beneficiarios.length > 0 && metadata && shouldSearch && (
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '8px', bgcolor: '#e8f5e8' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                ✅ {metadata.total || beneficiarios.length} beneficiarios encontrados
              </Typography>
              {metadata.estadisticas?.montoTotal && (
                <Typography variant="body2" color="text.secondary">
                  💰 Monto total: ${metadata.estadisticas.montoTotal}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {metadata.estadisticas && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    📊 {metadata.estadisticas.programasEncontrados || 0} programas • {metadata.estadisticas.componentesEncontrados || 0} componentes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅 Años: {metadata.estadisticas.aniosEncontrados?.join(', ') || 'N/A'}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
          
          {/* Mostrar filtros aplicados */}
          {metadata?.filtrosAplicados && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                🔍 Filtros aplicados:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Año: {metadata.filtrosAplicados.anio || 'N/A'} | 
                Mes: {metadata.filtrosAplicados.mes || 'N/A'} | 
                Dependencia: {metadata.filtrosAplicados.dependencia || 'N/A'} | 
                Programa: {metadata.filtrosAplicados.programa || 'Todos'} | 
                Componente: {metadata.filtrosAplicados.componente || 'Todos'}
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Punto de referencia para scroll automático - Siempre presente cuando shouldSearch es true */}
      {shouldSearch && <div ref={resultsRef} style={{ paddingTop: '20px' }} />}

      {/* Toolbar de acciones - Mostrar cuando hay beneficiarios disponibles */}
      {beneficiarios.length > 0 && shouldSearch && (
        <>
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2, px: 1 }}>
            <Button 
              startIcon={<DownloadIcon />} 
              variant="outlined" 
              color="secondary" 
              sx={{ borderRadius: '20px', textTransform: 'none' }}
              onClick={handleDownload}
              disabled={beneficiarios.length === 0}
            >
              Descargar Datos
            </Button>
            {/* La búsqueda ahora está integrada en DataGrid */}
          </Toolbar>
        </>
      )}

      {/* DataGrid de Beneficiarios - Mantiene el diseño visual actual */}
      {((beneficiarios.length > 0 && shouldSearch) || (loadingBeneficiarios && shouldSearch)) && (
        <Paper 
          elevation={1} 
          sx={{ 
            borderRadius: '8px',
            overflow: 'hidden',
            '& .MuiDataGrid-root': {
              border: 'none',
              height: '100%', // Usa toda la altura del contenedor
              width: '100%',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f2f2f2',
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                '& .MuiDataGrid-columnHeader': {
                  fontWeight: 'bold !important',
                  fontSize: '1rem !important',
                  color: '#333',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold !important',
                  fontSize: '1rem !important',
                },
              },
              '& .MuiDataGrid-toolbarContainer': {
                padding: '16px',
                backgroundColor: '#fafafa',
                borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                '& .MuiButton-root': {
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    borderColor: '#1976d2',
                  },
                },
                '& .MuiInputBase-root': {
                  color: '#333',
                  fontSize: '0.9rem',
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      opacity: 1,
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                    borderWidth: '2px',
                  },
                },
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  },
                },
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                padding: '8px 16px',
                fontSize: '0.9rem',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid rgba(224, 224, 224, 1)',
                backgroundColor: '#fafafa',
              },
              '& .MuiDataGrid-overlay': {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              },
            }
          }}
        >
          {loadingBeneficiarios ? (
            <Box sx={{ 
              position: 'relative', 
              width: '100%', 
              height: `${calculateTableHeight()}px`, 
              maxHeight: '70vh',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }}>
              <CircularProgress 
                size={48} 
                sx={{ 
                  color: '#FF6B35',
                }} 
              />
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>
                Cargando beneficiarios con los filtros seleccionados...
              </Typography>
            </Box>
          ) : dataGridRows.length > 0 ? (
            <Box sx={{ 
              width: '100%',
              height: `${calculateTableHeight()}px`, // Altura dinámica calculada
              maxHeight: '70vh', // Respaldo de altura máxima
            }}>
              <MUIXDataGrid 
                apiRef={apiRef}
                columns={beneficiariosColumns}
                rows={dataGridRows}
                modulo="beneficiarios-publico"
              />
            </Box>
          ) : (
            <Box sx={{ 
              height: '70vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography variant="body1" color="text.secondary">
                {beneficiarios.length === 0 ? 
                  'No hay beneficiarios disponibles.' : 
                  'No se encontraron resultados con la búsqueda aplicada.'
                }
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default HomePage;
