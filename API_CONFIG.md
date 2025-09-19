# Configuración de API y Variables de Entorno

Este documento explica cómo está configurado el proyecto para trabajar con el backend.

## Variables de Entorno

El proyecto utiliza las siguientes variables de entorno definidas en el archivo `.env`:

```env
VITE_APPLICATION_ENDPOINT=http://10.200.4.152:4000/api
VITE_APPLICATION_FILES=http://10.200.4.105:90
VITE_DOC_ROUTE=/PPABE_DEV
PORT=3010
```

### Descripción de Variables

- `VITE_APPLICATION_ENDPOINT`: URL base de la API del backend
- `VITE_APPLICATION_FILES`: URL del servidor de archivos
- `VITE_DOC_ROUTE`: Ruta específica para documentos
- `PORT`: Puerto donde se ejecuta el servidor de desarrollo

## Archivos de Configuración

### 1. `src/vite-env.d.ts`
Define los tipos TypeScript para las variables de entorno:

```typescript
interface ImportMetaEnv {
  readonly VITE_APPLICATION_ENDPOINT: string
  readonly VITE_APPLICATION_FILES: string
  readonly VITE_DOC_ROUTE: string
  readonly PORT: string
}
```

### 2. `src/services/api.ts`
Contiene la configuración del cliente API y los endpoints disponibles:

- Clase `ApiClient` para realizar peticiones HTTP
- Funciones específicas para cada endpoint del backend
- Manejo de errores centralizado

### 3. `src/hooks/useApi.ts`
Hooks personalizados de React para consumir la API:

- `useBeneficiarios()`: Para obtener datos de beneficiarios
- `useCatalogData()`: Para obtener catálogos (programas, dependencias, etc.)
- `useEstadisticas()`: Para obtener estadísticas

## Cómo Usar

### En un Componente React

```typescript
import React from 'react';
import { useBeneficiarios, useCatalogData } from '../hooks/useApi';

const MiComponente: React.FC = () => {
  const { data: beneficiarios, loading, error } = useBeneficiarios();
  const { programas, dependencias } = useCatalogData();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Renderizar datos */}
    </div>
  );
};
```

### Peticiones Directas

```typescript
import { apiEndpoints } from '../services/api';

// Obtener beneficiarios con filtros
const filtros = { dependencia: 'DIF', año: '2024' };
const beneficiarios = await apiEndpoints.getBeneficiarios(filtros);

// Descargar datos en Excel
const downloadUrl = apiEndpoints.downloadData('excel', filtros);
window.open(downloadUrl, '_blank');
```

## Endpoints Disponibles

- `GET /beneficiarios` - Obtener beneficiarios (con filtros opcionales)
- `GET /estadisticas` - Obtener estadísticas generales
- `GET /programas` - Obtener lista de programas sociales
- `GET /dependencias` - Obtener lista de dependencias
- `GET /municipios` - Obtener lista de municipios
- `GET /anios` - Obtener años disponibles
- `GET /download` - Descargar datos en formato especificado

## Configuración de Vite

El archivo `vite.config.ts` está configurado para:

- Usar el puerto 3010 para desarrollo
- Configurar Vitest para testing
- Manejar variables de entorno correctamente

## Notas Importantes

1. **Prefijo VITE_**: Las variables de entorno deben usar el prefijo `VITE_` para estar disponibles en el cliente.

2. **Tipos TypeScript**: Todas las variables están tipadas en `vite-env.d.ts` para obtener autocompletado y validación.

3. **Manejo de Errores**: El sistema incluye manejo centralizado de errores con mensajes amigables para el usuario.

4. **Desarrollo vs Producción**: Las variables se cargan automáticamente desde el archivo `.env` en desarrollo.

## Estructura de Archivos

```
src/
├── services/
│   └── api.ts          # Cliente API y endpoints
├── hooks/
│   └── useApi.ts       # Hooks personalizados
├── vite-env.d.ts       # Tipos de variables de entorno
└── ...
```
