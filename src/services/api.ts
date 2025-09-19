// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_APPLICATION_ENDPOINT;
const API_FILES_URL = import.meta.env.VITE_APPLICATION_FILES;
const DOC_ROUTE = import.meta.env.VITE_DOC_ROUTE;

// Validate environment variables
if (!API_BASE_URL) {
  console.error('VITE_APPLICATION_ENDPOINT is not defined in environment variables');
}

if (!API_FILES_URL) {
  console.error('VITE_APPLICATION_FILES is not defined in environment variables');
}

// API client configuration
class ApiClient {
  private baseURL: string;
  private filesURL: string;
  private docRoute: string;

  constructor() {
    this.baseURL = API_BASE_URL || '';
    this.filesURL = API_FILES_URL || '';
    this.docRoute = DOC_ROUTE || '';
  }

  // Generic GET request
  async get<T>(endpoint: string): Promise<T> {
    const fullUrl = `${this.baseURL}${endpoint}`;
    console.log(`🌐 Making GET request to: ${fullUrl}`);
    
    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic POST request
  async post<T, U>(endpoint: string, data: U): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  }

  // Get files URL with document route
  getFileUrl(filename: string): string {
    return `${this.filesURL}${this.docRoute}/${filename}`;
  }

  // Get base API URL
  getBaseUrl(): string {
    return this.baseURL;
  }

  // Get files base URL
  getFilesUrl(): string {
    return this.filesURL;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Specific API endpoints - Frontend público endpoints (Filtros Escalonados)
export const apiEndpoints = {
  // 📋 Obtener dependencias disponibles (siempre todas)
  getDependenciasDisponibles: () => apiClient.get('/front-publico/dependencias-disponibles'),
  
  // 📋 Obtener programas por dependencia
  getProgramasPorDependencia: (idDependencia: string) => apiClient.get(`/front-publico/programas-por-dependencia/${idDependencia}`),
  
  // 📋 Obtener componentes por programa
  getComponentesPorPrograma: (idPrograma: string) => apiClient.get(`/front-publico/componentes-por-programa/${idPrograma}`),
  
  // 📋 Obtener años por filtros aplicados
  getAniosPorFiltros: (filters: {
    idDependencia?: string;
    idPrograma?: string;
    idComponente?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (filters.idDependencia) queryParams.append('idDependencia', filters.idDependencia);
    if (filters.idPrograma) queryParams.append('idPrograma', filters.idPrograma);
    if (filters.idComponente) queryParams.append('idComponente', filters.idComponente);
    return apiClient.get(`/front-publico/anios-por-filtros?${queryParams.toString()}`);
  },

  // � Obtener beneficiarios directamente por filtros (NUEVO ENFOQUE)
  getBeneficiariosPorFiltros: (filters: {
    idDependencia: string; // OBLIGATORIO
    idPrograma?: string;
    idComponente?: string;
    anio?: string;
  }) => {
    const queryParams = new URLSearchParams();
    queryParams.append('idDependencia', filters.idDependencia);
    if (filters.idPrograma) queryParams.append('idPrograma', filters.idPrograma);
    if (filters.idComponente) queryParams.append('idComponente', filters.idComponente);
    if (filters.anio) queryParams.append('anio', filters.anio);
    
    return apiClient.get(`/front-publico/beneficiarios-por-filtros?${queryParams.toString()}`);
  },

  // �📁 Listar carpetas publicadas con filtros opcionales (LEGACY - puede mantenerse para descargas)
  getCarpetasPublicadas: (filters?: {
    idDependencia?: string;
    idPrograma?: string;
    anio?: string;
  }) => {
    const queryParams = filters ? new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    return apiClient.get(`/front-publico/carpetas-publicadas${queryParams ? `?${queryParams}` : ''}`);
  },

  // 👥 Obtener beneficiarios de una carpeta específica (LEGACY - para descargas)
  getBeneficiariosPorCarpeta: (idCarpeta: string, filters?: {
    idDependencia?: string;
    idPrograma?: string;
    idComponente?: string;
  }) => {
    const queryParams = filters ? new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    return apiClient.get(`/front-publico/beneficiarios-por-carpeta/${idCarpeta}${queryParams ? `?${queryParams}` : ''}`);
  },

  // Estadísticas (mantener si existe en el backend)
  getEstadisticas: () => apiClient.get('/estadisticas'),

  // Descargar datos de una carpeta específica
  downloadCarpetaData: (idCarpeta: string, format: 'excel' | 'csv' | 'json', filters?: any) => {
    const queryParams = new URLSearchParams({ format });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string);
      });
    }
    return `${apiClient.getBaseUrl()}/front-publico/beneficiarios-por-carpeta/${idCarpeta}/download?${queryParams.toString()}`;
  }
};

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    // Request was made but no response received
    return 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
  } else {
    // Something happened in setting up the request
    return error.message || 'Ocurrió un error inesperado.';
  }
};

export default apiClient;
