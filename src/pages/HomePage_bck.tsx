import React, { useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import Pagination from '@mui/material/Pagination';
import bannerImage from '../assets/banner1.png';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  backgroundColor: '#f2f2f2',
}));

const HomePage = () => {
  const [dependencia, setDependencia] = useState('Todas');
  const [programaSocial, setProgramaSocial] = useState('Todos');
  const [subprograma, setSubprograma] = useState('Todos');
  const [ano, setAno] = useState('Todos');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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
    { beneficiario: 'SOFIA RAMIREZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$2500', fecha: '2023-04-18' },
    { beneficiario: 'DANIEL TORRES', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$3500', fecha: '2023-04-18' },
    { beneficiario: 'VALERIA JIMENEZ', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$4500', fecha: '2023-04-18' },
    { beneficiario: 'GABRIEL CASTILLO', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$5500', fecha: '2023-04-18' },
    { beneficiario: 'ISABELLA VARGAS', programa: 'DESARROLLO INTEGRAL DE LA FAMILIA', subprograma: 'APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL', dependencia: 'SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA', apoyo: '$6500', fecha: '2023-04-18' },
  ];

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) =>
    setPage(newPage);

  // Filtrado con lógica actualizada para comparar con las opciones estáticas (si es necesario)
  // O simplemente filtrar por texto como antes si 'Todas' significa no aplicar ese filtro
  const filteredData = tableData.filter(row =>
    (dependencia === 'Todas' || row.dependencia === dependencia) && // Ajustar si 'Dependencia 1' != 'Option 1'
    (programaSocial === 'Todos' || row.programa === programaSocial) && // Ajustar si 'Programa A' != 'Option A'
    (subprograma === 'Todos' || row.subprograma === subprograma) && // Ajustar si 'Subprograma X' != 'Option X'
    (ano === 'Todos' || row.fecha.startsWith(ano)) &&
    (
      searchText === '' ||
      row.beneficiario.toLowerCase().includes(searchText.toLowerCase()) ||
      row.programa.toLowerCase().includes(searchText.toLowerCase()) ||
      row.subprograma.toLowerCase().includes(searchText.toLowerCase()) ||
      row.dependencia.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleFilter = () => {
      setPage(1);
      console.log("Filtering with:", { dependencia, programaSocial, subprograma, ano });
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const emptyRows = page === totalPages && paginatedData.length > 0 ? rowsPerPage - paginatedData.length : 0;

  // Opción 2: Usar la ruta directamente (requiere que la carpeta 'assets' esté en 'public' o servida estáticamente)
  const bannerImageUrl = "../assets/banner1.png";

  return (
      <Box sx={{ p: { xs: 1, sm: 2 } }}> {/* Responsive padding */}
        <Typography variant="h2" component="h2" align="center" sx={{ mt: 3, mb: 3 }}>
          Consulta el Padrón
        </Typography>

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

        {/* === Filter Section Start === */}
        <Paper elevation={1} sx={{ bgcolor: '#e0e0e0', py: 2, px: { xs: 1, sm: 2, md: 3 }, mb: 3 }}>
          <Grid container spacing={2} alignItems="flex-start">
             <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="dependencia-label">Dependencia</InputLabel>
                <Select
                  labelId="dependencia-label"
                  value={dependencia}
                  label="Dependencia"
                  onChange={(e) => setDependencia(e.target.value)}
                  sx={{ bgcolor: 'white' }}
                >
                  {/* Opciones Estáticas */}
                  <MenuItem value="Todas">Todas</MenuItem>
                  <MenuItem value="SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA">SISTEMA PARA EL DESARROLLO INTEGRAL DE LA FAMILIA</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
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
                  sx={{ bgcolor: 'white' }}
                >
                  {/* Opciones Estáticas */}
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="DESARROLLO INTEGRAL DE LA FAMILIA">DESARROLLO INTEGRAL DE LA FAMILIA</MenuItem>
                  <MenuItem value="Option B">Option B</MenuItem>
                  <MenuItem value="Option C">Option C</MenuItem>
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
                  sx={{ bgcolor: 'white' }}
                >
                  {/* Opciones Estáticas */}
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL">APOYOS EN ESPECIE A PERSONAS SUJETAS A ASISTENCIA SOCIAL</MenuItem>
                  <MenuItem value="Option Y">Option Y</MenuItem>
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
                  sx={{ bgcolor: 'white' }}
                >
                  {/* Opciones Estáticas */}
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="2023-04-18">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  {/* Puedes agregar más años si es necesario */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              sx={{ color: 'white' }}
            >
              Filtrar
            </Button>
          </Box>
        </Paper>
        {/* === Filter Section End === */}

        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2, px: 1 }}
        >
          <Button startIcon={<DownloadIcon />} variant="outlined">
              Descarga Excel
          </Button>
          <TextField
            label="Buscar en tabla..."
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value); setPage(1);}}
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: '400px', flexGrow: { sm: 1 } }} // Responsive width
          />
        </Toolbar>

        <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflow: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
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
                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                   <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                     No se encontraron resultados con los filtros aplicados.
                   </TableCell>
                 </TableRow>
               )}
               {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
                  <TableRow key={`empty-${index}`} style={{ height: '5px' }}>
                    <TableCell colSpan={6} style={{ padding: 0, border: 0 }} />
                  </TableRow>
               ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredData.length > rowsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
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