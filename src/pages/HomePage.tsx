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
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import Pagination from '@mui/material/Pagination';

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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  backgroundColor: '#f2f2f2',
}));

// (Se conservan estos styled por si los usas después en Demo Mode)
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
  // Filtros
  const [dependencia, setDependencia] = useState('Todas');
  const [programaSocial, setProgramaSocial] = useState('Todos');
  const [subprograma, setSubprograma] = useState('Todos');
  const [ano, setAno] = useState('Todos');
  const [searchText, setSearchText] = useState('');

  // Paginación
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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

  // Datos de tabla (Demo Mode)
  const tableData = [
    { beneficiario: 'YOLANDA RODRIGUEZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$3000', fecha: '2023-04-18' },
    { beneficiario: 'ROMAN SANTIAGO', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$3000', fecha: '2023-04-18' },
    { beneficiario: 'HECTOR ZAVALA', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$2000', fecha: '2023-04-18' },
    { beneficiario: 'RODOLFO RODRIGUEZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$1000', fecha: '2023-04-18' },
    { beneficiario: 'ERNESTO PEREZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$3000', fecha: '2023-04-18' },
    { beneficiario: 'JUAN PEREZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$4000', fecha: '2023-04-18' },
    { beneficiario: 'ALEJANDRA SANTIAGO', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$2000', fecha: '2023-04-18' },
    { beneficiario: 'ALDO MARTINEZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$1000', fecha: '2023-04-18' },
    { beneficiario: 'MARIA GONZALEZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$5000', fecha: '2023-04-18' },
    { beneficiario: 'LUIS HERNANDEZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$1500', fecha: '2023-04-18' },
    { beneficiario: 'SOFIA RAMIREZ', programa: 'DESARROLLO INTEGRAL DE la FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$2500', fecha: '2023-04-18' },
    { beneficiario: 'DANIEL TORRES', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$3500', fecha: '2023-04-18' },
    { beneficiario: 'VALERIA JIMENEZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$4500', fecha: '2023-04-18' },
    { beneficiario: 'GABRIEL CASTILLO', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$5500', fecha: '2024-02-20' },
    { beneficiario: 'ISABELLA VARGAS', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$6500', fecha: '2023-04-18' },
  ];

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => setPage(newPage);

  const filteredData = tableData.filter(row =>
    (dependencia === 'Todas' || row.dependencia === dependencia) &&
    (programaSocial === 'Todos' || row.programa === programaSocial) &&
    (subprograma === 'Todos' || row.subprograma === subprograma) &&
    (ano === 'Todos' || row.fecha.startsWith(ano)) &&
    (
      searchText === '' ||
      row.beneficiario.toLowerCase().includes(searchText.toLowerCase()) ||
      row.programa.toLowerCase().includes(searchText.toLowerCase()) ||
      row.subprograma.toLowerCase().includes(searchText.toLowerCase()) ||
      row.dependencia.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleFilter = () => setPage(1);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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
          emulateTouch
          indicatorIconButtonProps={{ style: { color: 'rgba(0,0,0,0.5)', marginTop: '5px', marginBottom: '20px' } }}
          activeIndicatorIconButtonProps={{ style: { color: '#000000' } }}
        >
          {bannerImages.map((src, idx) => (
            <img key={idx} src={src} alt={`Banner ${idx + 1}`} style={{ width: '100%' }} />
          ))}
        </Carousel>
      </Box>

      {/* Filtros */}
      <Paper elevation={1} sx={{ bgcolor: '#f7f7f7', py: 3, px: { xs: 1, sm: 2, md: 3 }, mb: 4, borderRadius: '8px' }}>
        <Typography variant="h3" component="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Filtros de Búsqueda
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="dependencia-label">Dependencia</InputLabel>
              <Select
                labelId="dependencia-label"
                value={dependencia}
                label="Dependencia"
                onChange={(e) => setDependencia(e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: '4px' }}
              >
                <MenuItem value="Todas">Todas</MenuItem>
                <MenuItem value="SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA">
                  SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="programa-social-label">Programa Social</InputLabel>
              <Select
                labelId="programa-social-label"
                value={programaSocial}
                label="Programa Social"
                onChange={(e) => setProgramaSocial(e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: '4px' }}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="DESARROLLO INTEGRAL DE LA FAMILIA">DESARROLLO INTEGRAL DE LA FAMILIA</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="subprograma-label">Subprograma</InputLabel>
              <Select
                labelId="subprograma-label"
                value={subprograma}
                label="Subprograma"
                onChange={(e) => setSubprograma(e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: '4px' }}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL">
                  APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="ano-label">Año</InputLabel>
              <Select
                labelId="ano-label"
                value={ano}
                label="Año"
                onChange={(e) => setAno(e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: '4px' }}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pt: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            sx={{ color: 'white', borderRadius: '20px', px: 4, py: 1, textTransform: 'none', fontWeight: 'bold' }}
          >
            Aplicar Filtros
          </Button>
        </Box>
      </Paper>

      {/* Toolbar de acciones */}
      <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2, px: 1 }}>
        <Button startIcon={<DownloadIcon />} variant="outlined" color="secondary" sx={{ borderRadius: '20px', textTransform: 'none' }}>
          Descargar Excel
        </Button>
        <TextField
          label="Buscar en tabla..."
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value); setPage(1); }}
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

      {/* Tabla */}
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
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow
                  key={`${row.beneficiario}-${row.fecha}-${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                  hover
                >
                  <TableCell component="th" scope="row">{row.beneficiario}</TableCell>
                  <TableCell>{row.programa}</TableCell>
                  <TableCell>{row.subprograma}</TableCell>
                  <TableCell>{row.dependencia}</TableCell>
                  <TableCell>{row.apoyo}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No se encontraron resultados con los filtros aplicados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      {filteredData.length > rowsPerPage && (
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
