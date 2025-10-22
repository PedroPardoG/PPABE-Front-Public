import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { esES as gridEsES } from "@mui/x-data-grid/locales";

const theme = createTheme(coreEsES, gridEsES);

export default function MUIXDataGridGeneral(props: any) {
  const [pageSize, setPageSize] = useState(25); // Default a 25
  
  const changePageSize = (v: number) => {
    setPageSize(v);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <DataGrid
          {...props.rows}
          apiRef={props.apiRef} // Aceptar apiRef como prop
          columns={props.columns}
          rows={props.rows}
          density="standard"
          autoHeight={false} // Desactivamos autoHeight para control manual
          stickyHeader
          onPageSizeChange={(v: number) => changePageSize(v)}
          rowsPerPageOptions={[10, 25, 50, 75]} // Opciones exactas: 10, 25, 50, 75
          disableRowSelectionOnClick
          disableDensitySelector
          disableColumnMenu // Deshabilitar el menú de columnas (los tres puntos)
          getRowId={props.getRowId || ((row) => (row.Id ? row.Id : row.id))}
          rowHeight={64}
          headerHeight={72}
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 75]} // Para versiones más nuevas de MUI-X
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25, // Default explícito
              },
            },
          }}
          
          // Estilos personalizados para el header
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f7f7f7', // Mismo color que filtros de búsqueda
              borderBottom: '2px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#f7f7f7',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold !important',
              fontSize: '0.95rem !important',
            },
          }}
          
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              label: "Buscar",
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                fileName: props.modulo || "beneficiarios",
                utf8WithBom: true,
              },
            },
          }}
          localeText={{
            columnsPanelHideAllButton: "Ocultar todo",
            columnsPanelShowAllButton: "Mostrar todo",
            columnsPanelTextFieldPlaceholder: "",
            columnsPanelTextFieldLabel: "Buscar",
            noRowsLabel: "No se ha encontrado datos.",
            noResultsOverlayLabel: "No se ha encontrado ningún resultado",
            toolbarColumns: "Columnas",
            toolbarExport: "Exportar",
            toolbarColumnsLabel: "Seleccionar columnas",
            toolbarFilters: "Filtros",
            toolbarFiltersLabel: "Ver filtros",
            toolbarFiltersTooltipHide: "Quitar filtros",
            toolbarFiltersTooltipShow: "Ver filtros",
            toolbarQuickFilterPlaceholder: "Buscar",
            toolbarExportCSV: "Descargar como CSV",
            toolbarExportPrint: "Imprimir",
            checkboxSelectionSelectRow: "Filas seleccionadas",
            checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
            errorOverlayDefaultLabel: "Ha ocurrido un error.",
            footerRowSelected: (count) =>
              count > 1
                ? `${count.toLocaleString()} filas seleccionadas`
                : `${count.toLocaleString()} fila seleccionada`,
            footerTotalRows: "Filas Totales:",
            footerPaginationRowsPerPage: "Filas por página:",
            footerRowsPerPage: "Filas por página:",
            columnMenuLabel: "Menú",
            columnMenuShowColumns: "Mostrar columnas",
            columnMenuFilter: "Filtro",
            columnMenuHideColumn: "Ocultar",
            columnMenuUnsort: "Desordenar",
            columnMenuSortAsc: "Ordenar ASC",
            columnMenuSortDesc: "Ordenar DESC",
            columnHeaderFiltersTooltipActive: (count) =>
              count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
            columnHeaderFiltersLabel: "Mostrar filtros",
            columnHeaderSortIconLabel: "Ordenar",
            filterPanelColumns: "Columnas",
            filterOperatorContains: "Contiene",
            filterOperatorEquals: "Igual",
            filterOperatorStartsWith: "Comienza Con",
            filterOperatorEndsWith: "Termina Con",
            filterOperatorIsEmpty: "Es Vacio",
            filterOperatorIsNotEmpty: "No Vacio",
            filterOperatorIsAnyOf: "Es Cualquiera de",
            filterPanelInputLabel: "Valor",
            filterPanelInputPlaceholder: "Valor Filtrado",
            // Traducciones específicas para paginación
            MuiTablePagination: {
              labelRowsPerPage: "Filas por página:",
              labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
                `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
            },
          }}
        />
      </ThemeProvider>
    </>
  );
}