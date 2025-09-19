import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  IconButton,
  Toolbar,
  styled,
  CircularProgress,
  Alert,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import Pagination from '@mui/material/Pagination';
import { useDependenciasDisponibles, useProgramasPorDependencia, useComponentesPorPrograma, useAniosPorFiltros, useBeneficiariosPorFiltros } from '../hooks/useApi';
import { apiClient } from '../services/api';

// --- Banner Images (Demo Mode) ---
import bannerImage1 from '../assets/banner1.png';
import bannerImage2 from '../assets/banner2.png';
import bannerImage3 from '../assets/banner3.jpg';
import bannerImage4 from '../assets/banner4.jpg';
import bannerImage5 from '../assets/banner5.png';

const bannerImages = [bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5];
const BANNER_COUNT = bannerImages.length;
const BANNER_INTERVAL = 5000; // 5s

// Styled table header
const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  backgroundColor: '#f2f2f2',
}));
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

const HomePage: React.FC = () => {

  // Estados para filtros seleccionados
  const [selectedDependencia, setSelectedDependencia] = useState<string>('');
  const [selectedPrograma, setSelectedPrograma] = useState<string>(''); 
  const [selectedComponente, setSelectedComponente] = useState<string>('');
  const [selectedAnio, setSelectedAnio] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Paginación
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Hooks para datos con filtros escalonados
  const { dependencias, loading: loadingDependencias, error: errorDependencias } = useDependenciasDisponibles();
  const { programas, loading: loadingProgramas, error: errorProgramas } = useProgramasPorDependencia(selectedDependencia || null);
  const { componentes, loading: loadingComponentes, error: errorComponentes } = useComponentesPorPrograma(selectedPrograma || null);
  const { anios, loading: loadingAnios, error: errorAnios } = useAniosPorFiltros({
    idDependencia: selectedDependencia || undefined,
    idPrograma: selectedPrograma || undefined,
    idComponente: selectedComponente || undefined
  });
  
  // Hook principal: Beneficiarios directos por filtros (NUEVO ENFOQUE)
  const { 
    beneficiarios, 
    estadisticas,
    metadata,
    loading: loadingBeneficiarios, 
    error: errorBeneficiarios 
  } = useBeneficiariosPorFiltros({
    idDependencia: selectedDependencia || undefined,
    idPrograma: selectedPrograma || undefined,
    idComponente: selectedComponente || undefined,
    anio: selectedAnio || undefined
  });

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
  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => setPage(newPage);

  const handleFilter = () => {
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedDependencia('');
    setSelectedPrograma('');
    setSelectedComponente('');
    setSelectedAnio('');
    setSearchTerm('');
    setPage(1);
  };

  const handleDownload = () => {
    if (selectedDependencia && beneficiarios.length > 0) {
      // Crear URL de descarga usando los filtros actuales
      const queryParams = new URLSearchParams({ format: 'excel' });
      queryParams.append('idDependencia', selectedDependencia);
      if (selectedPrograma) queryParams.append('idPrograma', selectedPrograma);
      if (selectedComponente) queryParams.append('idComponente', selectedComponente);
      if (selectedAnio) queryParams.append('anio', selectedAnio);
      
      const downloadUrl = `${apiClient.getBaseUrl()}/front-publico/beneficiarios-por-filtros/download?${queryParams.toString()}`;
      window.open(downloadUrl, '_blank');
    }
  };

  // Filtrar beneficiarios por texto de búsqueda
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

  // Paginación
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredBeneficiarios.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBeneficiarios.length / rowsPerPage);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Título (theme.h2 manda el tamaño) */}
      <Typography variant="h2" component="h2" align="center" sx={{ mt: 3, mb: 3 }}>
        Consulta el Padrón
      </Typography>

      {/* Banner (Demo) */}
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



      {/* Mostrar errores */}
      {(errorDependencias || errorProgramas || errorComponentes || errorAnios || errorBeneficiarios) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorDependencias || errorProgramas || errorComponentes || errorAnios || errorBeneficiarios}
        </Alert>
      )}

      {/* Filtros */}
      <Paper elevation={1} sx={{ bgcolor: '#f7f7f7', py: 3, px: { xs: 1, sm: 2, md: 3 }, mb: 4, borderRadius: '8px' }}>
        <Typography variant="h3" component="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Filtros de Búsqueda
        </Typography>
        
        {/* Filtros - Siempre mostrar a menos que haya error crítico */}
        {!errorDependencias && (
          <>
            <Grid container spacing={2} alignItems="center">
            {/* Dependencia - Siempre disponible */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="dependencia-label">Dependencia</InputLabel>
                <Select
                  labelId="dependencia-label"
                  value={selectedDependencia}
                  label="Dependencia"
                  onChange={(e) => {
                    const newDep = e.target.value;
                    setSelectedDependencia(newDep);
                    // Limpiar filtros dependientes al cambiar dependencia
                    setSelectedPrograma('');
                    setSelectedComponente('');
                    setSelectedAnio('');
                  }}
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={loadingDependencias}
                >
                  {dependencias?.map((dep) => (
                    <MenuItem key={dep.id} value={dep.id}>
                      {dep.nombre}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>

            {/* Programa - Solo disponible si hay dependencia seleccionada */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="programa-social-label">Programa Social</InputLabel>
                <Select
                  labelId="programa-social-label"
                  value={selectedPrograma}
                  label="Programa Social"
                  onChange={(e) => {
                    const newProg = e.target.value;
                    setSelectedPrograma(newProg);
                    // Limpiar filtros dependientes al cambiar programa
                    setSelectedComponente('');
                    setSelectedAnio('');
                  }}
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={!selectedDependencia || loadingProgramas}
                >
                  {programas?.map((prog) => (
                    <MenuItem key={prog.id} value={prog.id}>
                      {prog.nombre}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>

            {/* Componente - Solo disponible si hay programa seleccionado */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="subprograma-label">Componente</InputLabel>
                <Select
                  labelId="subprograma-label"
                  value={selectedComponente}
                  label="Componente"
                  onChange={(e) => {
                    const newComp = e.target.value;
                    setSelectedComponente(newComp);
                    // Limpiar año al cambiar componente
                    setSelectedAnio('');
                  }}
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

            {/* Año - Disponible según filtros seleccionados */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="ano-label">Año</InputLabel>
                <Select
                  labelId="ano-label"
                  value={selectedAnio}
                  label="Año"
                  onChange={(e) => setSelectedAnio(e.target.value)}
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  disabled={loadingAnios}
                >
                  {anios?.map((year) => (
                    <MenuItem key={year} value={year.toString()}>
                      {year}
                    </MenuItem>
                  )) || []}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, pt: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFilter}
                disabled={loadingBeneficiarios || loadingDependencias}
                sx={{ color: 'white', borderRadius: '20px', px: 4, py: 1, textTransform: 'none', fontWeight: 'bold' }}
              >
                {(loadingBeneficiarios || loadingDependencias) ? <CircularProgress size={20} /> : 'Aplicar Filtros'}
              </Button>
              
              {/* Botón Limpiar Filtros - Solo mostrar si hay algún filtro seleccionado */}
              {(selectedDependencia || selectedPrograma || selectedComponente || selectedAnio || searchTerm) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClearFilters}
                  disabled={loadingBeneficiarios || loadingDependencias}
                  sx={{ color: 'white', borderRadius: '20px', px: 4, py: 1, textTransform: 'none', fontWeight: 'bold' }}
                >
                  Limpiar Filtros
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Mensajes informativos */}
      {!selectedDependencia && (
        <Paper elevation={1} sx={{ bgcolor: '#f7f7f7', py: 3, px: { xs: 1, sm: 2, md: 3 }, mb: 4, borderRadius: '8px' }}>
          <Typography variant="h3" component="h3" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Selecciona una Dependencia para comenzar
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Debes seleccionar al menos una dependencia para visualizar beneficiarios.
          </Typography>
        </Paper>
      )}

      {loadingBeneficiarios && selectedDependencia && (
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: '8px', textAlign: 'center' }}>
          <CircularProgress size={24} sx={{ mr: 2 }} />
          <Typography variant="body1" component="span">
            Cargando beneficiarios con los filtros seleccionados...
          </Typography>
        </Paper>
      )}

      {beneficiarios.length === 0 && !loadingBeneficiarios && selectedDependencia && (
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: '8px', textAlign: 'center', bgcolor: '#fff3e0' }}>
          <Typography variant="body1" color="text.secondary">
            No se encontraron beneficiarios con los filtros seleccionados.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Intenta modificar los filtros para obtener resultados.
          </Typography>
        </Paper>
      )}

      {beneficiarios.length > 0 && metadata && (
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
                Dependencia: {metadata.filtrosAplicados.dependencia || 'Todas'} | 
                Programa: {metadata.filtrosAplicados.programa || 'Todos'} | 
                Componente: {metadata.filtrosAplicados.componente || 'Todos'} | 
                Año: {metadata.filtrosAplicados.anio || 'Todos'}
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Toolbar de acciones - Mostrar cuando hay beneficiarios disponibles */}
      {beneficiarios.length > 0 && (
        <>
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2, px: 1 }}>
            <Button 
              startIcon={<DownloadIcon />} 
              variant="outlined" 
              color="secondary" 
              sx={{ borderRadius: '20px', textTransform: 'none' }}
              onClick={handleDownload}
              disabled={!selectedDependencia || beneficiarios.length === 0}
            >
              Descargar Excel
            </Button>
            <TextField
              label="Buscar en tabla..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              InputProps={{
                endAdornment: (
                  <IconButton size="small" aria-label="Buscar">
                    <SearchIcon />
                  </IconButton>
                ),
                sx: { borderRadius: '20px' },
              }}
              sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: '400px', flexGrow: { sm: 1 } }}
            />
          </Toolbar>
        </>
      )}

      {/* Tabla de Beneficiarios - Mostrar cuando hay datos o está cargando */}
      {(beneficiarios.length > 0 || loadingBeneficiarios) && (
        <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflow: 'auto', borderRadius: '8px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="Tabla de padrón de beneficiarios" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Beneficiario</StyledTableCell>
                <StyledTableCell>Programa</StyledTableCell>
                <StyledTableCell>Subprograma</StyledTableCell>
                <StyledTableCell>Dependencia</StyledTableCell>
                <StyledTableCell>Apoyo</StyledTableCell>
                <StyledTableCell>Fecha</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingBeneficiarios ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow
                    key={`${row.beneficiario || 'unknown'}-${row.fecha || 'unknown'}-${index}`}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                    hover
                  >
                    <TableCell component="th" scope="row">{row.beneficiario || 'N/A'}</TableCell>
                    <TableCell>{row.programa || 'N/A'}</TableCell>
                    <TableCell>{row.subprograma || 'N/A'}</TableCell>
                    <TableCell>{row.dependencia || 'N/A'}</TableCell>
                    <TableCell>{typeof row.apoyo === 'number' ? `$${row.apoyo.toLocaleString()}` : row.apoyo || 'N/A'}</TableCell>
                    <TableCell>{row.fecha || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    {beneficiarios.length === 0 ? 
                      'No hay beneficiarios en esta carpeta.' : 
                      'No se encontraron resultados con la búsqueda aplicada.'
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Paginación - Solo mostrar si hay carpeta seleccionada y datos */}
      {beneficiarios.length > 0 && filteredBeneficiarios.length > rowsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
